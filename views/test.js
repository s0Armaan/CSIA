const fetch = require('node-fetch');

function fetchPopularMovies() {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
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

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

// function fetchMovieDetails(movie) {
//   const url = 'https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=true&language=en-US&page=1';
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
//     }
//   };

//   fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error('error:' + err));
// }

function fetchMovieDetails(movie) {
  const url = 'https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=true&language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTY0MjBmM2IwNDFlMDkxMjgyZmVjZGRlMjU2NTAzZiIsInN1YiI6IjY1YjBlNmI5ZWEzN2UwMDE5M2U0NjI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bg_SH3Y0udfbjbl0qYoxzAEj2z0_35g26sXN6mjxZnQ'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
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
    return data; 
  } catch (err) {
    console.error('error fetching movie details:', err);
  }
}

// (async () => {
//   const data3 = await fetchMovieDetails('spiderman');
//   if (data3 && data3.results) {
//     let results3 = data3.results[0]; // Safely access the first item in results
//     console.log(results3);
//   } else {
//     console.log("No results found or there was an error fetching the details.");
//   }
// })();

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
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

let data = fetchMovieByGenre(16)
let data2 = fetchMovieRecommendations(787699);
let data3 = fetchPopularMovies()

console.log(data)

// let data = fetchPopularMovies();
// let results = data.results;

// let results2 = data2.results;

// let data3 = fetchMovieDetails('spiderman');
// let results3 = data3.results[0];

// console.log(results3);