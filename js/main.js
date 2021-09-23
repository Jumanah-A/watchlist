/* exported watchData */
/* global watchData */
function handleSubmit(event) {
  event.preventDefault();
  var movieName = document.querySelector('.title').value;
  getMovieData(movieName.split(' ').join('+'));
  document.getElementById('movie-display').removeChild(document.getElementById('movie-display').firstChild);
  switchViews('movie-view');
  document.querySelector('form').reset();
}
function getMovieData(name) {
  var currentItem = {};
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.Response === 'False') {
      document.getElementById('movie-display').appendChild(titleNotFound(event));
      document.querySelector('.back').addEventListener('click', function (event) { handleBackClick(event); });
    } else {
      currentItem.Title = xhr.response.Title;
      currentItem.Year = xhr.response.Year;
      currentItem.Genre = xhr.response.Genre;
      currentItem.imdbRating = xhr.response.imdbRating;
      currentItem.Plot = xhr.response.Plot;
      currentItem.Poster = xhr.response.Poster === 'N/A' ? 'images/Picture-Not-Available.jpeg' : xhr.response.Poster;
      document.getElementById('movie-display').appendChild(movieInfo('movie', currentItem));
      watchData.currentMovie = currentItem;
      document.querySelector('.rate').addEventListener('click', function (event, currentItem) { handleRateClick(event, watchData.currentMovie); });
      document.querySelector('.add-watchlist').addEventListener('click', function (event) { handleAddWatchlistClick(event, watchData.currentMovie); });
    }
  });
  xhr.send();
}
function titleNotFound(event) {
  var modalDiv = document.createElement('div');
  modalDiv.className = 'modal overlay-shadow';

  var dialogueDiv = document.createElement('div');
  dialogueDiv.className = 'dialogue';

  var h2El = document.createElement('h2');
  h2El.textContent = "The title you typed isn't available right now. Please enter a different title.";

  var backButton = document.createElement('button');
  backButton.className = 'red-button back';
  backButton.textContent = 'Back to Search Page';

  dialogueDiv.appendChild(h2El);
  dialogueDiv.appendChild(backButton);

  modalDiv.appendChild(dialogueDiv);

  return modalDiv;
}
function handleBackClick(event) {
  switchViews('search-view');
}

