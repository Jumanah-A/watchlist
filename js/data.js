/* exported watchData */

let watchData = {
  watchListArray: [],
  ratings: [],
  currentMovie: null
};

const previousEntryJSON = localStorage.getItem('javascript-local-storage-watchlist');
if (previousEntryJSON !== null) {
  watchData = JSON.parse(previousEntryJSON);
}
window.addEventListener('beforeunload', handleBeforeUnload);
function handleBeforeUnload(event) {
  localStorage.setItem('javascript-local-storage-watchlist', JSON.stringify(watchData));
}
