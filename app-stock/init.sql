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
