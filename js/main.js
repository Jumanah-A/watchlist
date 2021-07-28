function handleSubmit(event)
{
  event.preventDefault();
  var movieName = document.querySelector('.title').value;
  getMovieData(movieName.split(" ").join("+"));
}
document.querySelector('form').addEventListener('submit',handleSubmit);

function getMovieData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?apikey=d0b53caa&t=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
  });
  xhr.send();
}
