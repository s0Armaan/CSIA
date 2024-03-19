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

  return fetch(url, options)
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

  return fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

let data = fetchPopularMovies();
let results = data.results;

let data2 = fetchMovieRecommendations(787699);
let results2 = data2.results;


console.log(results2);