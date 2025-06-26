
-- Script de inicialización de la base de datos del TFG
CREATE DATABASE IF NOT EXISTS andbioapps25 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE andbioapps25;

-- Tabla de profesores
CREATE TABLE professors (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    surname VARCHAR(255),
    school VARCHAR(255),
    admin TINYINT(1) DEFAULT 0
);

-- Tabla de estudiantes
CREATE TABLE students (
    id_student INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    surname VARCHAR(255),
    school VARCHAR(255),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES professors(id_professor) ON DELETE CASCADE
);

-- Tabla de preguntas
CREATE TABLE questions (
    id_question INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answers VARCHAR(255),
    correctAnswers VARCHAR(255),
    difficulty VARCHAR(255),
    labels VARCHAR(255),
    image VARCHAR(255),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES professors(id_professor) ON DELETE CASCADE
);

-- Tabla de tests
CREATE TABLE tests (
    id_test INT AUTO_INCREMENT PRIMARY KEY,
    test_name VARCHAR(255) NOT NULL,
    difficulty VARCHAR(255),
    labels VARCHAR(255),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES professors(id_professor) ON DELETE CASCADE
);

-- Tabla intermedia: preguntas por test
CREATE TABLE questions_per_test (
    id_test INT,
    id_question INT,
    PRIMARY KEY (id_test, id_question),
    FOREIGN KEY (id_test) REFERENCES tests(id_test) ON DELETE CASCADE,
    FOREIGN KEY (id_question) REFERENCES questions(id_question) ON DELETE CASCADE
);

-- Tabla de resultados de test
CREATE TABLE test_results (
    id_result INT AUTO_INCREMENT PRIMARY KEY,
    id_test INT,
    id_student INT,
    correct_answers INT,
    wrong_answers INT,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_test) REFERENCES tests(id_test) ON DELETE CASCADE,
    FOREIGN KEY (id_student) REFERENCES students(id_student) ON DELETE CASCADE
);

-- Insertar admin (AdminTFG2025)
INSERT INTO professors (username, password, admin)
VALUES ('admin', '$2b$12$A5Z1/NP8WeH9TZzGyM0hS.2SVcPo/KR115vlQrEb9RwdG/j2v8e66', 1);
