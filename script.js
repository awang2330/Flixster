/* Assignment 1: Flixster */

/* API Info */
const apiKey = "ec9d43fea05c5d5d0c487254238e6858"
const nowPlayingMovieURL = "https://api.themoviedb.org/3/movie/now_playing?"
const imageURL = "https://image.tmdb.org/t/p/"
const searchMovieURL = "https://api.themoviedb.org/3/search/movie?"

/* Other variables */
var pageNum = 1

/* Query Selectors */
const movieGrid = document.getElementById('movie-grid')
const searchMovie = document.querySelector("form")
const inputField = document.querySelector("input")
const loadMore = document.querySelector(".load-more")
const heading = document.querySelector(".heading")
const exitSearch = document.querySelector(".exit-search")

/* Event Listeners */
searchMovie.addEventListener("submit", displaySearchResults)
loadMore.addEventListener("click", loadMoreMovies)
inputField.addEventListener("click", clearMovieGrid)
exitSearch.addEventListener("click", updateMovieGrid)

/** Displays the movie grid by adding each movie from a movie list */
async function updateMovieGrid() {
  nowPlayingMovieSearch = nowPlayingMovieURL + "api_key=" + apiKey + "&page=" + pageNum
  const response = await fetch(nowPlayingMovieSearch)
  const responseData = await response.json()

  responseData.results.forEach(element => {
    movieGrid.innerHTML += addMovieToGrid(element)
  });

  loadMore.classList.remove("hidden")
}

/** Take in a movie object and display the movie image, movie title and movie votes */
function addMovieToGrid(movie) {
  return `
    <div class="movie-container">
      <div class="movie-image">
        <img src="${imageURL}original/${movie.poster_path}" alt="${movie.title}">
      </div>
      <div class="movie-votes">${movie.vote_average}</div>
      <div class="movie-title">${movie.title}</div>
    </div>
  `
}

/** Display the search bar results */
async function displaySearchResults(event) {
  event.preventDefault()
  const query = event.target.movie.value
  searchMovieSearch = searchMovieURL + "api_key=" + apiKey + "&query=" + query

  const response = await fetch(searchMovieSearch)
  const responseData = await response.json()

  // clear the movie grid before displaying results
  movieGrid.innerHTML = ``

  heading.classList.remove("hidden")
  heading.innerHTML = `Search Results: ${query}`

  responseData.results.forEach(element => {
    movieGrid.innerHTML += addMovieToGrid(element)
  })
}

/** Clear movie grid area when search bar is clicked */
function clearMovieGrid() {
  movieGrid.innerHTML = ``
  loadMore.classList.add("hidden")
  heading.classList.add("hidden")
}

/** Display more movies */
function loadMoreMovies() {
  pageNum++
  updateMovieGrid()
}



/******* EXTRA *******/
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
