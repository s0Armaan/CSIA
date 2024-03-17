const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Create a users table if not exists
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT NOT NULL, username TEXT, password TEXT)");


  // Query and log the data
  db.each("SELECT * FROM users", (err, row) => {
    console.log(row.id, row.username, row.password);
  });
});

// Close the database connection
db.close();