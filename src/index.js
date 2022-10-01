// import Notiflix from 'notiflix';
// import axios from 'axios';
import getRefs from './js/get-refs';
// import renderMarkupImageInfo from './renderMarkup';
import openMovieDetails from './js/movie-details-open';
import footerModal from './js/footer-modal-open';
import { createMarkupElement } from './js/renderMarkup';
import MoviesApi from './js/moviesApi';
import './js/nightMode';
import './js/top.js';
import './js/filter';

import renderPagination from './js/pagination'


// import userAuth from './js/auth'
import authListnener from './js/auth';
const refs = getRefs();


const moviesApi = new MoviesApi();

document.addEventListener('DOMContentLoaded', () => {
  fetchTrendMovies();
});

// ------------ OPEN MOVIE MODAL --------------------

const movieGallery = document.querySelector('.gallery__list');
movieGallery.addEventListener('click', onMovieCardClick);
function onMovieCardClick(e) {
  if (e.target.classList.contains('gallery__img')) {
    e.preventDefault();
    const movieId = e.target.dataset.movieId;
    openMovieDetails(movieId);
  }
}
// ---------- OPEN MOVIE MODAL END -------------------

footerModal();

async function fetchTrendMovies() {
  try {
    const { results, total_results, page } =
      await moviesApi.fetchTrendWeekMovies();

    results.length &&
      refs.imagesContainer.insertAdjacentHTML(
        'afterbegin',
        results.map(createMarkupElement).join('')
      );

    //  // pagination
    const instance = createPagination();
    instance.setItemsPerPage(20);
    instance.setTotalItems(total_results);
    instance.movePageTo(page);

    instance.on('afterMove', event => {
      const currentPage = event.page;
      window.scrollTo({ top: 240, behavior: 'smooth' });
    });

    results.length &&
      refs.imagesContainer.insertAdjacentHTML(
        'afterbegin',
        results.map(createMarkupElement).join('')
      );

    // Skeleton
    makeSkeletonLoader();
  } catch (error) {
    console.log(error);
  }
}
