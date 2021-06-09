/* Assignment 1: Flixster */

/* API Info */
const apiKey = "ec9d43fea05c5d5d0c487254238e6858"
const apiURL = "https://api.themoviedb.org/3/movie/now_playing?"

/* Other variables */
var pageNum = 1

/* Query Selectors */
const movieGrid = document.getElementById('movie-grid')

/** Displays the movie grid by adding each movie from a movie list */
async function updateMovieGrid() {
  apiURLSearch = apiURL + "api_key=" + apiKey + "&page=" + pageNum
  const response = await fetch(apiURLSearch)
  // await fetch(`${apiURL}api_key=${apiKey}&query=${currentMovies}`)
  console.log(apiURLSearch)
  const responseData = await response.json()

  console.log(responseData)
  responseData.results.forEach(element => {
    movieGrid.innerHTML += addMovieToGrid(element)
  });
}

/** Take in a movie object and display the movie image, movie title and movie votes */
function addMovieToGrid(movie) {
  return `
    <div class="movie-container">
      <div class="movie-image">
        <img src="${movie.poster_path}" alt="${movie.title}">
      </div>
      <div class="movie-votes">${movie.vote_average}</div>
      <div class="movie-title">${movie.title}</div>
    </div>
  `
}

/** Add event listeners on movie containers to make pop-ups */
function clickPopUp() {
  const movieList = document.querySelectorAll(".movie-container")
  for (let i = 0; i < movieList.length; i++) {
    console.log(movieList[i])
    movieList[i].addEventListener('click', () => {
      //TODO::popup
    })
  }
}
// addEventListener('click', loadPopUp(this))

/*
* functions here execute as soon as the page loads
*/
window.onload = function () {
  // display the movie grid
  updateMovieGrid()

  // pop up appear on click
  clickPopUp()
}
