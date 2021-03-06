/* Assignment 1: Flixster */

/* API Info */
const apiKey = ""
const nowPlayingMovieURL = "https://api.themoviedb.org/3/movie/now_playing?"
const imageURL = "https://image.tmdb.org/t/p/"
const searchMovieURL = "https://api.themoviedb.org/3/search/movie?"
const movieVideos = "https://api.themoviedb.org/3/movie/"
const youtubeVideo = "https://www.youtube.com/embed/"

/* Other variables */
var pageNum = 1

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

  responseData.results.forEach((element, index) => {
    movieGrid.innerHTML += addMovieToGrid(element)
    addEmbedVideo(element, index)
  })

  /** Movie Popup */
  const moviePopup = document.querySelectorAll(".movie-popup-container")
  const movieImages = document.querySelectorAll(".movie-image-container")
  const popupImages = document.querySelectorAll(".popup-img")
  const embedVideos = document.querySelectorAll(".movie-trailer")
  const popupBackdrop = document.querySelectorAll(".popup-backdrop")

  moviePopupAppear(movieImages, moviePopup)
  embedVideoAppear(popupImages, embedVideos, popupBackdrop)
}

/** Movie popup fade in and close on click */
function moviePopupAppear(movieImages, moviePopup) {
  for (let i = 0; i < movieImages.length; i++) {
    movieImages[i].addEventListener("click", () => {
      moviePopup[i].style.visibility = "visible"
      moviePopup[i].style.animation = "fadeInAnimation ease 2s"
    })
  }

  /* Close Popup */
  const popupClose = document.querySelectorAll(".popup-close > button")
  for (let i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener("click", () => {
      moviePopup[i].style.visibility = "hidden"
    })
  }
  loadMore.classList.remove("hidden")
}

/** Take in a movie object and display the movie image, movie title and movie votes 
 * Fetch videos associated with movie id
*/
function addMovieToGrid(movie) {
  return `
    <div class="movie-container">
      <div class="movie-image-container">
        <img class="movie-image" src="${imageURL}original/${movie.poster_path}" alt="${movie.title}">
      </div>
      <div class="movie-votes">??? ${movie.vote_average}</div>
      <div class="movie-title">${movie.title}</div>
      <div class="movie-popup-container">
        <div class="movie-popup">
          <div class="popup-close">
            <div class="movie-title">${movie.title} | ??? ${movie.vote_average}</div>
            <button type="submit">x</button>
          </div>
          <div class="popup-img">
            <img class="popup-backdrop"src=${imageURL}original/${movie.backdrop_path} alt="">
            <iframe class="movie-trailer hidden" src=""></iframe>
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

  responseData.results.forEach((element, index) => {
    movieGrid.innerHTML += addMovieToGrid(element)
    addEmbedVideo(element, index)
  })

  /** Movie Popup */
  const moviePopup = document.querySelectorAll(".movie-popup-container")
  const movieImages = document.querySelectorAll(".movie-image-container")
  const popupImages = document.querySelectorAll(".popup-img")
  const embedVideos = document.querySelectorAll(".movie-trailer")
  const popupBackdrop = document.querySelectorAll(".popup-backdrop")

  moviePopupAppear(movieImages, moviePopup)
  embedVideoAppear(popupImages, embedVideos, popupBackdrop)
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

/* Reload to now playing movie grid */
function reloadCurrentMovies() {
  pageNum = 1
  movieGrid.innerHTML = ``
  heading.classList.remove("hidden")
  heading.innerHTML = "Now playing"
  updateMovieGrid()
}

/* Fetch the video associated with movie */
async function addEmbedVideo(element, index) {
  const videosWithMovie = `${movieVideos}${element.id}/videos?api_key=${apiKey}`
  const responseVideos = await fetch(videosWithMovie)
  const responseVideosData = await responseVideos.json()
  var videosWithYoutube = `${youtubeVideo}${responseVideosData.results[0].key}`
  
  const movieTrailerVideos = document.querySelectorAll(".movie-trailer")
  movieTrailerVideos[index].src = videosWithYoutube
}

function embedVideoAppear(popupImages, embedVideos, popupBackdrop) {
  popupImages.forEach((element, index) => {
    element.addEventListener("mouseover", () => {
      embedVideos[index].classList.remove("hidden")
      popupBackdrop[index].classList.add("hidden")
    })
  })

  popupImages.forEach((element, index) => {
    element.addEventListener("mouseleave", () => {
      embedVideos[index].classList.add("hidden")
      popupBackdrop[index].classList.remove("hidden")
    })
  })
}

/*
* functions here execute as soon as the page loads
*/
window.onload = function () {
  // display the movie grid
  updateMovieGrid()

}
