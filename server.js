const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

function fetchPopularMovies() {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ' // Make sure to replace with your actual API key
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => json.results)
    .catch(err => console.error('error:' + err));
}

function fetchMovieRecommendations(movieId) {
  const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log(json); // Log to see if the response is as expected
      return json.results;
    })
    .catch(err => console.error('error fetching movie recommendations:', err));
}
  
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

// app.get('/home', (req, res) => {
//   fetchPopularMovies().then(movies => {
//     res.render('home', { movies: movies });
//   }).catch(err => {
//     console.error('Error fetching popular movies:', err);
//     res.render('home', { movies: [] }); // Send empty array if there's an error
//   });
// });

// app.get('/home', (req, res) => {
//   const movieId = '787699'; // Replace with dynamic movie ID logic
//   fetchMovieRecommendations(movieId).then(recommendations => {
//     res.render('home', { recommendations: recommendations });
//   }).catch(err => {
//     console.error('Error fetching movie recommendations:', err);
//     res.render('home', { recommendations: [] }); // Send empty array if there's an error
//   });
// });

// app.get('/home', (req, res) => {
//   const movieId = '787699'; // Example movie ID, replace with dynamic logic if needed
  
//   // Fetch popular movies first
//   fetchPopularMovies().then(movies => {
//     // Then fetch movie recommendations
//     fetchMovieRecommendations(movieId).then(recommendations => {
//       // Render home view with both movies and recommendations
//       res.render('home', { recommendations: recommendations, movies: movies });
//     });
//   }).catch(err => {
//     // Log error and render home with what we have (movies might be an empty array if the first call failed)
//     console.error('Error fetching data:', err);
//     res.render('home', { movies: [], recommendations: [] });
//   });
// });

app.get('/home', (req, res) => {
  const movieId = '787699'; // Example movie ID, replace with dynamic logic if needed

  Promise.all([
    fetchPopularMovies(),
    fetchMovieRecommendations(movieId)
  ])
  .then(([movies, recommendations]) => {
    console.log(movies, recommendations); // Log to verify data integrity
    res.render('home', { movies: movies, recommendations: recommendations });
  })
  .catch(err => {
    console.error('Error fetching data:', err);
    res.render('home', { movies: [], recommendations: [] });
  });
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

// app.get('/home', (req, res) => {
//     res.render('home');
// });

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

app.get('/movie/:id', (req, res) => {
  const movieId = req.params.id; // Capture the movie ID from the URL
  fetchMovieDetails(movieId).then(movieDetails => {
    res.render('movie-details', { movie: movieDetails });
  }).catch(err => {
    console.error('Error fetching movie details:', err);
    res.status(500).send('Error fetching movie details');
  });
});

function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ' // Make sure to replace with your actual API key
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error('error fetching movie details:', err));
}
