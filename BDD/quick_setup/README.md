# Configuration de la base de données LSF App

Ce guide vous aidera à configurer et à démarrer la base de données LSF App sur votre machine locale,
en tenant compte des différents rôles d'utilisateurs.

## Prérequis

- Docker et Docker Compose installés sur votre machine
  - Si vous ne les avez pas, suivez les guides d'installation officiels :
    - [Docker](https://docs.docker.com/get-docker/)
    - [Docker Compose](https://docs.docker.com/compose/install/)

## Étapes de configuration

1. Téléchargez le fichier dump
   - Obtenez le fichier `lsf_app_dump.sql` 
   - Placez ce fichier dans le répertoire racine de ce projet

2. Configurez les variables d'environnement
   - Copiez le fichier `.env.example` et renommez-le en `.env`
   ```
   cp .env.example .env
   ```
   - Ouvrez le fichier `.env` et modifiez tous les mots de passe 
   - Assurez-vous de définir des mots de passe sécurisés pour tous les utilisateurs (VAN_R, VAN_W, AM_R, AM_W)

3. Démarrez les conteneurs Docker
   ```
   docker-compose up -d
   ```

4. Restaurez le dump dans la base de données
   ```
   docker exec -i $(docker-compose ps -q postgres) psql -U $POSTGRES_USER -d $POSTGRES_DB < lsf_app_dump.sql
   ```

5. Exécutez le script de réinitialisation des mots de passe
   ```
   chmod +x reset_passwords.sh
   ./reset_passwords.sh
   ```
   Ce script mettra à jour les mots de passe des utilisateurs avec ceux définis dans votre fichier `.env`.

6. Vérifiez que la restauration s'est bien passée
   ```
   docker exec -i $(docker-compose ps -q postgres) psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"
   ```
   Cette commande devrait afficher la liste des tables dans la base de données.

## Utilisation

- Pour vous connecter à la base de données via la ligne de commande :
  ```
  docker exec -it $(docker-compose ps -q postgres) psql -U $POSTGRES_USER -d $POSTGRES_DB
  ```
- Pour arrêter les conteneurs :
  ```
  docker-compose down
  ```
- Pour redémarrer les conteneurs :
  ```
  docker-compose up -d
  ```

## Rôles d'utilisateurs

Cette base de données est configurée avec différents rôles d'utilisateurs :

- `vanessa_r` et `amandine_r` : Accès en lecture seule
- `vanessa_w` et `amandine_w` : Accès en lecture et écriture

Utilisez le rôle approprié selon vos besoins et autorisations.

## Utilisation de pgAdmin

pgAdmin est inclus dans la configuration pour faciliter la gestion de la base de données via une interface graphique.

1. Accédez à pgAdmin dans votre navigateur : http://localhost:5050
2. Connectez-vous avec les identifiants définis dans votre fichier `.env` (PGADMIN_EMAIL et PGADMIN_PASSWORD)
3. Pour ajouter la connexion à votre base de données :
   - Cliquez sur "Add New Server"
   - Dans l'onglet "General", donnez un nom à votre connexion (ex: "LSF App")
   - Dans l'onglet "Connection", utilisez les paramètres suivants :
     - Host name/address: postgres
     - Port: 5432
     - Maintenance database: lsf_app
     - Username: (utilisez votre nom d'utilisateur attribué)
     - Password: (le mot de passe correspondant défini dans votre fichier .env)

Vous pouvez maintenant explorer et gérer votre base de données via l'interface pgAdmin, avec les permissions correspondant à votre rôle.

## Sécurité

- Ne partagez jamais vos identifiants ou mots de passe.
- Assurez-vous de garder votre fichier `.env` confidentiel et ne le poussez jamais sur le dépôt Git.
