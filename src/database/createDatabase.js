import Database from 'better-sqlite3';

// Create a new SQLite database
const db = new Database('src/database/data.db');
// Create tables
const userTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users(
    discord_id INTEGER NOT NULL PRIMARY KEY,
    user_name TEXT,
    ethnicity TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const normalBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS normal_bank(
    user_id INTEGER,
    tier INTEGER,
    brl REAL,
    dollars REAL,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);
const luxuryBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS luxury_bank(
    user_id INTEGER,
    tier INTEGER,
    gold INTEGER,
    diamond INTEGER,
    ruby INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);
const virtualBankTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS virtual_bank(
   user_id INTEGER,
    robux INTEGER,
    vbux INTEGER,
    minecoins INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(discord_id)
  );
`);

const specialBankTable = db.prepare(`
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
    meters_sqr INTEGER,
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