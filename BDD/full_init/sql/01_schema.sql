-- Activate the unaccent extension
CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;

-- Enumerated types
CREATE TYPE "scale" AS ENUM ('Trop dur', 'Bien', 'Trop facile');
CREATE TYPE "name_level" AS ENUM ('primaire', 'collège', 'lycée', 'supérieur');
CREATE TYPE "name_classe" AS ENUM ('CP', 'CE1', 'CE2', 'CM1', 'CM2', 'sixième', 'cinquième', 'quatrième', 'troisième', 'seconde', 'première', 'terminale', 'université');
CREATE TYPE "level_diff" AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE "gram_cat" AS ENUM ('nom', 'verbe', 'adjectif', 'préposition', 'déterminent', 'pronom', 'nom propre', 'adverbe', 'conjonction', 'interjection');

-- Tables
CREATE TABLE "alphabet" (
    "alphabet_id" INTEGER NOT NULL UNIQUE,
    "letter" CHAR(1) NOT NULL,
    PRIMARY KEY("alphabet_id")
);

CREATE TABLE "mot" (
    "mot_id" SERIAL NOT NULL UNIQUE,
    "mot" VARCHAR,
    "definition" VARCHAR,
    "alphabet_id" INTEGER,
    "gramm_id" INTEGER,
    "frequence" INTEGER,
    "niv_diff_id" INTEGER,
    "echelon_id" INTEGER,
    PRIMARY KEY("mot_id")
);

CREATE TABLE "lsf_signe" (
    "signe_id" SERIAL PRIMARY KEY,
    "url_sign" VARCHAR,
    "url_def" VARCHAR,
    "mot_id" INTEGER UNIQUE
);

CREATE TABLE "picto" (
    "picto_id" INTEGER NOT NULL UNIQUE,
    "img" TEXT,
    "mot_id" INTEGER,
    PRIMARY KEY("picto_id")
);

CREATE TABLE "categorie" (
    "categorie_id" UUID NOT NULL UNIQUE,
    "name" VARCHAR UNIQUE,
    PRIMARY KEY("categorie_id")
);

CREATE TABLE "subcategory" (
    "subcat_id" UUID NOT NULL UNIQUE,
    "name" VARCHAR,
    "categorie_id" UUID,
    PRIMARY KEY("subcat_id"),
    UNIQUE ("name", "categorie_id")
);

CREATE TABLE "mot_categorie" (
    mot_id INTEGER,
    categorie_id UUID,
    PRIMARY KEY (mot_id, categorie_id)
);

CREATE TABLE "mot_subcategory" (
    mot_id INTEGER,
    subcat_id UUID,
    PRIMARY KEY (mot_id, subcat_id)
);

CREATE TABLE "grammatical_cat" (
    "gramm_id" INTEGER NOT NULL UNIQUE,
    "name" GRAM_CAT,
    PRIMARY KEY("gramm_id")
);

CREATE TABLE "echelon_db" (
    "echelon_id" INTEGER NOT NULL UNIQUE,
    "sublevel_id" INTEGER,
    PRIMARY KEY("echelon_id")
);

CREATE TABLE "level" (
    "level_id" INTEGER NOT NULL UNIQUE,
    "name" NAME_LEVEL,
    PRIMARY KEY("level_id")
);

CREATE TABLE "sublevel" (
    "sublevel_id" INTEGER NOT NULL UNIQUE,
    "name" NAME_CLASSE,
    "level_id" INTEGER,
    "echelon_id" INTEGER,
    PRIMARY KEY("sublevel_id")
);

CREATE TABLE "quiz" (
    "quiz_id" UUID NOT NULL UNIQUE,
    "date" TIMESTAMPTZ,
    "mot_id" INTEGER,
    "user_id" UUID,
    PRIMARY KEY("quiz_id")
);

CREATE TABLE "score_quiz" (
    "score_id" UUID NOT NULL UNIQUE,
    "quiz_id" UUID,
    "mot_id" INTEGER,
    "score" BOOLEAN,
    "use_sign" BOOLEAN,
    "count" INTEGER,
    PRIMARY KEY("score_id")
);

CREATE TABLE "view_sign" (
    "score_id" UUID,
    "flag" BOOLEAN DEFAULT TRUE,
    PRIMARY KEY("score_id")
);

CREATE TABLE "authentication" (
    "user_id" UUID NOT NULL UNIQUE,
    "pseudo" VARCHAR,
    "password" VARCHAR,
    "date" TIMESTAMPTZ,
    "quiz_id" UUID,
    "token_id" SERIAL,
    PRIMARY KEY("user_id")
);

