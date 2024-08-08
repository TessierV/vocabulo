-- Fonction pour importer les données d'un fichier CSV
CREATE OR REPLACE FUNCTION import_csv_data(file_name TEXT, first_letter CHAR)
RETURNS void AS $$
DECLARE
    full_path TEXT;
    v_mot TEXT;
    v_categorie_grammaticale TEXT;
    v_definition TEXT;
    v_url_video_definition TEXT;
    v_url_video_mot TEXT;
    v_url_source TEXT;
    v_mot_id INTEGER;
    v_gramm_id INTEGER;
    v_alphabet_id INTEGER;
    v_count INTEGER := 0;
BEGIN
    full_path := '/data/' || file_name;

    -- Création d'une table temporaire pour importer les données
    CREATE TEMPORARY TABLE temp_import (
        mot TEXT,
        categorie_grammaticale TEXT,
        definition TEXT,
        url_video_definition TEXT,
        url_video_mot TEXT,
        url_source TEXT
    );

    -- Importation des données du CSV dans la table temporaire
    EXECUTE format('COPY temp_import FROM %L WITH CSV HEADER', full_path);

    -- Récupération de l'alphabet_id correspondant à la lettre
    SELECT alphabet_id INTO v_alphabet_id FROM alphabet WHERE letter = first_letter;

    -- Traitement de chaque ligne de la table temporaire
    FOR v_mot, v_categorie_grammaticale, v_definition, v_url_video_definition, v_url_video_mot, v_url_source IN
        SELECT mot, categorie_grammaticale, definition, url_video_definition, url_video_mot, url_source FROM temp_import
    LOOP
        RAISE NOTICE 'Traitement du mot: %', v_mot;

        -- Détermination de la catégorie grammaticale
        v_gramm_id := CASE
            WHEN v_categorie_grammaticale SIMILAR TO 'n\.m\.|n\.f\.|n\.|n\.m\.p\.|n\.f\.p\.' THEN 1
            WHEN v_categorie_grammaticale = 'v.' THEN 2
            WHEN v_categorie_grammaticale = 'adj.' THEN 3
            WHEN v_categorie_grammaticale = 'pr' THEN 4
            WHEN v_categorie_grammaticale = 'det.' THEN 5
            WHEN v_categorie_grammaticale = 'pro.' THEN 6
            WHEN v_categorie_grammaticale = 'n.prop.' THEN 7
            WHEN v_categorie_grammaticale = 'adv.' THEN 8
            WHEN v_categorie_grammaticale = 'conj.' THEN 9
            WHEN v_categorie_grammaticale = 'int.' THEN 10
            ELSE NULL
        END;

        -- Insértion ou mise à jour du mot
        INSERT INTO mot (mot, definition, gramm_id, alphabet_id)
        VALUES (v_mot, v_definition, v_gramm_id, v_alphabet_id)
        RETURNING mot_id INTO v_mot_id;

        -- Insértion ou mise à jour du signe LSF
        INSERT INTO lsf_signe (url_sign, url_def, mot_id)
        VALUES (v_url_video_mot, v_url_video_definition, v_mot_id)
        ON CONFLICT (mot_id) DO UPDATE
        SET url_sign = EXCLUDED.url_sign, url_def = EXCLUDED.url_def;

        v_count := v_count + 1;

        -- Log tous les 1000 enregistrements pour suivre le script
        IF v_count % 1000 = 0 THEN
            RAISE NOTICE '% enregistrements traités pour le fichier %', v_count, file_name;
        END IF;

        RAISE NOTICE 'Mot % traité avec succès, mot_id: %', v_mot, v_mot_id;
    END LOOP;

    -- Log final
    RAISE NOTICE 'Importation terminée pour %. Total des enregistrements : %', file_name, v_count;

    -- Nettoyage de la table temporaire
    DROP TABLE temp_import;
END;
$$ LANGUAGE plpgsql;

-- Fonction principale pour importation de tous les fichiers
DO $$
DECLARE
    first_letter CHAR := 'A';
BEGIN

    -- Importation des données pour chaque lettre
     WHILE first_letter <= 'Z' LOOP
        BEGIN
            PERFORM import_csv_data('elix_lsf_data_' || first_letter || '.csv', first_letter);
        EXCEPTION WHEN OTHERS THEN
            RAISE WARNING 'Erreur lors de l''importation du fichier % : %', 'elix_lsf_data_' || first_letter || '.csv', SQLERRM;
        END;
        first_letter := chr(ascii(first_letter) + 1);
    END LOOP;
END $$;

-- Analyse des tables après l'importation pour optimiser les performances
ANALYZE mot;
ANALYZE lsf_signe;