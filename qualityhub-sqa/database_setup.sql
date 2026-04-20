-- QualityHub SQA System - Database Setup
-- MySQL Database Schema

-- Create Database
CREATE DATABASE IF NOT EXISTS SQA;
USE SQA;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin', 'tester', 'developer') DEFAULT 'tester',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modules Table
CREATE TABLE IF NOT EXISTS modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases Table
CREATE TABLE IF NOT EXISTS test_cases (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  module_id INT NOT NULL,
  priority ENUM('critical', 'high', 'medium', 'low') DEFAULT 'medium',
  status ENUM('passed', 'failed', 'running', 'not_run') DEFAULT 'not_run',
  assigned_to INT,
  created_at DATE,
  last_run DATE,
  FOREIGN KEY (module_id) REFERENCES modules(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Bugs Table
CREATE TABLE IF NOT EXISTS bugs (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  module_id INT NOT NULL,
  severity ENUM('critical', 'high', 'medium', 'low') DEFAULT 'medium',
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  assigned_to INT,
  reporter INT NOT NULL,
  created_at DATE,
  updated_at DATE,
  FOREIGN KEY (module_id) REFERENCES modules(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (reporter) REFERENCES users(id)
);

-- Insert Sample Users
INSERT INTO users (username, email, role) VALUES
('alice', 'alice@qualityhub.com', 'tester'),
('bob', 'bob@qualityhub.com', 'developer'),
('charlie', 'charlie@qualityhub.com', 'admin');

-- Insert Sample Modules
INSERT INTO modules (name, description) VALUES
('Authentication', 'User login and session management'),
('Cart', 'Shopping cart functionality'),
('Search', 'Product search engine'),
('Payments', 'Payment processing system'),
('Orders', 'Order management'),
('Profile', 'User profile management');

-- Insert Sample Test Cases
INSERT INTO test_cases (id, title, description, module_id, priority, status, assigned_to, created_at, last_run) VALUES
('TC-001', 'Login with valid credentials', 'Test user login with correct username and password', 1, 'high', 'passed', 1, '2026-04-15', '2026-04-20'),
('TC-002', 'Add item to cart', 'Test adding products to shopping cart', 2, 'high', 'passed', 2, '2026-04-16', '2026-04-20'),
('TC-003', 'Search product by name', 'Test product search functionality', 3, 'medium', 'failed', 1, '2026-04-17', '2026-04-20'),
('TC-004', 'Process payment', 'Test secure payment processing', 4, 'critical', 'running', 2, '2026-04-18', NULL);

-- Insert Sample Bugs
INSERT INTO bugs (id, title, description, module_id, severity, status, assigned_to, reporter, created_at, updated_at) VALUES
('BUG-001', 'Login timeout issue', 'Session expires too quickly after 5 minutes', 1, 'high', 'in_progress', 2, 1, '2026-04-18', '2026-04-20'),
('BUG-002', 'Cart calculation error', 'Total price calculation incorrect with discounts', 2, 'critical', 'open', 2, 1, '2026-04-19', '2026-04-20'),
('BUG-003', 'Search not working', 'Search returns empty results', 3, 'critical', 'open', NULL, 1, '2026-04-20', '2026-04-20');
