<?php
function connectDB() {
    $host = 'localhost';
    $db = 'h24code';
    $user = 'root';
    $pass = '';
    try {
        return new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (PDOException $e) {
        die("Erreur connection DB : " . $e->getMessage());
    }
}
?>