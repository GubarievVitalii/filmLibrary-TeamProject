import topUp from './js/top.js';
import './js/nightMode';
import getRefs from './js/get-refs.js';
import renderWatched from './js/render-watched-list.js';
import renderQueue from './js/render_queue-list.js';
import openMovieDetails from './js/movie-details-open.js';
import footerModal from './js/footer-modal-open';
import './js/auth'
topUp();

const { watchedBtn, queuedBtn, galleryList } = getRefs();

renderWatched();

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

footerModal();