function movieInfo(view, currentItem) {
  var posterImg = document.createElement('img');
  posterImg.className = 'poster';
  posterImg.setAttribute('src', currentItem.Poster);

  var headingTitle = document.createElement('h4');
  headingTitle.textContent = 'Title:';
  var paragraphTitle = document.createElement('p');
  paragraphTitle.className = 'movie-title';
  paragraphTitle.textContent = currentItem.Title;

  var headingYear = document.createElement('h4');
  headingYear.textContent = 'Year:';
  var paragraphYear = document.createElement('p');
  paragraphYear.className = 'year';
  paragraphYear.textContent = currentItem.Year.split('–').join(' – ');

  var headingGenre = document.createElement('h4');
  headingGenre.textContent = 'Genre:';
  var paragraphGenre = document.createElement('p');
  paragraphGenre.className = 'genre';
  paragraphGenre.textContent = currentItem.Genre;

  var headingImdb = document.createElement('h4');
  headingImdb.textContent = 'IMDb Rating:';
  var paragraphImdb = document.createElement('p');
  paragraphImdb.className = 'imdb-rating';
  paragraphImdb.textContent = currentItem.imdbRating;

  var headingPlot = document.createElement('h4');
  headingPlot.textContent = 'Plot:';
  var paragraphPlot = document.createElement('p');
  paragraphPlot.className = 'plot';
  paragraphPlot.textContent = currentItem.Plot;

  if (view === 'movie') {
    var rowPoster = document.createElement('div');
    rowPoster.className = 'row justify-center align-center movie-page';
    rowPoster.appendChild(posterImg);

    var row = document.createElement('div');
    row.className = 'row align-center flex-column movie-data';

    var threeFourColumn = document.createElement('div');
    threeFourColumn.className = 'column-three-four padding-075';

    threeFourColumn.appendChild(headingTitle);
    threeFourColumn.appendChild(paragraphTitle);
    row.appendChild(threeFourColumn);

    var threeFourYear = document.createElement('div');
    threeFourYear.className = 'column-three-four padding-075';

    threeFourYear.appendChild(headingYear);
    threeFourYear.appendChild(paragraphYear);
    row.appendChild(threeFourYear);

    var threeFourGenre = document.createElement('div');
    threeFourGenre.className = 'column-three-four padding-075';

    threeFourGenre.appendChild(headingGenre);
    threeFourGenre.appendChild(paragraphGenre);
    row.appendChild(threeFourGenre);

    var threeFourImdb = document.createElement('div');
    threeFourImdb.className = 'column-three-four padding-075';

    threeFourImdb.appendChild(headingImdb);
    threeFourImdb.appendChild(paragraphImdb);
    row.appendChild(threeFourImdb);

    var threeFourPlot = document.createElement('div');
    threeFourPlot.className = 'column-three-four padding-075';

    threeFourPlot.appendChild(headingPlot);
    threeFourPlot.appendChild(paragraphPlot);
    row.appendChild(threeFourPlot);

    var info = document.createElement('div');
    info.className = 'movie-info one-padding justify-center';
    info.appendChild(row);

    var addWatchlistRow = document.createElement('div');
    addWatchlistRow.className = 'row one-padding justify-even';
    var addWatchlistColumn = document.createElement('div');
    var addWatchlistButton = document.createElement('button');
    addWatchlistButton.className = 'add-watchlist red-button';
    addWatchlistButton.setAttribute('type', 'button');
    var plusIcon = document.createElement('i');
    plusIcon.className = 'fas fa-plus';
    addWatchlistButton.appendChild(plusIcon);
    addWatchlistButton.append(' Add to watchlist');
    addWatchlistColumn.appendChild(addWatchlistButton);
    addWatchlistRow.appendChild(addWatchlistColumn);

    var rateColumn = document.createElement('div');
    var rateButton = document.createElement('button');
    rateButton.className = 'rate red-button';
    rateButton.setAttribute('type', 'button');
    var thumbsUp = document.createElement('i');
    thumbsUp.className = 'fas fa-thumbs-up';
    rateButton.appendChild(thumbsUp);
    rateButton.append(' Rate');
    rateColumn.appendChild(rateButton);
    addWatchlistRow.appendChild(rateColumn);

    var block = document.createElement('div');
    block.className = 'entry';
    block.appendChild(rowPoster);
    block.appendChild(info);
    block.appendChild(addWatchlistRow);
    return block;

  } else if (view === 'watchlist') {
    var rowPosterWatchlist = document.createElement('div');
    rowPosterWatchlist.className = 'justify-center align-center';
    rowPosterWatchlist.appendChild(posterImg);

    var columnFour = document.createElement('div');
    columnFour.className = 'column-four';
    columnFour.appendChild(rowPosterWatchlist);

    var rowWatch = document.createElement('div');
    rowWatch.className = 'row flex-column movie-data-watchlist one-padding';

    var fullColumn = document.createElement('div');
    fullColumn.className = 'column-full';

    fullColumn.appendChild(headingTitle);
    fullColumn.appendChild(paragraphTitle);
    rowWatch.appendChild(fullColumn);

    var fullColumnYear = document.createElement('div');
    fullColumnYear.className = 'column-full';

    fullColumnYear.appendChild(headingYear);
    fullColumnYear.appendChild(paragraphYear);
    rowWatch.appendChild(fullColumnYear);

    var fullColumnGenre = document.createElement('div');
    fullColumnGenre.className = 'column-full';

    fullColumnGenre.appendChild(headingGenre);
    fullColumnGenre.appendChild(paragraphGenre);
    rowWatch.appendChild(fullColumnGenre);

    var fullColumnImdb = document.createElement('div');
    fullColumnImdb.className = 'column-full';

    fullColumnImdb.appendChild(headingImdb);
    fullColumnImdb.appendChild(paragraphImdb);
    rowWatch.appendChild(fullColumnImdb);

    var fullColumnPlot = document.createElement('div');
    fullColumnPlot.className = 'column-full';

    fullColumnPlot.appendChild(headingPlot);
    fullColumnPlot.appendChild(paragraphPlot);
    rowWatch.appendChild(fullColumnPlot);

    var infoWatch = document.createElement('div');
    infoWatch.className = 'column-three-four padding-075';
    infoWatch.appendChild(rowWatch);
    var watchlistentry = document.createElement('div');
    watchlistentry.className = 'watchlistentry';

    var rowBottom = document.createElement('div');
    rowBottom.className = 'row bottom-padding';
    rowBottom.appendChild(columnFour);
    rowBottom.appendChild(infoWatch);
    watchlistentry.appendChild(rowBottom);
    return watchlistentry;
  }

}

function handleMywatchlistClick(event) {
  showWatchlist(watchData.watchListArray);
  if (watchData.watchListArray.length === 0) {
    document.querySelector('.no-items').className = 'row no-items justify-center';
  } else {
    document.querySelector('.no-items').className = 'row no-items justify-center hidden';
  }
  switchViews('mywatchlist-view');
}

function handleSearchClick(event) {
  switchViews('search-view');
}

function handleAddWatchlistClick(event, entry) {
  addToWatchlist(entry);
}

