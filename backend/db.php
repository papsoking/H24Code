<?php
function ConnectDB() {
    $host = getenv("MYSQLHOST");
    $dbname = getenv("MYSQLDATABASE");
    $username = getenv("MYSQLUSER");
    $password = getenv("MYSQLPASSWORD");

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Erreur connexion DB : " . $e->getMessage());
    }
}
