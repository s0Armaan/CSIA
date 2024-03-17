
// Function to find and display movies by a given search term
function findAndDisplayMovies(searchTerm) {
  const apiKey = 'YOUR_API_KEY'; 
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

  fetch(searchUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(json => {
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.innerHTML = ''; // Clear the container before displaying new results

      json.results.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.textContent = 'Failed to load movies.';
    });
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value;
  findAndDisplayMovies(searchTerm);
});

findAndDisplayMovies()
// Optionally, you can call findAndDisplayMovies() here with a default search term
// to display some movies when the page loads:
// findAndDisplayMovies('Avengers');
