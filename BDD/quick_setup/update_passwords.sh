#!/bin/bash

# Chargement des variables d'environnement
source .env

# Connexion à PostgreSQL en utilisant les variables d'environnement
PSQL="psql -U $POSTGRES_USER -d $POSTGRES_DB -h $POSTGRES_HOST -p $POSTGRES_PORT -v ON_ERROR_STOP=1"

# Mise à jour des mots de passe des utilisateurs
$PSQL <<EOSQL
ALTER USER vanessa_r WITH PASSWORD '$VAN_R_PASSWORD';
ALTER USER vanessa_w WITH PASSWORD '$VAN_W_PASSWORD';
ALTER USER amandine_r WITH PASSWORD '$AM_R_PASSWORD';
ALTER USER amandine_w WITH PASSWORD '$AM_W_PASSWORD';
EOSQL