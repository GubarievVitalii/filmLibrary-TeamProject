// import Notiflix from 'notiflix';
// import axios from 'axios';
import getRefs from './get-refs';
// import renderMarkupImageInfo from './renderMarkup';
import createPagination from './js/pagination';
import openMovieDetails from './js/movie-details-open';

import { createMarkupElement } from './js/renderMarkup';
import MoviesApi from './js/moviesApi';

const refs = getRefs();

const moviesApi = new MoviesApi();

document.addEventListener('DOMContentLoaded', () => {
  fetchTrendMovies();
});

const movieGallery = document.querySelector('.galary-list');
movieGallery.addEventListener('click', onMovieCardClick);

function onMovieCardClick(e) {
  if (e.target.classList.contains('galary-list-item-img')) {
    e.preventDefault();
    const movieId = e.target.dataset.movieId;
    openMovieDetails(movieId);
  }
}

async function fetchTrendMovies() {
  try {
    const { results } = await moviesApi.fetchTrendWeekMovies();

    results.length &&
      refs.imagesContainer.insertAdjacentHTML(
        'afterbegin',
        results.map(createMarkupElement).join('')
      );
  } catch (error) {
    console.log(error);
  }
}
