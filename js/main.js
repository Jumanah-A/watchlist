function handleSubmit(event) {
  event.preventDefault();
  var movieName = document.querySelector('.title').value;
  getMovieData(movieName.split(' ').join('+'));
  switchViews('movie-view');
}
document.querySelector('form').addEventListener('submit', handleSubmit);

function getMovieData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    document.getElementById('movie-display').appendChild(addMovie(xhr.response));
    document.querySelector('.add-watchlist').addEventListener('click', handleClick);
  });
  xhr.send();
}
function handleClick(event) {
  // if (event.target.className === "add-watchlist red-button")
  // {
  //   // console.log("add to wtachlist button is clicked ");
  // }
}
document.querySelector('button').addEventListener('click', handleClick);

function addMovie(movieObject) {
  var rowPoster = document.createElement('div');
  rowPoster.className = 'row justify-center align-center movie-page';

  var posterImg = document.createElement('img');
  posterImg.className = 'poster';
  posterImg.setAttribute('src', movieObject.Poster);
  rowPoster.appendChild(posterImg);

  var row = document.createElement('div');
  row.className = 'row justify-center align-center movie-data';

  var fullColumn = document.createElement('div');
  fullColumn.className = 'column-full';

  var heading = document.createElement('h4');
  heading.textContent = 'Title:';

  var paragraph = document.createElement('p');
  paragraph.className = 'movie-title';
  paragraph.textContent = movieObject.Title;

  fullColumn.appendChild(heading);
  fullColumn.appendChild(paragraph);
  row.appendChild(fullColumn);

  var fullColumnYear = document.createElement('div');
  fullColumnYear.className = 'column-full';

  var headingYear = document.createElement('h4');
  headingYear.textContent = 'Year:';

  var paragraphYear = document.createElement('p');
  paragraphYear.className = 'year';
  paragraphYear.textContent = movieObject.Year.split('–').join(' – ');

  fullColumnYear.appendChild(headingYear);
  fullColumnYear.appendChild(paragraphYear);
  row.appendChild(fullColumnYear);

  var fullColumnGenre = document.createElement('div');
  fullColumnGenre.className = 'column-full';

  var headingGenre = document.createElement('h4');
  headingGenre.textContent = 'Genre:';

  var paragraphGenre = document.createElement('p');
  paragraphGenre.className = 'genre';
  paragraphGenre.textContent = movieObject.Genre;

  fullColumnGenre.appendChild(headingGenre);
  fullColumnGenre.appendChild(paragraphGenre);
  row.appendChild(fullColumnGenre);

  var fullColumnImdb = document.createElement('div');
  fullColumnImdb.className = 'column-full';

  var headingImdb = document.createElement('h4');
  headingImdb.textContent = 'IMDb Rating:';

  var paragraphImdb = document.createElement('p');
  paragraphImdb.className = 'imdb-rating';
  paragraphImdb.textContent = movieObject.imdbRating;

  fullColumnImdb.appendChild(headingImdb);
  fullColumnImdb.appendChild(paragraphImdb);
  row.appendChild(fullColumnImdb);

  // hi
  var fullColumnPlot = document.createElement('div');
  fullColumnPlot.className = 'column-full';

  var headingPlot = document.createElement('h4');
  headingPlot.textContent = 'Plot:';

  var paragraphPlot = document.createElement('p');
  paragraphPlot.className = 'plot';
  paragraphPlot.textContent = movieObject.Plot;

  fullColumnPlot.appendChild(headingPlot);
  fullColumnPlot.appendChild(paragraphPlot);
  row.appendChild(fullColumnPlot);

  var info = document.createElement('div');
  info.className = 'movie-info justify-center align-center one-padding';
  info.appendChild(row);

  var addWatchlistRow = document.createElement('div');
  addWatchlistRow.className = 'row one-padding';
  var addWatchlistColumn = document.createElement('div');
  addWatchlistColumn.className = 'column-half';
  var addWatchlistButton = document.createElement('button');
  addWatchlistButton.className = 'add-watchlist red-button';
  addWatchlistButton.setAttribute('type', 'button');
  var plusIcon = document.createElement('i');
  plusIcon.className = 'fas fa-plus';
  addWatchlistButton.appendChild(plusIcon);
  addWatchlistButton.append(' Add to watchlist');
  addWatchlistColumn.appendChild(addWatchlistButton);
  addWatchlistRow.appendChild(addWatchlistColumn);
  var block = document.createElement('div');
  block.appendChild(rowPoster);
  block.appendChild(info);
  block.appendChild(addWatchlistRow);
  return block;
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
