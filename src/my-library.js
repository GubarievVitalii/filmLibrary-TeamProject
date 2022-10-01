import './js/top.js';
import './js/nightMode';
import getRefs from './js/get-refs.js';
import renderWatched from './js/render-watched-movie.js';
import renderQueue from './js/render_queue-list.js';
import openMovieDetails from './js/movie-details-open.js';

const { watchedBtn, queuedBtn, galleryList } = getRefs();

renderWatched();
watchedBtn.focus();

watchedBtn.addEventListener('click', onWatchedClick);
function onWatchedClick() {
  renderWatched();
}

queuedBtn.addEventListener('click', onQueueClick);
function onQueueClick() {
  renderQueue();
}

galleryList.addEventListener('click', onMovieCardClick);
function onMovieCardClick(e) {
  if (e.target.classList.contains('gallery__img')) {
    e.preventDefault();
    const movieId = e.target.dataset.movieId;
    openMovieDetails(movieId);
  }
}
