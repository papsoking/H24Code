<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'db.php';

$pdo = connectDB();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $category = $_GET["category"] ?? null;
    if ($category) {
        $stmt = $pdo->prepare("SELECT * FROM snippets WHERE category = ?");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->query("SELECT * FROM snippets");
    }
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        echo json_encode(["error" => "Données invalides"]);
        exit;
    }
    $stmt = $pdo->prepare("INSERT INTO snippets (title, description, category, code) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['title'], $data['description'], $data['category'], $data['code']]);
    echo json_encode(["success" => true]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit; 
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}