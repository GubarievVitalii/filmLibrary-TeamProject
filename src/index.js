import getRefs from './js/get-refs';
import openMovieDetails from './js/movie-details-open';
import footerModal from './js/footer-modal-open';
import { moviesApi, customPagination } from './js/gallery';
import './js/nightMode';
import topUp from './js/top.js';
import './js/filter';
import './js/onSearch';

import userAuth from './js/auth';

const refs = getRefs();

document.addEventListener('DOMContentLoaded', () => {
  moviesApi.currentFetch = moviesApi.fetchTrendWeekMovies;
  customPagination.moveToPage(moviesApi.currentPage);
});

// ------------ OPEN MOVIE MODAL --------------------

refs.imagesContainer.addEventListener('click', onMovieCardClick);
async function onMovieCardClick(e) {
  if (e.target.classList.contains('gallery__img')) {
    e.preventDefault();
    const movieId = e.target.dataset.movieId;
    await openMovieDetails(moviesApi.fetchMovieByID(movieId));
    
  }
}
// ---------- OPEN MOVIE MODAL END -------------------

footerModal();

topUp();
