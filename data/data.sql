-- Create the database (this will be a file if you're using a command-line tool or DB Browser)
-- The following commands should be executed in the SQLite command line or any SQLite client

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Create the 'departments' table
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    budget DECIMAL(10, 2) NOT NULL
);

-- Create the 'employees' table
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Insert values into the 'departments' table
INSERT INTO departments (name, budget) VALUES ('Human Resources', 50000.00);
INSERT INTO departments (name, budget) VALUES ('Engineering', 100000.00);

-- Insert values into the 'employees' table
INSERT INTO employees (name, salary, department_id) VALUES ('Alice Smith', 60000.00, 2);
INSERT INTO employees (name, salary, department_id) VALUES ('Bob Johnson', 50000.00, 1);

-- Update a value in the 'employees' table
UPDATE employees
SET salary = 65000.00
WHERE name = 'Alice Smith';

-- Select all data from 'departments'
SELECT * FROM departments;

-- Select all data from 'employees'
SELECT * FROM employees;

-- Select employees and their department names
SELECT employees.name AS employee_name, employees.salary, departments.name AS department_name
FROM employees
JOIN departments ON employees.department_id = departments.id;
