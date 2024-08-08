-- Enumération
CREATE TYPE "scale" AS ENUM (
	'Trop dur',
	'Bien',
	'Trop facile'
);

CREATE TYPE "name_level" AS ENUM (
	'primaire',
	'collège',
	'lycée',
	'supérieur'
);

CREATE TYPE "name_classe" AS ENUM (
	'CP',
	'CE1',
	'CE2',
	'CM1',
	'CM2',
	'sixième',
	'cinquième',
	'quatrième',
	'troisième',
	'seconde',
	'première',
	'terminale',
	'université'
);

CREATE TYPE "level_diff" AS ENUM (
	'easy',
	'medium',
	'hard'
);

CREATE TYPE "gram_cat" AS ENUM (
	'nom',
	'verbe',
	'adjectif',
	'préposition',
	'déterminent',
	'pronom',
	'nom propre',
	'adverbe',
	'conjonction',
	'interjection'
);

-- creation de toutes les tables

-- table alphabet : utilisation pour la bibliothèque de signes
CREATE TABLE "alphabet" (
	"alphabet_id" INTEGER NOT NULL UNIQUE,
	"letter" CHAR NOT NULL,
	PRIMARY KEY("alphabet_id")
);

-- table mot : table maître
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


-- url des signes ou de la définition en LSF issue d'Elix
CREATE TABLE "lsf_signe" (
	"signe_id" SERIAL PRIMARY KEY,
	"url_sign" VARCHAR,
	"url_def" VARCHAR,
	"mot_id" INTEGER UNIQUE
);


-- pour stocker les images correspondantes aux mots pour les quizz
CREATE TABLE "picto" (
	"picto_id" INTEGER NOT NULL UNIQUE,
	"img" TEXT,
	"mot_id" INTEGER,
	PRIMARY KEY("picto_id")
);


-- catégories pour les affichages thématiques des mots
CREATE TABLE "categorie" (
	"categorie_id" UUID NOT NULL UNIQUE,
	"name" VARCHAR UNIQUE,
	PRIMARY KEY("categorie_id")
);


-- sous catégories pour les affichages thématiques
CREATE TABLE "subcategory" (
	"subcat_id" UUID NOT NULL UNIQUE,
	"name" VARCHAR,
	"categorie_id" UUID,
	PRIMARY KEY("subcat_id"),
	UNIQUE ("name", "categorie_id")
);

--  table de liaison entre mots et catégories
CREATE TABLE IF NOT EXISTS mot_categorie (
    mot_id INTEGER REFERENCES mot(mot_id),
    categorie_id UUID REFERENCES categorie(categorie_id),
    PRIMARY KEY (mot_id, categorie_id)
);

--  table de liaison entre mots et sous-catégories
CREATE TABLE IF NOT EXISTS mot_subcategory (
    mot_id INTEGER REFERENCES mot(mot_id),
    subcat_id UUID REFERENCES subcategory(subcat_id),
    PRIMARY KEY (mot_id, subcat_id)
);


-- table pour stocker les catégories grammaticales
CREATE TABLE "grammatical_cat" (
	"gramm_id" INTEGER NOT NULL UNIQUE,
	"name" GRAM_CAT,
	PRIMARY KEY("gramm_id")
);


-- échelons de la catégorisation de Dubois Buyles
CREATE TABLE "echelon_db" (
	"echelon_id" INTEGER NOT NULL UNIQUE,
	"sublevel_id" INTEGER,
	PRIMARY KEY("echelon_id")
);


-- niveau en fonction scolaire
CREATE TABLE "level" (
	"level_id" INTEGER NOT NULL UNIQUE,
	"name" NAME_LEVEL,
	PRIMARY KEY("level_id")
);


-- niveau en fonction des classes scolaires
CREATE TABLE "sublevel" (
	"sublevel_id" INTEGER NOT NULL UNIQUE,
	"name" NAME_CLASSE,
	"level_id" INTEGER,
	"echelon_id" INTEGER,
	PRIMARY KEY("sublevel_id")
);


