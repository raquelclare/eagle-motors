###### SCHEMA #####
DROP DATABASE IF EXISTS cars_db;
CREATE DATABASE cars_db;
USE cars_db;

CREATE TABLE cars 
(
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    make VARCHAR(1000) not null,
    model VARCHAR(1000) not null,
    year INTEGER(255) not null,
    color VARCHAR(1000) not null,
    miles INTEGER(255) not null,
    price DECIMAL(10, 2) not null,
    photo VARCHAR(1000) not null,
    sold BOOLEAN DEFAULT false
);