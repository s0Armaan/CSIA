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
    .then(json => json.results)
    .catch(err => console.error('error fetching movie recommendations:', err));
}

function fetchMovieDetails(movie) {
  const url = 'https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=true&language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

function fetchMovieByGenre(genreId) {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' + genreId;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => json.results) // Extracting the 'results' array from the JSON response
    .catch(err => {
      console.error('error:' + err);
      throw err; // Rethrow the error to be caught by the route handler
    });
}

async function fetchMovieDetails(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data; // Return the data from the response
  } catch (err) {
    console.error('error fetching movie details:', err);
  }
}
  
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

app.get('/home', (req, res) => {
  const movieId = '787699';
  let genreId;

  if (req.query.genreId != undefined && req.query.genreId != null) {
    genreId = req.query.genreId
  } else {
    genreId = '28'
  }

  console.log(genreId)

  Promise.all([
    fetchPopularMovies(),
    fetchMovieByGenre(genreId)
  ])
  .then(([movies, recommendations]) => {
    console.log("rec"); // Log to verify data integrity
    res.render('home', { movies: movies, recommendations: recommendations });
  })
  .catch(err => {
    console.error('Error fetching data:', err);
    res.render('home', { movies: [], recommendations: [] });
  });
});

app.get('/search', async (req, res) => {
  let name;
  if (req.query.image) {
    name = req.query.image;
  } else if (req.query.searchbar) {
    name = req.query.searchbar;
  };

  console.log('User search input:', name); // Log the user search input (for debugging purposes)

  try {
    // Fetch movie details based on search term to get the ID
    const data = await fetchMovieDetails(name);
    
    if (data && data.results && data.results.length > 0) {
      const details = data.results[0]; // Assuming you want the first result
      const movieId = data.results[0].id;

      if (details === null || details === undefined) {
        details = "No results found or there was an error fetching the details.";
        res.redirect('/home?error=Movie+not+found');
      } else {
        // Fetch recommendations based on the movie ID
        const recommendations = await fetchMovieRecommendations(movieId);

        // Check if recommendations exist and render them
        if (recommendations && recommendations.length > 0) {
          res.render('search', { recommendations: recommendations, details: details }); // Modify 'search' template to iterate over recommendations and display them
        } else {
          res.redirect('/home?error=No+recommendations+found+for+the+provided+search+term');
        }
      }

    } else {
      res.redirect('/home?error=Movie+not+found');
    }
  } catch (error) {
    console.error('Error during movie search:', error);
    res.redirect('/home?error=An+error+occurred+while+processing+your+search');
  }
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
