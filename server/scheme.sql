DROP DATABASE IF EXISTS discordgc_db;

CREATE DATABASE discordgc_db;

USE discordgc_db;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin VARCHAR(255)
);

CREATE TABLE server_connection (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    connection VARCHAR(255)
);

CREATE TABLE game_connection (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game VARCHAR(255),
    connection VARCHAR(255)
);