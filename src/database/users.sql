CREATE TABLE IF NOT EXISTS users(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  discord_id INTEGER NOT NULL PRIMARY KEY,
  user_name TEXT,
);

CREATE TABLE IF NOT EXISTS bank(
  user_id INTEGER,
  user_name TEXT,
  brl REAL,
  gold INTEGER
);

INSERT INTO users(discord_id, user_name) VALUES
(696969, "Anypogers");