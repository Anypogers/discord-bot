const fs = require('fs');
const filePath = './data.json';

// Helper function to load all data
function loadAllData() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData); // Convert JSON string to JavaScript object
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log("File not found, returning empty array.");
      return [];
    } else {
      throw err;
    }
  }
}

// Function to get a specific field for a specific user by their ID
function getUserField(id, field) {
  const allData = loadAllData(); // Load all user data
  const user = allData.find(user => user.id === id); // Find user by ID
  
  if (user && user[field] !== undefined) {
    return user[field]; // Return the specific field value if it exists
  } else if (user && field in user.preferences) {
    return user.preferences[field]; // Check inside 'preferences' if it's a nested field
  } else {
    return null; // Field or user not found
  }
}

// Function to update a specific field for a specific user by their ID
function updateUserField(id, field, newValue) {
  let allData = loadAllData();  // Load all user data
  const userIndex = allData.findIndex(user => user.id === id); // Find the user index

  if (userIndex !== -1) {
    // Update if the field is at the top level
    if (field in allData[userIndex]) {
      allData[userIndex][field] = newValue;
    } else if (field in allData[userIndex].preferences) {
      // Update if the field is in 'preferences'
      allData[userIndex].preferences[field] = newValue;
    } else {
      console.log(`Field '${field}' does not exist for user ID ${id}`);
      return;
    }

    // Save the updated user data back to the file
    const jsonData = JSON.stringify(allData, null, 2); // Pretty format
    fs.writeFileSync(filePath, jsonData, 'utf-8');
    console.log(`Field '${field}' updated for user ID ${id}`);
  } else {
    console.log(`User with ID ${id} not found.`);
  }
}

module.exports = {
  getUserField,
  updateUserField
};
