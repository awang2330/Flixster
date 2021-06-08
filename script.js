/* Assignment 1: Flixster */

// const movieInfo = {
//   title: "", 
//   posterImage: "", 
//   votes: ""
// }

const movieInfo = [
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
  {title: "Harry Potter", posterImage: "imgs/harry-potter.jpg", votes: "2"},
]

const movieGrid = document.getElementById('movie-grid')

/** Take in a movie object and display the movie image, movie title and movie votes */
function addMovieToGrid(movie) {
  return `
    <div class="movie-container">
      <div class="movie-image">
        <img src="${movie.posterImage}" alt="${movie.title}">
      </div>
      <div class="movie-votes">${movie.votes}</div>
      <div class="movie-title">${movie.title}</div>
    </div>
  `
}

/** Displays the movie grid by adding each movie from a movie list */
function updateMovieGrid() {
  movieInfo.forEach(element => {
    movieGrid.innerHTML += addMovieToGrid(element)
  });
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
