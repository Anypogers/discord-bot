-- schema.sql
CREATE TABLE IF NOT EXISTS user_data (
    user_id TEXT PRIMARY KEY,
    balance INTEGER DEFAULT 0,
    bread INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS random_numbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number REAL
);

CREATE TABLE IF NOT EXISTS ping_pong_counter (
    count INTEGER
);

-- Initialize the counter with 0 if it doesn't exist
INSERT INTO ping_pong_counter (count) VALUES (0) ON CONFLICT(count) DO NOTHING;
