const sqlite3 = require('sqlite3').verbose();

// Create and open a new SQLite database (or open an existing one)
const db = new sqlite3.Database('example.db');

// Enable foreign key constraints
db.run('PRAGMA foreign_keys = ON;');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      budget DECIMAL(10, 2) NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      salary DECIMAL(10, 2) NOT NULL,
      department_id INTEGER,
      FOREIGN KEY (department_id) REFERENCES departments(id)
    )
  `);

  // Insert data into tables
  db.run('INSERT INTO departments (name, budget) VALUES (?, ?)', ['Human Resources', 50000.00]);
  db.run('INSERT INTO departments (name, budget) VALUES (?, ?)', ['Engineering', 100000.00]);

  db.run('INSERT INTO employees (name, salary, department_id) VALUES (?, ?, ?)', ['Alice Smith', 60000.00, 2]);
  db.run('INSERT INTO employees (name, salary, department_id) VALUES (?, ?, ?)', ['Bob Johnson', 50000.00, 1]);

  // Update data
  db.run('UPDATE employees SET salary = ? WHERE name = ?', [65000.00, 'Alice Smith']);

  // Select data
  db.all('SELECT * FROM departments', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Departments:');
    rows.forEach((row) => {
      console.log(row);
    });
  });

  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Employees:');
    rows.forEach((row) => {
      console.log(row);
    });
  });

  db.all(`
    SELECT employees.name AS employee_name, employees.salary, departments.name AS department_name
    FROM employees
    JOIN departments ON employees.department_id = departments.id
  `, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Employees and their departments:');
    rows.forEach((row) => {
      console.log(row);
    });
  });
});

// Close the database connection
db.close();
