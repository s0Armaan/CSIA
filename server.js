const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static('static'));

const db = new sqlite3.Database('database.db');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT NOT NULL, username TEXT, password TEXT)");
});

app.get('/static/popcorn.png', (req, res) => {
  res.header('Content-Type', 'image/png');

  const imagePath = path.join(__dirname, '/static/popcorn.png')
  res.sendFile(imagePath);
});
app.get('/static/login_background.jpg', (req, res) => {
  res.header('Content-Type', 'image/png');

  const imagePath = path.join(__dirname, '/static/login_background.jpg')
  res.sendFile(imagePath);
});

app.get('/users', (req, res) => {
    db.run('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const sql = 'SELECT * FROM users WHERE username = ? OR email = ? AND password = ?';
  
    db.get(sql, [username, username, password], (err, row) => {
      if (err) {
        console.error('Error checking credentials:', err);
        res.status(500).send('Internal Server Error');
      } else if (row) {
        res.redirect('/frontpage');
      } else {
        res.redirect('/login?error=InvalidCredentials');
      }
    });
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/frontpage', (req, res) => {
  res.render('frontpage');
});

app.get('/register', (req, res) => {
    res.render('register');
});
  
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(sql, [username, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('User registered successfully');
        res.redirect('/login');
      }
    });
});
// Serve static files in the public directory
// app.use(express.static(path.join(__dirname, 'static' )));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});