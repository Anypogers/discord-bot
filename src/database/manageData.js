import Database from 'better-sqlite3';

const db = new Database('./data.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export function getValues(table, column) {
  const sql = `SELECT ${column} FROM ${table};`;
  const rows = db.prepare(sql).all();
  return rows;
}

export function insertValue(table, values) {
  const columns = Object.keys(values).join(', ');
  const placeholders = Object.keys(values).map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  const stmt = db.prepare(sql);
  stmt.run(Object.values(values));
  return { id: stmt.lastInsertRowid };
}

export function updateValue(table, values, condition) {
  const updates = Object.keys(values).map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE ${table} SET ${updates} WHERE ${condition}`;
  const stmt = db.prepare(sql);
  stmt.run(Object.values(values));
  return { changes: stmt.changes };
}

// Handle shutdown
process.on('SIGINT', () => {
  try {
    closeDatabase();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing the database', err.message);
    process.exit(1);
  }
});