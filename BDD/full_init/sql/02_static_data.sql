-- Insertion des caractères alphabetiques pour gestion du dictionnaire
INSERT INTO alphabet (alphabet_id, letter) VALUES
(1, 'A'), (2, 'B'), (3, 'C'), (4, 'D'), (5, 'E'), (6, 'F'), (7, 'G'), (8, 'H'), (9, 'I'),
(10, 'J'), (11, 'K'), (12, 'L'), (13, 'M'), (14, 'N'), (15, 'O'), (16, 'P'), (17, 'Q'),
(18, 'R'), (19, 'S'), (20, 'T'), (21, 'U'), (22, 'V'), (23, 'W'), (24, 'X'), (25, 'Y'),
(26, 'Z');

-- Insertion niveau scolaire
INSERT INTO "level" ("level_id", "name") VALUES
(1, 'primaire'),
(2, 'collège'),
(3, 'lycée'),
(4, 'supérieur');

-- insertion classes et le liens avec niveau scolaire
INSERT INTO "sublevel" ("sublevel_id", "name", "level_id") VALUES
(1, 'CP', 1),
(2, 'CE1', 1),
(3, 'CE2', 1),
(4, 'CM1', 1),
(5, 'CM2', 1),
(6, 'sixième', 2),
(7, 'cinquième', 2),
(8, 'quatrième', 2),
(9, 'troisième', 2),
(10, 'seconde', 3),
(11, 'première', 3),
(12, 'terminale', 3),
(13, 'université', 4);

-- insertion echelonDB en lien avec la classe scolaire
INSERT INTO "echelon_db" ("echelon_id", "sublevel_id") VALUES
-- CP: échelons 1 à 7
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1),
-- CE1: échelons 8 à 11
(8, 2), (9, 2), (10, 2), (11, 2),
-- CE2: échelons 12 à 15
(12, 3), (13, 3), (14, 3), (15, 3),
-- CM1: échelons 16 à 19
(16, 4), (17, 4), (18, 4), (19, 4),
-- CM2: échelons 20 à 23
(20, 5), (21, 5), (22, 5), (23, 5),
-- Sixième: échelons 24 à 27
(24, 6), (25, 6), (26, 6), (27, 6),
-- Cinquième: échelons 28 à 31
(28, 7), (29, 7), (30, 7), (31, 7),
-- Quatrième: échelons 32 à 35
(32, 8), (33, 8), (34, 8), (35, 8),
-- Troisième: échelons 36 à 39
(36, 9), (37, 9), (38, 9), (39, 9),
-- Seconde: échelons 40 à 42
(40, 10), (41, 10), (42, 10);


-- Insertion niveau de difficulté
INSERT INTO "niv_diff" ("niv_diff_id", "name") VALUES
(1, 'easy'),
(2, 'medium'),
(3, 'hard');

-- Insertion catégorie grammaticale
INSERT INTO "grammatical_cat" ("gramm_id", "name") VALUES
(1, 'nom'),
(2, 'verbe'),
(3, 'adjectif'),
(4, 'préposition'),
(5, 'déterminent'),
(6, 'pronom'),
(7, 'nom propre'),
(8, 'adverbe'),
(9, 'conjonction'),
(10, 'interjection');