-- Inserton des catégories et sous catégories à l'aide d'un json

-- Fonction pour générer un UUID v4
CREATE OR REPLACE FUNCTION uuid_generate_v4()
RETURNS UUID AS $$
BEGIN
    RETURN gen_random_uuid();
END;
$$ LANGUAGE plpgsql;

-- Fonction pour ajouter une catégorie
CREATE OR REPLACE FUNCTION add_category(category_name TEXT)
RETURNS UUID AS $$
DECLARE
    cat_id UUID;
BEGIN
    INSERT INTO categorie (categorie_id, name)
    VALUES (uuid_generate_v4(), category_name)
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING categorie_id INTO cat_id;

    RETURN cat_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour ajouter une sous-catégorie
CREATE OR REPLACE FUNCTION add_subcategory(subcategory_name TEXT, category_id UUID)
RETURNS UUID AS $$
DECLARE
    new_subcat_id UUID;
BEGIN
    INSERT INTO subcategory (subcat_id, name, categorie_id)
    VALUES (uuid_generate_v4(), subcategory_name, category_id)
    ON CONFLICT (name, categorie_id) DO UPDATE SET name = EXCLUDED.name
    RETURNING subcat_id INTO new_subcat_id;

    RETURN new_subcat_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour ajouter un mot
CREATE OR REPLACE FUNCTION add_word(word_text TEXT)
RETURNS INTEGER AS $$
DECLARE
    word_id INTEGER;
BEGIN
    INSERT INTO mot (mot)
    VALUES (word_text)
    RETURNING mot_id INTO word_id;

    RETURN word_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour associer un mot à une catégorie
CREATE OR REPLACE FUNCTION associate_word_to_category(word_id INTEGER, category_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO mot_categorie (mot_id, categorie_id)
    VALUES (word_id, category_id)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour associer un mot à une sous-catégorie
CREATE OR REPLACE FUNCTION associate_word_to_subcategory(word_id INTEGER, subcategory_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO mot_subcategory (mot_id, subcat_id)
    VALUES (word_id, subcategory_id)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Fonction récursive pour parcourir le JSON
CREATE OR REPLACE FUNCTION process_json_category(data jsonb, parent_category_id UUID DEFAULT NULL)
RETURNS void AS $$
DECLARE
    key text;
    value jsonb;
    category_id UUID;
    subcategory_id UUID;
    word_id INTEGER;
BEGIN
    FOR key, value IN SELECT * FROM jsonb_each(data)
    LOOP
        IF jsonb_typeof(value) = 'object' THEN
            -- C'est une catégorie
            category_id := add_category(key);
            PERFORM process_json_category(value, category_id);
        ELSIF jsonb_typeof(value) = 'array' THEN
            -- C'est une liste de sous-catégories ou de mots
            IF parent_category_id IS NULL THEN
                category_id := add_category(key);
                FOR i IN 0..jsonb_array_length(value) - 1
                LOOP
                    word_id := add_word(value->>i);
                    PERFORM associate_word_to_category(word_id, category_id);
                END LOOP;
            ELSE
                subcategory_id := add_subcategory(key, parent_category_id);
                FOR i IN 0..jsonb_array_length(value) - 1
                LOOP
                    word_id := add_word(value->>i);
                    PERFORM associate_word_to_subcategory(word_id, subcategory_id);
                END LOOP;
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Fonction principale pour importer les catégories depuis le JSON
CREATE OR REPLACE FUNCTION import_categories_from_json()
RETURNS void AS $$
DECLARE
    json_data jsonb;
BEGIN
    -- Lecture du fichier JSON
    json_data := pg_read_file('/data/Theme_Subtheme.json')::jsonb;

    -- Traitement des catégories
    PERFORM process_json_category(json_data->'categories');
END;
$$ LANGUAGE plpgsql;

-- Exécution de l'importation
SELECT import_categories_from_json();

-- Affichage d'un résumé des catégories et sous-catégories importées
SELECT 'Catégories importées:' AS info, COUNT(*) AS count FROM categorie
UNION ALL
SELECT 'Sous-catégories importées:', COUNT(*) FROM subcategory
UNION ALL
SELECT 'Mots importés:', COUNT(*) FROM mot
UNION ALL
SELECT 'Associations mot-catégorie:', COUNT(*) FROM mot_categorie
UNION ALL
SELECT 'Associations mot-sous-catégorie:', COUNT(*) FROM mot_subcategory;