function handleRateClick(event, entry) {
  var current = watchData.currentMovie;
  if (document.querySelector('.rating') !== null) {
    document.querySelector('.rating').remove();
  }
  document.querySelector('.movie-data').appendChild(showRating(current));
  document.getElementById('first-star').addEventListener('click', function (event, current) { handleRatingStars(event, watchData.currentMovie); });
  document.getElementById('second-star').addEventListener('click', function (event, current) { handleRatingStars(event, watchData.currentMovie); });
  document.getElementById('third-star').addEventListener('click', function (event, current) { handleRatingStars(event, watchData.currentMovie); });
  document.getElementById('fourth-star').addEventListener('click', function (event, current) { handleRatingStars(event, watchData.currentMovie); });
  document.getElementById('fifth-star').addEventListener('click', function (event, current) { handleRatingStars(event, watchData.currentMovie); });
}

function handleRatingStars(event, enrty) {
  var entry = watchData.currentMovie;
  switch (event.target.id) {
    case 'first-star':
      colorStars('first-star');
      updateRating(event.target.attributes.value.value, entry);
      break;
    case 'second-star':
      colorStars('second-star');
      updateRating(event.target.attributes.value.value, entry);
      break;
    case 'third-star':
      colorStars('third-star');
      updateRating(event.target.attributes.value.value, entry);
      break;
    case 'fourth-star':
      colorStars('fourth-star');
      updateRating(event.target.attributes.value.value, entry);
      break;
    case 'fifth-star':
      colorStars('fifth-star');
      updateRating(event.target.attributes.value.value, entry);
  }
}

function colorStars(starRating) {
  resetStars();
  var $starList = document.querySelectorAll('.star');
  for (var i = 0; i < $starList.length; i++) {
    $starList[i].className = 'fas fa-star fa-2x star checked';
    if (starRating === $starList[i].getAttribute('id')) {
      break;
    }
  }
}

function resetStars() {
  var $starList = document.querySelectorAll('.star');
  for (var i = 0; i < $starList.length; i++) {
    $starList[i].className = 'fas fa-star fa-2x star';
  }
}

function updateRating(ratingValue, entry) {
  var currentEntry = {};
  currentEntry.rating = parseInt(ratingValue);
  currentEntry.title = entry.Title;
  var index = inArray(watchData.ratings, currentEntry);
  if (index === -1) {
    watchData.ratings.push(currentEntry);
  } else {
    watchData.ratings[index].rating = parseInt(ratingValue);
  }
}

function inArray(array, object) {
  for (var i = 0; i < array.length; i++) {
    if (String(array[i].title) === String(object.title)) {
      return i;
    }
  }
  return -1;
}

function inArrayRating(array, object) {
  for (var i = 0; i < array.length; i++) {
    if (String(array[i].Title) === String(object.Title)) {
      return i;
    }
  }
  return -1;
}

function inArrayWatchlist(array, object) {
  for (var i = 0; i < array.length; i++) {
    if (String(array[i].title) === String(object.Title)) {
      return i;
    }
  }
  return -1;
}

function showRating(enrty) {
  var ratingRow = document.createElement('div');
  ratingRow.className = 'column-three-four padding-075 rating';
  var chooseRating = document.createElement('div');
  chooseRating.className = 'choose-rating';
  var ratingHeading = document.createElement('h4');
  ratingHeading.textContent = 'Your rating: ';
  chooseRating.appendChild(ratingHeading);
  var stars = document.createElement('div');
  stars.className = 'stars flex align-center';
  var firstStarIcon = document.createElement('i');
  firstStarIcon.className = 'fas fa-star fa-2x star';
  firstStarIcon.setAttribute('id', 'first-star');
  firstStarIcon.setAttribute('value', 1);
  var secondStarIcon = document.createElement('i');
  secondStarIcon.className = 'fas fa-star fa-2x star';
  secondStarIcon.setAttribute('id', 'second-star');
  secondStarIcon.setAttribute('value', 2);
  var thirdStarIcon = document.createElement('i');
  thirdStarIcon.className = 'fas fa-star fa-2x star';
  thirdStarIcon.setAttribute('id', 'third-star');
  thirdStarIcon.setAttribute('value', 3);
  var fourthStarIcon = document.createElement('i');
  fourthStarIcon.className = 'fas fa-star fa-2x star';
  fourthStarIcon.setAttribute('id', 'fourth-star');
  fourthStarIcon.setAttribute('value', 4);
  var fifthStarIcon = document.createElement('i');
  fifthStarIcon.className = 'fas fa-star fa-2x star';
  fifthStarIcon.setAttribute('id', 'fifth-star');
  fifthStarIcon.setAttribute('value', 5);
  stars.appendChild(firstStarIcon);
  stars.appendChild(secondStarIcon);
  stars.appendChild(thirdStarIcon);
  stars.appendChild(fourthStarIcon);
  stars.appendChild(fifthStarIcon);
  ratingRow.appendChild(chooseRating);
  ratingRow.appendChild(stars);
  return ratingRow;
}

