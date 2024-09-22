import Database from 'better-sqlite3';
const db = new Database('./data.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
const select = db.prepare('SELECT * FROM ? WHERE ?');
const insert = db.prepare('INSERT INTO ? VALUES (?, ?, ?)');
const update = db.prepare('UPDATE table_name SET ? = ?, WHERE ?')

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