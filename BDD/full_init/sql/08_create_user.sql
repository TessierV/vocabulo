-- Création d'un rôle de lecture seule
   CREATE ROLE readonly;
   GRANT CONNECT ON DATABASE lsf_app TO readonly;
   GRANT USAGE ON SCHEMA public TO readonly;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Création d'un rôle de lecture/écriture
   CREATE ROLE readwrite;
   GRANT CONNECT ON DATABASE lsf_app TO readwrite;
   GRANT USAGE, CREATE ON SCHEMA public TO readwrite;
   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO readwrite;

-- Création d'utilisateurs
   CREATE USER vanessa_r WITH PASSWORD '$VANESSA_R_PASSWORD';
   GRANT readonly TO vanessa_r;

   CREATE USER vanessa_w WITH PASSWORD '$VANESSA_W_PASSWORD';
   GRANT readwrite TO vanessa_w;

   CREATE USER amandine_r WITH PASSWORD '$AMANDINE_R_PASSWORD';
   GRANT readonly TO amandine_r;

   CREATE USER amandine_w WITH PASSWORD '$AMANDINE_W_PASSWORD';
   GRANT readwrite TO amandine_w;