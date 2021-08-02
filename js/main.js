var currentItem = {};
function handleSubmit(event) {
  event.preventDefault();
  var movieName = document.querySelector('.title').value;
  getMovieData(movieName.split(' ').join('+'));
  switchViews('movie-view');
  document.querySelector('form').reset();
}
document.querySelector('form').addEventListener('submit', handleSubmit);

function getMovieData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    currentItem['Title'] = xhr.response.Title;
    currentItem['Year'] = xhr.response.Year;
    currentItem['Genre'] = xhr.response.Genre;
    currentItem['imdbRating'] = xhr.response.imdbRating;
    currentItem['Plot'] = xhr.response.Plot;
    currentItem['Poster'] = xhr.response.Poster;
    document.getElementById('movie-display').appendChild(addMovie(currentItem));
    document.querySelector('.add-watchlist').addEventListener('click', handleClick);
  });
  xhr.send();
}
function handleClick(event) {
  if (event.target.className === "add-watchlist red-button")
  {
    console.log(currentItem);
    console.log("add to wtachlist button is clicked ");
    if (!watchData.watchListArray.includes(currentItem))
    {
      watchData.watchListArray.push(currentItem);
    }
  } else if (event.target.className === "search-icon-header fas fa-search fa-3x")
  {
    switchViews('search-view');
    document.getElementById('movie-display').innerHTML = "";
  } else if (event.target.className === "mywatchlist")
  {
    console.log("must swicth views");
    for(var i =0;i<watchData.watchListArray.length;i++)
    {
      document.getElementById('mywatchlist').appendChild(addMovieWatchlist(watchData.watchListArray[i]));
    }
    // document.getElementById('mywatchlist').appendChild(addMovieWatchlist(watchData.watchListArray[i]));
    switchViews('mywatchlist-view');
  }
  console.log("button is clicked ");
  console.log(event.target.className);

}
document.querySelector('button').addEventListener('click', handleClick);
document.querySelector('header').addEventListener('click', handleClick);

function addMovie(movieObject) {
  var rowPoster = document.createElement('div');
  rowPoster.className = 'row justify-center align-center movie-page';

  var posterImg = document.createElement('img');
  posterImg.className = 'poster';
  posterImg.setAttribute('src', movieObject.Poster);
  rowPoster.appendChild(posterImg);

  var row = document.createElement('div');
  row.className = 'row align-center flex-column movie-data';

  var fullColumn = document.createElement('div');
  fullColumn.className = 'column-three-four';

  var heading = document.createElement('h4');
  heading.textContent = 'Title:';

  var paragraph = document.createElement('p');
  paragraph.className = 'movie-title';
  paragraph.textContent = movieObject.Title;

  fullColumn.appendChild(heading);
  fullColumn.appendChild(paragraph);
  row.appendChild(fullColumn);

  var fullColumnYear = document.createElement('div');
  fullColumnYear.className = 'column-three-four';

  var headingYear = document.createElement('h4');
  headingYear.textContent = 'Year:';

  var paragraphYear = document.createElement('p');
  paragraphYear.className = 'year';
  paragraphYear.textContent = movieObject.Year.split('–').join(' – ');

  fullColumnYear.appendChild(headingYear);
  fullColumnYear.appendChild(paragraphYear);
  row.appendChild(fullColumnYear);

  var fullColumnGenre = document.createElement('div');
  fullColumnGenre.className = 'column-three-four';

  var headingGenre = document.createElement('h4');
  headingGenre.textContent = 'Genre:';

  var paragraphGenre = document.createElement('p');
  paragraphGenre.className = 'genre';
  paragraphGenre.textContent = movieObject.Genre;

  fullColumnGenre.appendChild(headingGenre);
  fullColumnGenre.appendChild(paragraphGenre);
  row.appendChild(fullColumnGenre);

  var fullColumnImdb = document.createElement('div');
  fullColumnImdb.className = 'column-three-four';

  var headingImdb = document.createElement('h4');
  headingImdb.textContent = 'IMDb Rating:';

  var paragraphImdb = document.createElement('p');
  paragraphImdb.className = 'imdb-rating';
  paragraphImdb.textContent = movieObject.imdbRating;

  fullColumnImdb.appendChild(headingImdb);
  fullColumnImdb.appendChild(paragraphImdb);
  row.appendChild(fullColumnImdb);

  var fullColumnPlot = document.createElement('div');
  fullColumnPlot.className = 'column-three-four';

  var headingPlot = document.createElement('h4');
  headingPlot.textContent = 'Plot:';

  var paragraphPlot = document.createElement('p');
  paragraphPlot.className = 'plot';
  paragraphPlot.textContent = movieObject.Plot;

  fullColumnPlot.appendChild(headingPlot);
  fullColumnPlot.appendChild(paragraphPlot);
  row.appendChild(fullColumnPlot);

  var info = document.createElement('div');
  info.className = 'movie-info one-padding justify-center';
  info.appendChild(row);

  var addWatchlistRow = document.createElement('div');
  addWatchlistRow.className = 'row one-padding justify-center';
  var addWatchlistColumn = document.createElement('div');
  // addWatchlistColumn.className = 'column-half';
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
  block.className = "block";
  block.appendChild(rowPoster);
  block.appendChild(info);
  block.appendChild(addWatchlistRow);
  console.log(block);
  return block;
}

function addMovieWatchlist(movieObject) {
  var rowPoster = document.createElement('div');
  rowPoster.className = 'justify-center align-center';

  var posterImg = document.createElement('img');
  posterImg.className = 'poster';
  posterImg.setAttribute('src', movieObject.Poster);
  rowPoster.appendChild(posterImg);

  var columnFour = document.createElement('div');
  columnFour.className = 'column-four';
  columnFour.appendChild(rowPoster);

  // movie data row

  var row = document.createElement('div');
  row.className = 'row flex-column movie-data one-padding';

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

  var fullColumnPlot = document.createElement('div');
  fullColumnPlot.className = 'column-three-four';

  var headingPlot = document.createElement('h4');
  headingPlot.textContent = 'Plot:';

  var paragraphPlot = document.createElement('p');
  paragraphPlot.className = 'plot';
  paragraphPlot.textContent = movieObject.Plot;

  fullColumnPlot.appendChild(headingPlot);
  fullColumnPlot.appendChild(paragraphPlot);
  row.appendChild(fullColumnPlot);

  var info = document.createElement('div');
  info.className = 'column-three-four top-margin';
  info.appendChild(row);
  var block = document.createElement('div');
  block.className = "block";

  var rowImgBottom = document.createElement('div');
  rowImgBottom.className = "row bottom-padding";
  rowImgBottom.appendChild(rowPoster);
  block.appendChild(rowImgBottom);
  block.appendChild(info);
  console.log(block);
  console.log(block);
  return block;
}








function switchViews(view) {
  var $viewList = document.querySelectorAll('.view');
  for (var i = 0; i < $viewList.length; i++) {
    if (view !== $viewList[i].getAttribute('data-view')) {
      $viewList[i].className = 'view hidden';
    } else {
      $viewList[i].className = 'view';
    }
  }
  if (view === 'search-view') {
    document.querySelector('.header').className = 'header hidden';
    document.querySelector('body').className = 'background-image';
  } else {
    document.querySelector('body').className = 'background-color';
    document.querySelector('.header').className = 'header';
  }
}
