import Database from 'better-sqlite3';
const db = new Database(`src/database/data/data.db`);

export function select(columns, table, column_where, equals_to){
  // SELECT $columns[n] FROM $table WHERE $column_where = $equals_to
  const selection = `SELECT ${columns.join(', ')} FROM ${table} WHERE ${column_where} = ?`;
  try {
    return db.prepare(selection).get(equals_to);
  } catch (error) {
    console.error("error handelling 'select' function inside 'dataManager.js':\n", error);
  }
}

export function join_select(columns, table,column_where, equals_to){
  /*
    SELECT users.user_name, $table.columns[n] FROM $table JOIN users
    ON ${table}.user_id = users.id WHERE users.$column_where = $equals_to
  */
  const mapping = (tab, cols) => cols.map(col => `${tab}.${col}`).join(', ');
  const join_selection = `SELECT users.user_name AS Name, ${mapping(table, columns)} FROM ${table} JOIN users ON ${table}.user_id = users.discord_id WHERE users.${column_where} = ?`;
  try{
    return db.prepare(join_selection).get(equals_to);
  } catch (error) {
    console.error("error handelling 'join_select' function inside 'dataManager.js':\n", error);
  }
}

export function insert(table, columns, values){
  // INSERT INTO $table($columns[n]) VALUES ($values[n])
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

export function update(table, columns, values, column_where, equals_to){
  // UPDATE $table SET $columns[n] = $values[n] WHERE $column_where = $equals_to
  if (columns.length != values.length){
    console.error(`Error handelling "update" function inside "src/database/dataManager.js"`);
    console.error(`Array "columns" size is different than "values" array size!`);
    console.error(`columns: ${columns.length} | values: ${values.length}`);
    return
  }
  const setClauses = columns.map((col, index) => `${col} = ${values[index]}`).join(', ');
  const update = `UPDATE ${table} SET ${setClauses} WHERE ${column_where} = ?`;
  try {
    db.prepare(update).run(equals_to);
  } catch (error) {
    console.error("error handelling 'update' function inside 'dataManager.js':\n", error);
  }
  return 0;
}

export function remove(table, column_where, equals_to){
  /*
    DELETE FROM ${table} WHERE ${column_where} = ${equals_to};
    VACUUM;
   */
  const remove = `DELETE FROM ${table} WHERE ${column_where} = ?`
  try {
    db.prepare(remove).run(equals_to);
    db.prepare('VACUUM;').run();
  } catch (error) {
    console.error("error handelling 'remove' function inside 'dataManager.js':\n",error);
  }
}