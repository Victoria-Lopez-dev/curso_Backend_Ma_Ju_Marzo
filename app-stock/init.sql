-- Create database if not exists
CREATE DATABASE IF NOT EXISTS stock_db;
USE stock_db;

-- Create categories table
CREATE TABLE categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

-- Create products table with foreign key to categories
CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT NOT NULL,
	category_id INT,
	CONSTRAINT fk_category
		FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert default categories
INSERT INTO categories (name) VALUES
('Clothing'),
('Footwear'),
('Accessories');

-- Insert default products with category references
INSERT INTO products (name, price, quantity, category_id) VALUES
('Basic White T-Shirt', 2500.00, 100, 1),
('Blue Jeans', 7800.50, 50, 1),
('Running Sneakers', 14500.99, 30, 2),
('Adjustable Black Cap', 1800.75, 80, 3),
('Waterproof Jacket', 21500.00, 20, 1);


-- Crear tabla de roles primero
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles básicos si no existen
INSERT IGNORE INTO roles (name) VALUES ('admin'), ('user');

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de user x roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Trigger para asignar role user por defecto
DELIMITER $$

CREATE TRIGGER assign_user_role
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  DECLARE userRoleId INT;

  -- Buscar ID del rol 'user'
  SELECT id INTO userRoleId FROM roles WHERE name = 'user' LIMIT 1;

  -- Si lo encontró, insertamos
  IF userRoleId IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id) VALUES (NEW.id, userRoleId);
  END IF;
END$$

DELIMITER ;