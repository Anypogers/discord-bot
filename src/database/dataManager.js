import Database from 'better-sqlite3';
import fs from 'node:fs';
const db = new Database(`src/database/data/data.db`);

// SELECT $columns[n] FROM $table WHERE $column_where = $equals_to
export function select(columns, table, column_where, equals_to){
  const selection = `SELECT ${columns.join(', ')} FROM ${table} WHERE ${column_where} = ?`;
  try {
    return db.prepare(selection).get(equals_to);
  } catch (error) {
    console.error("error handelling 'select' function inside 'dataManager.js':\n", error);
  }
}

// SELECT users.user_name, $table.columns[n] FROM $table JOIN users ON ${table}.user_id = users.id WHERE users.$column_where = $equals_to
// big ahhh select
// fucking hate inner join... it make my brain hurty (also js sucks)
export function join_select(columns, table,column_where, equals_to){
  const mapping = (tab, cols) => cols.map(col => `${tab}.${col}`).join(', ');
  const join_selection = `SELECT users.user_name AS Name, ${mapping(table, columns)} FROM ${table} JOIN users ON ${table}.user_id = users.discord_id WHERE users.${column_where} = ?`;
  try{
    return db.prepare(join_selection).get(equals_to);
  } catch (error) {
    console.error("error handelling 'join_select' function inside 'dataManager.js':\n", error);
  }
}

// INSERT INTO $table($columns[n]) VALUES ($values[n])
export function insert(table, columns, values){
  if (columns.length != values.length){
    console.error(`Error handelling "insert" function inside "src/database/dataManager.js"`);
    console.error(`Array "columns" size is different than "values" array size!`);
    console.error(`columns: ${columns.length} | values: ${values.length}`);
    return
  }
  const placeholders = values.map(() => '?').join(', ');
  const insert = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
  try{
    db.prepare(insert).run(...values);
  } catch (error) {
    console.error("error handelling 'insert' function inside 'src/database/dataManager.js':\n", error);
  }
  return 0;
}

// UPDATE $table SET $columns[n] = $values[n] WHERE $column_where = $equals_to
export function update(table, columns, values, column_where, equals_to){
  if (columns.length != values.length){
    console.error(`Error handelling "update" function inside "src/database/dataManager.js"`);
    console.error(`Array "columns" size is different than "values" array size!`);
    console.error(`columns: ${columns.length} | values: ${values.length}`);
    return
  }
  const setClauses = columns.map((col, index) => `${col} = ${values[index]}`).join(', ');
  const update = `UPDATE ${table} SET ${setClauses} WHERE ${column_where} = ${equals_to}`;
  try {
    db.prepare(update).run();
  } catch (error) {
    console.error("error handelling 'update' function inside 'dataManager.js':\n", error);
  }
  return 0;
}

// Get data in .json file
export function select_json(discord_id){
  const file = `./data/${discord_id}.json`;
  fs.readFile(file, 'utf8', (error, data) => {
    if (error) {
      console.log("error handelling 'select_json' function inside 'dataManager.js':\n",error);
      return 'ERROR'
    }
    try{
      return JSON.parse(data);
    } catch (parseError){
      console.error("error trying to parse 'data' into json inside function 'select_json' inside 'dataManager.js'\n",parseError);
    }
  });
}

// Save to .json file
export function insert_json(discord_id, data){
  const file = `./data/${discord_id}.json`;
  fs.writeFile(file, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      console.log("error handelling 'insert_json' function inside 'dataManager.js':\n",error);
    }
    return null;
  });
}