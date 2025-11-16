// lib/backupUsers.js - Utility to backup users.json file

import fs from "fs";
import path from "path";

/**
 * Creates a backup of users.json in the parent directory of parent directory (../../)
 * @param {string} usersFilePath - Full path to the users.json file
 */
export function backupUsersFile(usersFilePath) {
  try {
    // Check if users.json exists
    if (!fs.existsSync(usersFilePath)) {
      console.warn("Users file does not exist, skipping backup");
      return;
    }

    // Get the backup directory (../../ from data/users.json)
    const backupDir = path.resolve(usersFilePath, "../../");

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Create backup file path with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFileName = `users-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);

    // Also create a latest backup without timestamp
    const latestBackupPath = path.join(backupDir, "users.json.backup");

    // Read the current users.json
    const usersData = fs.readFileSync(usersFilePath, "utf8");

    // Write timestamped backup
    fs.writeFileSync(backupFilePath, usersData, "utf8");

    // Write latest backup
    fs.writeFileSync(latestBackupPath, usersData, "utf8");

    console.log(`✅ Backup created: ${backupFilePath}`);
    console.log(`✅ Latest backup: ${latestBackupPath}`);
  } catch (error) {
    console.error("❌ Error creating backup:", error);
    // Don't throw - backup failure shouldn't break the main operation
  }
}
