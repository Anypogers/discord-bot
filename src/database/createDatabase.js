import Database from 'better-sqlite3';

// Create a new SQLite database
const db = new Database('src/database/data/data.db');
// Create tables
const userTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users(
    discord_id INTEGER NOT NULL PRIMARY KEY,
    user_name TEXT,
    ethnicity TEXT DEFAULT null,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const bankTable = db.prepare(`
  CREATE TABLE bank (
    user_id INTEGER,
    tier INTEGER DEFAULT 1,
    gold INTEGER DEFAULT 0,
    diamond INTEGER DEFAULT 0,
    ruby INTEGER DEFAULT 0,
    brl REAL DEFAULT 10,
    dollars REAL DEFAULT 25,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);

const secretBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS secret_bank(
    user_id INTEGER,
    miku_dollars REAL DEFAULT 0,
    dog_dollars INTEGER DEFAULT 0,
    kromer REAL DEFAULT 0,
    P INTEGER DEFAULT 0,
    studs INTEGER DEFAULT 0,
    owo_tokens INTEGER DEFAULT 0,
    gold_stars INTEGER DEFAULT 0,
    robux INTEGER DEFAULT 0,
    vbux INTEGER DEFAULT 0,
    minecoins INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);
const housingTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS housing(
    user_id INTEGER,
    number INTEGER,
    location TEXT,
    total_cost REAL,
    paid_cost REAL,
    bills REAL,
    rent REAL,
    currency TEXT,
    floor_size INTEGER DEFAULT 4,
    floors INTEGER DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);
const itemsTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS items(
    name TEXT NOT NULL PRIMARY KEY,
    description TEXT
  );
`);

try{
  console.log("Creating tables...")
  createTables();
  console.log("closing connection...")
  closeDB();
} catch(error){
  console.log(`Oops! \n${error}`);
}

function createTables(){
  userTable.run();
  bankTable.run();
  secretBankTable.run();
  housingTable.run();
  console.log('Tables created successfully.');;
}

function closeDB(){
  try {
    db.close()
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing the database', err.message);
    process.exit(1);
  }
};