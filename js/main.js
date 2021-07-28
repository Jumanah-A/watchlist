function handleClick(event)
{
  if (event.key === 'Enter' || event.target.className === "search-icon fas fa-search")
  {
    var movieName = document.querySelector('.title').value;
    getMovieData(movieName.split(" ").join("+"));
  }
}
document.querySelector('.search-icon').addEventListener('click',handleClick);
document.querySelector('input').addEventListener('keydown',handleClick);

function getMovieData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
  });
  xhr.send();
}
