-- creation d'une fonction pour calculer le niveau de difficulté
CREATE OR REPLACE FUNCTION calculate_difficulty_level()
RETURNS VOID AS $$
DECLARE
    mot_record RECORD;
    difficulty_score DECIMAL;
    max_freq DECIMAL;
    max_u DECIMAL;
    max_sfi DECIMAL;
    gramm_weight DECIMAL;
BEGIN
    -- Trouver les valeurs maximales pour la normalisation
    SELECT MAX(GREATEST(freqfilms, freqlivres)) INTO max_freq FROM diff_ortho;
    SELECT MAX(GREATEST(CP_U, CE1_U, CE2_CM2_U, CP_CM2_U)) INTO max_u FROM diff_ortho;
    SELECT MAX(GREATEST(CP_SFI, CE1_SFI, CE2_CM2_SFI, CP_CM2_SFI)) INTO max_sfi FROM diff_ortho;

    FOR mot_record IN
        SELECT
            m.mot_id,
            m.mot,
            m.gramm_id,
            m.gramm_id,
            d.freqfilms,
            d.freqlivres,
            d.nbr_syll,
            d.CP_U,
            d.CE1_U,
            d.CE2_CM2_U,
            d.CP_CM2_U,
            d.CP_SFI,
            d.CE1_SFI,
            d.CE2_CM2_SFI,
            d.CP_CM2_SFI,
            s.name AS echelon_name
        FROM mot m
        LEFT JOIN diff_ortho d ON m.mot_id = d.mot_id
        LEFT JOIN echelon_db e ON m.echelon_id = e.echelon_id
        LEFT JOIN sublevel s ON e.sublevel_id = s.sublevel_id
    LOOP
        -- Initialisation de score de difficulté
        -- Par défaut, on considère le mot comme difficile s'il n'a pas de données
        difficulty_score := 80;  -- Score initial élevé

        -- Calcul du poids de la catégorie grammaticale
        CASE coalesce (mot_record.gramm_id, 0)
            WHEN 1 THEN gramm_weight := 0;  -- nom
            WHEN 2 THEN gramm_weight := 5;  -- verbe
            WHEN 3 THEN gramm_weight := 3;  -- adjectif
            WHEN 4 THEN gramm_weight := 7;  -- préposition
            WHEN 5 THEN gramm_weight := 2;  -- déterminant
            WHEN 6 THEN gramm_weight := 4;  -- pronom
            WHEN 7 THEN gramm_weight := 1;  -- nom propre
            WHEN 8 THEN gramm_weight := 6;  -- adverbe
            WHEN 9 THEN gramm_weight := 8;  -- conjonction
            WHEN 10 THEN gramm_weight := 9; -- interjection
            ELSE gramm_weight := 5;
        END CASE;

        -- Ajoute le poids de la catégorie grammaticale au score
        difficulty_score := difficulty_score + gramm_weight;

        -- Ajuste le score si les données de fréquence sont disponibles
       IF mot_record.freqfilms IS NOT NULL OR mot_record.freqlivres IS NOT NULL THEN
            -- Fréquence (plus élevée = plus facile)
            difficulty_score := difficulty_score - (COALESCE(GREATEST(mot_record.freqfilms, mot_record.freqlivres), 0) / NULLIF(max_freq, 0)) * 30;

            -- Nombre de syllabes (plus élevé = plus difficile)
            difficulty_score := difficulty_score + (LEAST(COALESCE(mot_record.nbr_syll, 3), 5) / 5) * 10;

            -- Valeurs U (plus élevées = plus facile)
            difficulty_score := difficulty_score - (GREATEST(
                COALESCE(mot_record.CP_U, 0),
                COALESCE(mot_record.CE1_U, 0),
                COALESCE(mot_record.CE2_CM2_U, 0),
                COALESCE(mot_record.CP_CM2_U, 0)
            ) / max_u) * 20;

            -- Valeurs SFI (plus élevées = plus facile)
            difficulty_score := difficulty_score - (GREATEST(
                COALESCE(mot_record.CP_SFI, 0),
                COALESCE(mot_record.CE1_SFI, 0),
                COALESCE(mot_record.CE2_CM2_SFI, 0),
                COALESCE(mot_record.CP_CM2_SFI, 0)
            ) / max_sfi) * 20;
        END IF;

        -- Échelon Dubois-Buyse (si disponible)
        IF mot_record.echelon_name IS NOT NULL THEN
            CASE
                WHEN mot_record.echelon_name = 'CP' THEN difficulty_score := difficulty_score - 60;
                WHEN mot_record.echelon_name = 'CE1' THEN difficulty_score := difficulty_score - 60;
                WHEN mot_record.echelon_name = 'CE2' THEN difficulty_score := difficulty_score - 50;
                WHEN mot_record.echelon_name = 'CM1' THEN difficulty_score := difficulty_score - 50;
                WHEN mot_record.echelon_name = 'CM2' THEN difficulty_score := difficulty_score - 40;
                WHEN mot_record.echelon_name = 'sixième' THEN difficulty_score := difficulty_score - 30;
                WHEN mot_record.echelon_name = 'cinquième' THEN difficulty_score := difficulty_score - 25;
                WHEN mot_record.echelon_name = 'quatrième' THEN difficulty_score := difficulty_score - 20;
                WHEN mot_record.echelon_name = 'troisième' THEN difficulty_score := difficulty_score - 15;
                WHEN mot_record.echelon_name = 'seconde' THEN difficulty_score := difficulty_score - 10;
                WHEN mot_record.echelon_name = 'première' THEN difficulty_score := difficulty_score - 5;
                WHEN mot_record.echelon_name = 'terminale' THEN difficulty_score := difficulty_score - 5;
                WHEN mot_record.echelon_name = 'université' THEN difficulty_score := difficulty_score - 0;
                ELSE difficulty_score := difficulty_score + 5;  -- pour les niveaux supérieurs
            END CASE;
        END IF;

        -- Normalise le score final
        difficulty_score := GREATEST(0, LEAST(100, difficulty_score));

        -- Détermine le niveau de difficulté
        IF difficulty_score < 30 THEN
            UPDATE mot SET niv_diff_id = (SELECT niv_diff_id FROM niv_diff WHERE name = 'easy') WHERE mot_id = mot_record.mot_id;
        ELSIF difficulty_score < 60 THEN
            UPDATE mot SET niv_diff_id = (SELECT niv_diff_id FROM niv_diff WHERE name = 'medium') WHERE mot_id = mot_record.mot_id;
        ELSE
            UPDATE mot SET niv_diff_id = (SELECT niv_diff_id FROM niv_diff WHERE name = 'hard') WHERE mot_id = mot_record.mot_id;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Exécute la fonction pour calculer les niveaux
SELECT calculate_difficulty_level();