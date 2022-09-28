// import Notiflix from 'notiflix';
// import axios from 'axios';
// import getRefs from './get-refs';
// import renderMarkupImageInfo from './renderMarkup';
import openMovieDetails from './js/movie-details-open';

// const refs = getRefs();

const movieGallery = document.querySelector('.galary-list');
movieGallery.addEventListener('click', onMovieCardClick);
function onMovieCardClick(e) {
  if (e.target.classList.contains('galary-list-item-img')) {
    const movieId = e.target.dataset.movieId;
    openMovieDetails(movieId);
  }
}
