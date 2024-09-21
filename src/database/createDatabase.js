import Database from 'better-sqlite3';

// Create a new SQLite database
const db = new Database('./data.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
// Create tables
const createTables = () => {
  const user = `
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      discord_id INTEGER NOT NULL PRIMARY KEY,
      user_name TEXT,
      ethnicity TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    );
  `;

  const normalBank = `
    CREATE TABLE IF NOT EXISTS normal_bank(
      user_id INTEGER,
      tier INTEGER,
      brl REAL,
      dollars REAL,
      FOREIGN KEY (user_id) REFERENCES users(discord_id)
    );
  `;

  const luxuryBank = `
    CREATE TABLE IF NOT EXISTS luxury_bank(
      user_id INTEGER,
      tier INTEGER,
      gold INTEGER,
      diamond INTEGER,
      ruby INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(discord_id)
    );
  `;

  const virtualBank = `
    CREATE TABLE IF NOT EXISTS virtual_bank(
      user_id INTEGER,
      robux INTEGER,
      vbux INTEGER,
      minecoins INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(discord_id)
    );
  `;

  const specialBank = `
    CREATE TABLE IF NOT EXISTS special_bank(
      user_id INTEGER,
      miku_dollars REAL,
      dog_dollars INTEGER,
      kromer REAL,
      P INTEGER,
      studs INTEGER,
      owo_tokens INTEGER,
      gold_stars INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(discord_id)
    );
  `;
  
  const housing = `
    CREATE TABLE IF NOT EXISTS housing(
      user_id INTEGER,
      number INTEGER,
      location TEXT,
      total_cost REAL,
      paid_cost REAL,
      rent REAL,
      currency TEXT,
      meters_sqr INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(discord_id)
    );
  `;

  db.exec(user);
  db.exec(normalBank);
  db.exec(luxuryBank);
  db.exec(virtualBank);
  db.exec(specialBank);
  db.exec(housing);
  console.log('Tables created successfully.');
};

createTables();
closeDatabase();

function closeDB(){
  try {
    closeDatabase();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing the database', err.message);
    process.exit(1);
  }
};