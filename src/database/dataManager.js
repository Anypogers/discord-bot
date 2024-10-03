import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
const db = new Database(`src/database/data/data.db`);

export function select(columns, table, column_where, equals_to){
  // SELECT $columns[n] FROM $table WHERE $column_where = $equals_to
  const selection = `SELECT ${columns.join(', ')} FROM ${table} WHERE ${column_where} = ?`;
  try {
    const result = db.prepare(selection).get(equals_to);
    return result;
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

/*
  JSON File Setters & Getters
*/

// Generate file path based on Discord ID
function inventoryFilePath(discordId) {
  return path.join(`src/database/data/${discordId}.json`);
}

// Load inventory from file
export function loadInventory(discordId) {
  const filePath = inventoryFilePath(discordId);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return { inventory: [] };
}

// Load possible items from file
function loadPossibleItems() {
  const filePath = path.join(__dirname, 'possibleItems.json');
  if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
  }
  return {};
}

// Save inventory to file
export function saveInventory(discordId, inventory) {
  const filePath = inventoryFilePath(discordId);
  fs.writeFileSync(filePath, JSON.stringify(inventory, null, 2));
}

// Add or update item in inventory based on item name
export function updateInventory(discordId, itemName, addValue) {
  const inventoryData = loadInventory(discordId);
  const inventory = inventoryData.inventory;
  const possibleItems = loadPossibleItems();

  // Check if the item exists in possible items
  if (!(itemName in possibleItems)) {
    console.error(`Item "${itemName}" not found in possible items.`);
    return;
  }
  const { id } = possibleItems[itemName];

  // Find item by id in the inventory
  const itemIndex = inventory.findIndex(item => item.id === id);

  if (itemIndex >= 0) {
    // Update existing item
    inventory[itemIndex].amount += addValue;
    // Remove item if amount is 0 or less
    if (inventory[itemIndex].amount <= 0) {
      inventory.splice(itemIndex, 1);
    }
  } else if (addValue > 0) {
    // Add new item if amount is positive
    inventory.push({ id, amount: addValue, name: itemName });
  }
  // Update inventoryData with the modified inventory array
  inventoryData.inventory = inventory;
  // Save the updated inventoryData
  saveInventory(discordId, inventoryData);
}

// Check if an item is in the inventory by name
export function isItemInInventory(discordId, itemName) {
  const inventoryData = loadInventory(discordId);
  const possibleItems = loadPossibleItems();
  // Check if the item exists in possible items
  if (!(itemName in possibleItems)) {
    return false; // Item does not exist in possible items
  }
  const { id } = possibleItems[itemName];
  return inventoryData.inventory.some(item => item.id === id);
}