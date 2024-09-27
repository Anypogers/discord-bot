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

const normalBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS normal_bank(
    user_id INTEGER,
    tier INTEGER DEFAULT 1,
    brl REAL DEFAULT 0,
    dollars REAL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);
const luxuryBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS luxury_bank(
    user_id INTEGER,
    tier INTEGER DEFAULT 1,
    gold INTEGER DEFAULT 0,
    diamond INTEGER DEFAULT 0,
    ruby INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);
const virtualBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS virtual_bank(
   user_id INTEGER,
    robux INTEGER DEFAULT 0,
    vbux INTEGER DEFAULT 0,
    minecoins INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);

const specialBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS special_bank(
    user_id INTEGER,
    miku_dollars REAL DEFAULT 0,
    dog_dollars INTEGER DEFAULT 0,
    kromer REAL DEFAULT 0,
    P INTEGER DEFAULT 0,
    studs INTEGER DEFAULT 0,
    owo_tokens INTEGER DEFAULT 0,
    gold_stars INTEGER DEFAULT 0,
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
    meters_sqr INTEGER DEFAULT 3,
    floors INTEGER DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
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
  normalBankTable.run();
  luxuryBankTable.run();
  virtualBankTable.run();
  specialBankTable.run();
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