-- Création de la table diff_ortho
CREATE TABLE IF NOT EXISTS "diff_ortho" (
    "mot_id" INTEGER NOT NULL UNIQUE,
    "freqfilms" DECIMAL,
    "freqlivres" DECIMAL,
    "nbr_syll" INTEGER,
    "cp_u" DECIMAL,
    "cp_sfi" DECIMAL,
    "ce1_u" DECIMAL,
    "ce1_sfi" DECIMAL,
    "ce2_cm2_u" DECIMAL,
    "ce2_cm2_sfi" DECIMAL,
    "cp_cm2_u" DECIMAL,
    "cp_cm2_sfi" DECIMAL,
    PRIMARY KEY("mot_id"),
    FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
);

-- Fonction pour importer les données
CREATE OR REPLACE FUNCTION import_diff_ortho_data(file_name TEXT)
RETURNS void AS $$
DECLARE
    full_path TEXT;
    v_ortho TEXT;
    v_cgram TEXT;
    v_freqfilms DECIMAL;
    v_freqlivres DECIMAL;
    v_nbsyll INTEGER;
    v_cp_u DECIMAL;
    v_ce1_u DECIMAL;
    v_ce2_cm2_u DECIMAL;
    v_cp_cm2_u DECIMAL;
    v_cp_sfi DECIMAL;
    v_ce1_sfi DECIMAL;
    v_ce2_cm2_sfi DECIMAL;
    v_cp_cm2_sfi DECIMAL;
    v_mot_id INTEGER;
    v_count INTEGER := 0;
BEGIN
    full_path := '/data/' || file_name;

    -- Création d'une table temporaire pour importer les données
    CREATE TEMPORARY TABLE temp_import (
        ortho TEXT,
        cgram TEXT,
        freqfilms DECIMAL,
        freqlivres DECIMAL,
        nbsyll INTEGER,
        cp_u DECIMAL,
        ce1_u DECIMAL,
        ce2_cm2_u DECIMAL,
        cp_cm2_u DECIMAL,
        cp_sfi DECIMAL,
        ce1_sfi DECIMAL,
        ce2_cm2_sfi DECIMAL,
        cp_cm2_sfi DECIMAL
    );

    -- Importation des données du CSV dans la table temporaire
    EXECUTE format('COPY temp_import FROM %L WITH CSV HEADER', full_path);

    -- Traitement de chaque ligne de la table temporaire
    FOR v_ortho, v_cgram, v_freqfilms, v_freqlivres, v_nbsyll, v_cp_u, v_ce1_u, v_ce2_cm2_u, v_cp_cm2_u, v_cp_sfi, v_ce1_sfi, v_ce2_cm2_sfi, v_cp_cm2_sfi IN
        SELECT * FROM temp_import
    LOOP
        -- Trouve le mot_id correspondant
        SELECT mot_id INTO v_mot_id FROM mot WHERE mot = v_ortho;

        IF v_mot_id IS NOT NULL THEN
            -- Insértion ou mise à jour des données de difficulté
            INSERT INTO diff_ortho (mot_id, freqfilms, freqlivres, nbr_syll, cp_u, ce1_u, ce2_cm2_u, cp_cm2_u, cp_sfi, ce1_sfi, ce2_cm2_sfi, cp_cm2_sfi)
            VALUES (v_mot_id, v_freqfilms, v_freqlivres, v_nbsyll, v_cp_u, v_ce1_u, v_ce2_cm2_u, v_cp_cm2_u, v_cp_sfi, v_ce1_sfi, v_ce2_cm2_sfi, v_cp_cm2_sfi)
            ON CONFLICT (mot_id) DO UPDATE
            SET
                freqfilms = EXCLUDED.freqfilms,
                freqlivres = EXCLUDED.freqlivres,
                nbr_syll = EXCLUDED.nbr_syll,
                cp_u = EXCLUDED.cp_u,
                ce1_u = EXCLUDED.ce1_u,
                ce2_cm2_u = EXCLUDED.ce2_cm2_u,
                cp_cm2_u = EXCLUDED.cp_cm2_u,
                cp_sfi= EXCLUDED.cp_sfi,
                ce1_sfi = EXCLUDED.ce1_sfi,
                ce2_cm2_sfi = EXCLUDED.ce2_cm2_sfi,
                cp_cm2_sfi = EXCLUDED.cp_cm2_sfi;

            v_count := v_count + 1;
        ELSE
            RAISE NOTICE 'Mot non trouvé dans la table mot: %', v_ortho;
        END IF;

        -- Log de tous les 1000 enregistrements pour suivre l'execution du script
        IF v_count % 1000 = 0 THEN
            RAISE NOTICE '% enregistrements traités pour le fichier %', v_count, file_name;
        END IF;
    END LOOP;

    -- Log final
    RAISE NOTICE 'Importation terminée pour %. Total des enregistrements : %', file_name, v_count;

    -- Nettoyage de la table temporaire
    DROP TABLE temp_import;
END;
$$ LANGUAGE plpgsql;

-- Exécution de l'importation
SELECT import_diff_ortho_data('combined_lexique_manulex.csv');

-- Analyse de la table après l'importation pour optimiser les performances
ANALYZE diff_ortho;