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

-- Crear tabla de permisos
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Crear tabla intermedia: roles <-> permisos
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Trigger para permisos nuevos asignados a admin
DELIMITER $$

CREATE TRIGGER assign_permission_to_admin
AFTER INSERT ON permissions
FOR EACH ROW
BEGIN
  DECLARE adminRoleId INT;

  -- Obtener el ID del rol admin
  SELECT id INTO adminRoleId FROM roles WHERE name = 'admin' LIMIT 1;

  -- Asignar el nuevo permiso al rol admin
  INSERT IGNORE INTO role_permissions (role_id, permission_id)
  VALUES (adminRoleId, NEW.id);
END$$

DELIMITER ;

-- Insertar nuevo role
INSERT IGNORE INTO roles (name) VALUES ('analyst');

-- Insertar acciones básicas
INSERT IGNORE INTO permissions (action, description) VALUES
('product:edit', 'Permite crear, actualizar o eliminar productos'),
('metrics:view', 'Permite ver panel de métricas');


-- Asignar permiso de métricas al rol "analyst"
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.action = 'metrics:view'
WHERE r.name = 'analyst';
