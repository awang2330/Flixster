/* Assignment 1: Flixster */

/* API Info */
const apiKey = "ec9d43fea05c5d5d0c487254238e6858"
const nowPlayingMovieURL = "https://api.themoviedb.org/3/movie/now_playing?"
const imageURL = "https://image.tmdb.org/t/p/"
const searchMovieURL = "https://api.themoviedb.org/3/search/movie?"

/* Other variables */
var pageNum = 1
var popupNum = 0

/* Query Selectors */
const movieGrid = document.querySelector('#movie-grid')
const searchMovie = document.querySelector("form")
const inputField = document.querySelector("input")
const loadMore = document.querySelector(".load-more")
const heading = document.querySelector(".heading")
const exitSearch = document.querySelector(".exit-search")

/* Event Listeners */
searchMovie.addEventListener("submit", displaySearchResults)
loadMore.addEventListener("click", loadMoreMovies)
inputField.addEventListener("click", clearMovieGrid)
exitSearch.addEventListener("click", reloadCurrentMovies) // clear past movies & display current movies

/** Displays the movie grid by adding each movie from a movie list */
async function updateMovieGrid() {
  nowPlayingMovieSearch = nowPlayingMovieURL + "api_key=" + apiKey + "&page=" + pageNum
  const response = await fetch(nowPlayingMovieSearch)
  const responseData = await response.json()

  responseData.results.forEach(element => {
    movieGrid.innerHTML += addMovieToGrid(element)
  })

  /** Movie Popup */
  const moviePopup = document.querySelectorAll(".movie-popup-container")
  const movieImages = document.querySelectorAll(".movie-image")

  for (let i = 0; i < movieImages.length; i++) {
    movieImages[i].addEventListener("click", () => {
      moviePopup[i].style.visibility = "visible"
      popupNum = i
    })
  }

  const popupClose = document.querySelectorAll(".popup-close > button")
  for (let i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener("click", () => {
      moviePopup[i].style.visibility = "hidden"
    })
  }

  loadMore.classList.remove("hidden")
}

/** Take in a movie object and display the movie image, movie title and movie votes */
function addMovieToGrid(movie) {
  return `
    <div class="movie-container">
      <div class="movie-image">
        <img src="${imageURL}original/${movie.poster_path}" alt="${movie.title}">
      </div>
      <div class="movie-votes">⭐${movie.vote_average}</div>
      <div class="movie-title">${movie.title}</div>
      <div class="movie-popup-container">
        <div class="movie-popup">
          <div class="popup-close">
            <div class="movie-title">${movie.title} | ⭐${movie.vote_average}</div>
            <button type="submit">x</button>
          </div>
          
          <div class="popup-img">
            <img src=${imageURL}original/${movie.backdrop_path} alt="">
          </div>
          <div>
            <span>Release Date: ${movie.release_date}</span>
          </div>
          <span class="movie-overview">${movie.overview}</span>
        </div>
      </div>
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
  loadMore.classList.toggle("hidden")
  heading.classList.add("hidden")
}

/** Display more movies */
function loadMoreMovies() {
  pageNum++
  updateMovieGrid()
}

function reloadCurrentMovies() {
  movieGrid.innerHTML = ``
  heading.classList.remove("hidden")
  heading.innerHTML = "Now playing"
  updateMovieGrid()
}

/** Add event listeners on movie containers to make pop-ups */
function clickPopUp() {
  const moviePopup = document.getElementsByClassName('movie-popup')
  var movieImages = document.getElementsByClassName('movie-image')
  console.log(movieImages)
  console.log(movieImages.length)

  console.log(document.querySelectorAll(".movie-popup"))
  console.log(movieGrid)
  for (let i = 0; i < movieImages.length; i++) {
    console.log(movieImages[i])
    movieImages[i].addEventListener("click", () => {
      console.log("click",i)
      this.classList.remove("hidden")
    })
 }
}

/*
* functions here execute as soon as the page loads
*/
window.onload = function () {
  // display the movie grid
  updateMovieGrid()

  // pop up appear on click
  // clickPopUp()
}
