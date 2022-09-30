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
import renderPagination from './js/pagination'




const refs = getRefs();

const movieGallery = document.querySelector('.galary-list');
movieGallery.addEventListener('click', onMovieCardClick);

function onMovieCardClick(e) {
  if (e.target.classList.contains('galary-list-item-img')) {
    e.preventDefault();
    const movieId = e.target.dataset.movieId;
    openMovieDetails(movieId);
  }
}
footerModal();


