const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bot.db');

const setupDatabase = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS user_data (user_id TEXT PRIMARY KEY, balance INTEGER DEFAULT 0, bread INTEGER DEFAULT 0)');
        db.run('CREATE TABLE IF NOT EXISTS random_numbers (id INTEGER PRIMARY KEY AUTOINCREMENT, number REAL)');
        db.run('CREATE TABLE IF NOT EXISTS ping_pong_counter (count INTEGER)');
        db.run('INSERT INTO ping_pong_counter (count) VALUES (0) ON CONFLICT(count) DO NOTHING');
    });
};

const updateUserBalance = (userId, amount) => {
    db.run('INSERT INTO user_data (user_id, balance) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET balance = balance + ?', [userId, amount, amount]);
};

const getUserBalance = (userId, callback) => {
    db.get('SELECT balance FROM user_data WHERE user_id = ?', [userId], (err, row) => {
        callback(err, row ? row.balance : 0);
    });
};

const updateUserBread = (userId, amount) => {
    db.run('INSERT INTO user_data (user_id, bread) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET bread = bread + ?', [userId, amount, amount]);
};

const getUserBread = (userId, callback) => {
    db.get('SELECT bread FROM user_data WHERE user_id = ?', [userId], (err, row) => {
        callback(err, row ? row.bread : 0);
    });
};

const insertRandomNumber = (number) => {
    db.run('INSERT INTO random_numbers (number) VALUES (?)', [number]);
};

const getPingPongCount = (callback) => {
    db.get('SELECT count FROM ping_pong_counter', (err, row) => {
        callback(err, row ? row.count : 0);
    });
};

const incrementPingPongCount = () => {
    db.run('UPDATE ping_pong_counter SET count = count + 1');
};

const getAllRandomNumbers = (callback) => {
    db.all('SELECT number FROM random_numbers', (err, rows) => {
        callback(err, rows.map(row => row.number));
    });
};

const resetRandomNumbers = () => {
    db.run('DELETE FROM random_numbers');
};

module.exports = {
    setupDatabase,
    updateUserBalance,
    getUserBalance,
    updateUserBread,
    getUserBread,
    insertRandomNumber,
    getPingPongCount,
    incrementPingPongCount,
    getAllRandomNumbers,
    resetRandomNumbers
};
