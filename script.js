const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const TV_API = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query="`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Load movies and TV shows
getMovies(API_URL);
getMovies(TV_API);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  // Filter out unwanted movie "Together"
  const filteredResults = data.results.filter(item => item.title !== "Together");

  showMovies(filteredResults);
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const title = movie.title || movie.name; // Movie or TV show
    const poster_path = movie.poster_path;
    const vote_average = movie.vote_average || "N/A";
    const overview = movie.overview;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/220x330'}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview || "No overview available."}</p>
      </div>
    `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
