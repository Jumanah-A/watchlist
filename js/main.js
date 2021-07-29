function handleSubmit(event) {
  event.preventDefault();
  var movieName = document.querySelector('.title').value;
  getMovieData(movieName.split(' ').join('+'));
  switchViews('movie-view');
}
document.querySelector('form').addEventListener('submit', handleSubmit);

function getMovieData(name) {
  var xhr = new XMLHttpRequest();
  var movieData;
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    addMovie(xhr.response);
  });
  xhr.send();
  return movieData;
}

function addMovie(movieObject) {
  document.querySelector('.movie-title').textContent = movieObject.Title;
  document.querySelector('.year').textContent = movieObject.Year.split('–').join(' – ');
  document.querySelector('.genre').textContent = movieObject.Genre;
  document.querySelector('.imdb-rating').textContent = movieObject.imdbRating;
  document.querySelector('.plot').textContent = movieObject.Plot;
  document.querySelector('.poster').setAttribute('src', movieObject.Poster);
}

function switchViews(view) {
  var $viewList = document.querySelectorAll('.view');
  if (view === 'search-view') {
    document.querySelector('.header').className = 'header hidden';
    document.querySelector('body').className = 'background-image';
  } else {
    document.querySelector('body').className = 'background-color';
    document.querySelector('.header').className = 'header';
    for (var i = 0; i < $viewList.length; i++) {
      if (view !== $viewList[i].getAttribute('data-view')) {
        $viewList[i].className = 'view hidden';
      } else {
        $viewList[i].className = 'view';
      }
    }
  }

}
