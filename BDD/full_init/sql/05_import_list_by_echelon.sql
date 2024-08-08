-- Fonction pour importer les données du fichier duboisbuyse.csv
CREATE OR REPLACE FUNCTION import_mot_data(file_name TEXT)
RETURNS void AS $$
DECLARE
    full_path TEXT;
    v_mot TEXT;
    v_echelon INTEGER;
    v_cat_gramm TEXT;
    v_gramm_id INTEGER;
    v_mot_id INTEGER;
    v_count INTEGER := 0;
    v_cat_gramm_full gram_cat;
BEGIN
    full_path := '/data/' || file_name;

    -- Création d'une table temporaire pour importer les données
    CREATE TEMPORARY TABLE temp_import_mot (
        mot TEXT,
        echelon INTEGER,
        cat_gramm TEXT
    );

    -- Importation des données du CSV dans la table temporaire
    EXECUTE format('COPY temp_import_mot (mot, echelon, cat_gramm) FROM %L WITH (FORMAT csv, HEADER true, DELIMITER '';'', ENCODING ''LATIN1'')', full_path);

    -- Traitement de chaque ligne de la table temporaire
    FOR v_mot, v_echelon, v_cat_gramm IN
        SELECT mot, echelon, cat_gramm FROM temp_import_mot
    LOOP
        -- Détermination de la catégorie grammaticale
        v_cat_gramm_full := CASE
            WHEN v_cat_gramm SIMILAR TO 'n\.m\.|n\.f\.|n\.|n\.m\.p\.|n\.f\.p\.' THEN 'nom'
            WHEN v_cat_gramm = 'v.' THEN 'verbe'
            WHEN v_cat_gramm = 'adj.' THEN 'adjectif'
            WHEN v_cat_gramm = 'pr' THEN 'prépostion'
            WHEN v_cat_gramm = 'det.' THEN 'déterminent'
            WHEN v_cat_gramm = 'pro.' THEN 'pronom'
            WHEN v_cat_gramm = 'n.prop.' THEN 'nom propre'
            WHEN v_cat_gramm = 'adv.' THEN 'adverbe'
            WHEN v_cat_gramm = 'conj.' THEN 'conjonction'
            WHEN v_cat_gramm = 'int.' THEN 'interjection'
            ELSE NULL
        END;

        SELECT gramm_id INTO v_gramm_id
        FROM grammatical_cat
        WHERE name=v_cat_gramm_full;

        -- Recherche du mot_id correspondant au mot et à la catégorie grammaticale
        SELECT mot_id INTO v_mot_id FROM mot WHERE mot = v_mot AND gramm_id = v_gramm_id;

        -- Si le mot n'existe pas, insértion d'un nouvel enregistrement
        IF v_mot_id IS NULL THEN
            INSERT INTO mot (mot, echelon_id, gramm_id)
            VALUES (v_mot, v_echelon, v_gramm_id)
            RETURNING mot_id INTO v_mot_id;
        ELSE
            -- Si le mot existe, mise à jour de l'enregistrement existant
            UPDATE mot
            SET
                echelon_id = v_echelon,
                gramm_id = v_gramm_id
            WHERE mot_id = v_mot_id;
        END IF;

        v_count := v_count + 1;

        -- Log tous les 1000 enregistrements pour suivre l'execution
        IF v_count % 1000 = 0 THEN
            RAISE NOTICE '% enregistrements traités pour le fichier %', v_count, file_name;
        END IF;
    END LOOP;

    -- Log final
    RAISE NOTICE 'Importation terminée pour %. Total des enregistrements : %', file_name, v_count;

    -- Nettoyage de la table temporaire
    DROP TABLE temp_import_mot;
END;
$$ LANGUAGE plpgsql;

-- Exécution de l'importation
SELECT import_mot_data('duboisbuyse.csv');


-- Analyse de la table après l'importation pour optimiser les performances
ANALYZE mot;