CREATE TABLE "eval_quiz" (
    "eval_quizz_id" UUID,
    "quiz_id" UUID NOT NULL UNIQUE,
    "scale" SCALE,
    PRIMARY KEY("eval_quizz_id")
);

CREATE TABLE "eval_mot" (
    eval_mot_id UUID PRIMARY KEY,
    quiz_id UUID,
    mot_id INTEGER,
    scale SCALE
);

CREATE TABLE "text_extraction" (
    "text_id" UUID NOT NULL UNIQUE,
    "date" TIMESTAMPTZ,
    "text" TEXT,
    "mot_id" INTEGER,
    PRIMARY KEY("text_id")
);

CREATE TABLE "niv_diff" (
    "niv_diff_id" INTEGER NOT NULL UNIQUE,
    "name" LEVEL_DIFF,
    PRIMARY KEY("niv_diff_id")
);

CREATE TABLE "device_token" (
    "token_id" SERIAL UNIQUE,
    "create_at" TIMESTAMPTZ,
    "device_token" TEXT,
    "device_type" VARCHAR,
    PRIMARY KEY("token_id")
);

CREATE TABLE "diff_ortho" (
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
    PRIMARY KEY("mot_id")
);

CREATE TABLE user_word_history (
    user_id UUID,
    mot_id INTEGER,
    last_seen TIMESTAMP WITH TIME ZONE,
    times_seen INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, mot_id)
);

-- Foreign key constraints
ALTER TABLE "lsf_signe" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "picto" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "subcategory" ADD FOREIGN KEY("categorie_id") REFERENCES "categorie"("categorie_id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "mot" ADD FOREIGN KEY("gramm_id") REFERENCES "grammatical_cat"("gramm_id");
ALTER TABLE "mot" ADD FOREIGN KEY("echelon_id") REFERENCES "echelon_db"("echelon_id");
ALTER TABLE "sublevel" ADD FOREIGN KEY("level_id") REFERENCES "level"("level_id");
ALTER TABLE "quiz" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "score_quiz" ADD FOREIGN KEY("quiz_id") REFERENCES "quiz"("quiz_id");
ALTER TABLE "score_quiz" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "view_sign" ADD FOREIGN KEY("score_id") REFERENCES "score_quiz"("score_id");
ALTER TABLE "quiz" ADD FOREIGN KEY("user_id") REFERENCES "authentication"("user_id");
ALTER TABLE "authentication" ADD FOREIGN KEY("quiz_id") REFERENCES "quiz"("quiz_id");
ALTER TABLE "text_extraction" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "mot" ADD FOREIGN KEY("niv_diff_id") REFERENCES "niv_diff"("niv_diff_id");
ALTER TABLE "authentication" ADD FOREIGN KEY("token_id") REFERENCES "device_token"("token_id");
ALTER TABLE "echelon_db" ADD FOREIGN KEY("sublevel_id") REFERENCES "sublevel"("sublevel_id");
ALTER TABLE "diff_ortho" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "mot" ADD FOREIGN KEY("alphabet_id") REFERENCES "alphabet"("alphabet_id");
ALTER TABLE "quiz" ADD FOREIGN KEY("quiz_id") REFERENCES "eval_quiz"("quiz_id");
ALTER TABLE "mot_categorie" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "mot_categorie" ADD FOREIGN KEY("categorie_id") REFERENCES "categorie"("categorie_id");
ALTER TABLE "mot_subcategory" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "mot_subcategory" ADD FOREIGN KEY("subcat_id") REFERENCES "subcategory"("subcat_id");
ALTER TABLE "eval_mot" ADD FOREIGN KEY("quiz_id") REFERENCES "quiz"("quiz_id");
ALTER TABLE "eval_mot" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");
ALTER TABLE "user_word_history" ADD FOREIGN KEY("user_id") REFERENCES "authentication"("user_id");
ALTER TABLE "user_word_history" ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id");

-- Adding access rights
GRANT USAGE ON SCHEMA public TO readonly;
GRANT ALL ON SCHEMA public TO readwrite;

-- Granting rights to all tables
DO $$
DECLARE
    tab text;
BEGIN
    FOR tab IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        EXECUTE format('GRANT SELECT ON TABLE public.%I TO readonly', tab);
        EXECUTE format('GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.%I TO readwrite', tab);
    END LOOP;
END $$;