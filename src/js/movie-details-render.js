import getRefs from './get-refs';
const { movieModalContent, authorized } = getRefs();
import posterDefault from '../images/movie-defalt-poster.jpg';
const pathImage = 'https://image.tmdb.org/t/p/';

const params = {
  poster_path: '',
  title: 'MOVIE TITLE',
  vote_average: 0,
  vote_count: 0,
  popularity: 0,
  original_title: 'Original Title',
  genres: 'genres',
  overview: 'Movie overview',
};

export default function renderMovieDetails(movieDetails) {
  if (movieDetails.poster_path) {
    params.poster_path = movieDetails.poster_path;
  }
  if (movieDetails.title) {
    params.title = movieDetails.title;
  }
  if (movieDetails.vote_average) {
    params.vote_average = movieDetails.vote_average.toFixed(2);
  }
  if (movieDetails.vote_count) {
    params.vote_count = movieDetails.vote_count;
  }
  if (movieDetails.popularity) {
    params.popularity = movieDetails.popularity;
  }
  if (movieDetails.original_title) {
    params.original_title = movieDetails.original_title;
  }
  if (movieDetails.genres) {
    params.genres = movieDetails.genres.map(genre => genre.name).join(', ');
  }
  if (movieDetails.overview) {
    params.overview = movieDetails.overview;
  }

  const movieDetailsMarkup = `
  <div class="movie-modal">
        <button type="button" class="modal-close-btn">
            &#x26CC
        </button>
        <div class="movie-modal-content">
    <img class="modal-image" src="${
      !params.poster_path
        ? posterDefault
        : `${pathImage}original${params.poster_path}`
    }" />
    <div class="modal-data-box">
        <h2 class="modal-title">${params.title}</h2>
        <table class="modal-table-box">
            <tr class="movie-modal-tr">
              <td class="modal-data">Vote / Votes</td>
              <td class="modal-data-value">
                <span class="modal-rating">${params.vote_average}</span>/
                <span class="modal-rating-two">${params.vote_count}</span>
              </td>
            </tr>
            <tr class="movie-modal-tr">
              <td class="modal-data">Popularity</td>
              <td class="modal-data-value">${params.popularity}</td>
            </tr>
            <tr class="movie-modal-tr">
              <td class="modal-data">Original Title</td>
              <td class="modal-data-value">${params.original_title}</td>
            </tr>
            <tr class="movie-modal-tr">
              <td class="modal-data">Genre</td>
              <td class="modal-data-value">${params.genres}</td>
            </tr>
          </table>
          <h3 class="modal-title-about">ABOUT</h3>
          <p class="modal-description">
            ${params.overview}
          </p>
          <div class="movie-modal-buttons">
            <button class="button-modal auth-required add-watch-js" type="button" id="first-btn">
              Add to watch
            </button>
            <button class="button-modal auth-required  vissualy-hidden remove-watch-js" type="button" id="first-btn">
              Remove from watch
            </button>
            <button class="button-modal auth-required  add-queue-js" type="button">Add to queue</button>
            <button class="button-modal auth-required  vissualy-hidden remove-queue-js" type="button">Remove from queue</button>
            <button class="button-modal play-trailer" type="button">Watch trailer</button>
          </div>
        </div>
        </div>
      </div>
`;
  movieModalContent.insertAdjacentHTML('beforeend', movieDetailsMarkup);

  const addToWatch = document.querySelector('.add-watch-js');
  const addToQueue = document.querySelector('.add-queue-js');

  if (authorized.textContent === 'LOG IN') {
    addToWatch.disabled = true;
    // addToWatch.classList.add('disabled');
    addToWatch.style.pointerEvents = 'none';
    addToWatch.style.color = '#bbbbbb';
    addToWatch.style.borderColor = '#bbbbbb';

    addToQueue.disabled = true;
    // addToWatch.classList.add('disabled');
    addToQueue.style.pointerEvents = 'none';
    addToQueue.style.color = '#bbbbbb';
    addToQueue.style.borderColor = '#bbbbbb';
  }
}