function showWatchlist(array) {
  document.getElementById('mywatchlist-list').innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var index = inArrayWatchlist(watchData.ratings, array[i]);
    if (index !== -1) {
      var x = addRatingToWatchlist(array[i], index);
      document.getElementById('mywatchlist-list').appendChild(x);
    } else {
      document.getElementById('mywatchlist-list').appendChild(movieInfo('watchlist', array[i]));
    }
  }
}

function addToWatchlist(entry) {
  if (watchData.watchListArray.length === 0) {
    watchData.watchListArray.push(entry);
    handleMywatchlistClick();
  } else {
    var len = watchData.watchListArray.length;
    for (var i = 0; i < len; i++) {
      if (String(watchData.watchListArray[i].Title) === String(entry.Title)) {
        handleMywatchlistClick();
        return;
      }
    }
    watchData.watchListArray.push(entry);
    handleMywatchlistClick();
  }
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
    document.querySelector('.header').className = 'header one-padding';
  }
}

function addRatingToWatchlist(entry, index) {
  var temp = movieInfo('watchlist', entry);
  var tempStars = watchlistStars(entry, index);
  temp.firstElementChild.lastElementChild.firstElementChild.appendChild(tempStars);
  return temp;
}
function watchlistStars(entry) {
  var ratingRow = document.createElement('div');
  ratingRow.className = 'column-three-four padding-075 watchlist-rating';
  var chooseRating = document.createElement('div');
  chooseRating.className = 'choose-rating';
  var ratingHeading = document.createElement('h4');
  ratingHeading.textContent = 'Your rating: ';
  chooseRating.appendChild(ratingHeading);
  var stars = document.createElement('div');
  stars.className = 'watchlist-stars flex align-center';
  var firstStarIcon = document.createElement('i');
  firstStarIcon.className = 'fas fa-star fa-2x watchlist-star';
  firstStarIcon.setAttribute('id', 'first-star');
  firstStarIcon.setAttribute('value', 1);
  var secondStarIcon = document.createElement('i');
  secondStarIcon.className = 'fas fa-star fa-2x watchlist-star';
  secondStarIcon.setAttribute('id', 'second-star');
  secondStarIcon.setAttribute('value', 2);
  var thirdStarIcon = document.createElement('i');
  thirdStarIcon.className = 'fas fa-star fa-2x watchlist-star';
  thirdStarIcon.setAttribute('id', 'third-star');
  thirdStarIcon.setAttribute('value', 3);
  var fourthStarIcon = document.createElement('i');
  fourthStarIcon.className = 'fas fa-star fa-2x watchlist-star';
  fourthStarIcon.setAttribute('id', 'fourth-star');
  fourthStarIcon.setAttribute('value', 4);
  var fifthStarIcon = document.createElement('i');
  fifthStarIcon.className = 'fas fa-star fa-2x watchlist-star';
  fifthStarIcon.setAttribute('id', 'fifth-star');
  fifthStarIcon.setAttribute('value', 5);
  stars.appendChild(firstStarIcon);
  stars.appendChild(secondStarIcon);
  stars.appendChild(thirdStarIcon);
  stars.appendChild(fourthStarIcon);
  stars.appendChild(fifthStarIcon);
  ratingRow.appendChild(chooseRating);
  ratingRow.appendChild(stars);
  colorWatchlistStars(stars.children, entry);
  return ratingRow;
}
function colorWatchlistStars(stars, entry) {
  var index = inArrayWatchlist(watchData.ratings, entry);
  for (var i = 0; i < stars.length; i++) {
    if (watchData.ratings[index].rating === i) {
      break;
    }
    stars[i].className = 'fas fa-star fa-2x watchlist-star checked';
  }
}
function handleSortClick(event) {
  showWatchlist(sortWatchlist());
}

function sortWatchlist() {
  var sortedRating = JSON.parse(JSON.stringify(watchData.ratings));
  var newRated = [];
  sortedRating.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  for (var i = 0; i < sortedRating.length; i++) {
    for (var j = 0; j < watchData.watchListArray.length; j++) {
      if (sortedRating[i].title === watchData.watchListArray[j].Title) {
        newRated.push(watchData.watchListArray[j]);
        break;
      }
    }
  }
  for (var k = 0; k < watchData.watchListArray.length; k++) {
    if (inArrayRating(newRated, watchData.watchListArray[k]) === -1) {
      newRated.push(watchData.watchListArray[k]);
    }
  }
  return newRated;
}
document.querySelector('form').addEventListener('submit', handleSubmit);
document.querySelector('.mywatchlist-button').addEventListener('click', handleMywatchlistClick);
document.querySelector('.search-button').addEventListener('click', handleSearchClick);
document.querySelector('.sort-button').addEventListener('click', handleSortClick);
