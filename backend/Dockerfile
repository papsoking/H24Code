# Utiliser une image PHP avec Apache
FROM php:8.2-apache

# Activer PDO MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copier les fichiers backend dans le conteneur
COPY . /var/www/html/

# Exposer le port
EXPOSE 80