-- pour chaque quizz
CREATE TABLE "quiz" (
	"quiz_id" UUID NOT NULL UNIQUE,
	"date" TIMESTAMPTZ,
	"mot_id" INTEGER,
	"user_id" UUID,
	PRIMARY KEY("quiz_id")
);


-- score pour chaque quiz
CREATE TABLE "score_quiz" (
	"score_id" UUID NOT NULL UNIQUE,
	"quiz_id" UUID,
	"mot_id" INTEGER,
	"score" BOOLEAN,
	"use_sign" BOOLEAN,
	"count" INTEGER,
	PRIMARY KEY("score_id")
);


-- visibilité de l'indice LSF (les 2 premères fois)
CREATE TABLE "view_sign" (
	"score_id" UUID,
	"flag" BOOLEAN DEFAULT TRUE,
	PRIMARY KEY("score_id")
);


-- table pour stocker les informations d'authentification
CREATE TABLE "authentication" (
	"user_id" UUID NOT NULL UNIQUE,
	"pseudo" VARCHAR,
	"password" VARCHAR,
	"date" TIMESTAMPTZ,
	"quiz_id" UUID,
	"token_id" SERIAL,
	PRIMARY KEY("user_id")
);


-- pour evaluer la difficulté des quizz après leur réalisation journalière
CREATE TABLE "eval_quiz" (
	"eval_quizz_id" UUID,
	"quiz_id" UUID NOT NULL UNIQUE,
	"scale" SCALE,
	"mot_id" INTEGER,
	PRIMARY KEY("eval_quizz_id")
);


-- pour l'extraction des textes issues des livres jeunesses
CREATE TABLE "text_extraction" (
	"text_id" UUID NOT NULL UNIQUE,
	"date" TIMESTAMPTZ,
	"text" TEXT,
	"mot_id" INTEGER,
	PRIMARY KEY("text_id")
);


-- 3 niveaux de difficultés global
CREATE TABLE "niv_diff" (
	"niv_diff_id" INTEGER NOT NULL UNIQUE,
	"name" LEVEL_DIFF,
	PRIMARY KEY("niv_diff_id")
);


-- gestion des token firebase
CREATE TABLE "device_token" (
	"token_id" SERIAL NOT NULL UNIQUE,
	"create_at" TIMESTAMPTZ,
	"device_token" TEXT,
	"device_type" VARCHAR,
	PRIMARY KEY("token_id")
);

-- table pour gérer la difficulté en fonction d'indicateur pour certains mots
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


ALTER TABLE "lsf_signe"
ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "picto"
ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "subcategory"
ADD FOREIGN KEY("categorie_id") REFERENCES "categorie"("categorie_id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "mot"
ADD FOREIGN KEY("gramm_id") REFERENCES "grammatical_cat"("gramm_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mot"
ADD FOREIGN KEY("echelon_id") REFERENCES "echelon_db"("echelon_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "sublevel"
ADD FOREIGN KEY("level_id") REFERENCES "level"("level_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "quiz"
ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "score_quiz"
ADD FOREIGN KEY("quiz_id") REFERENCES "quiz"("quiz_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "score_quiz"
ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "score_quiz"
ADD FOREIGN KEY("score_id") REFERENCES "view_sign"("score_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "quiz"
ADD FOREIGN KEY("user_id") REFERENCES "authentication"("user_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "authentication"
ADD FOREIGN KEY("quiz_id") REFERENCES "quiz"("quiz_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "text_extraction"
ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mot"
ADD FOREIGN KEY("niv_diff_id") REFERENCES "niv_diff"("niv_diff_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "authentication"
ADD FOREIGN KEY("token_id") REFERENCES "device_token"("token_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "echelon_db"
ADD FOREIGN KEY("sublevel_id") REFERENCES "sublevel"("sublevel_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "diff_ortho"
ADD FOREIGN KEY("mot_id") REFERENCES "mot"("mot_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mot"
ADD FOREIGN KEY("alphabet_id") REFERENCES "alphabet"("alphabet_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "quiz"
ADD FOREIGN KEY("quiz_id") REFERENCES "eval_quiz"("quiz_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;


