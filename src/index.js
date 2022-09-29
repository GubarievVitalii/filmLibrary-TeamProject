// import Notiflix from 'notiflix';
// import axios from 'axios';
import getRefs from './js/get-refs';
// import renderMarkupImageInfo from './renderMarkup';
import createPagination from './js/pagination';
import openMovieDetails from './js/movie-details-open';
import footerModal from './js/footer-modal-open';

import { createMarkupElement } from './js/renderMarkup';
import MoviesApi from './js/moviesApi';
import './js/nightMode';
import './js/top.js';
import {makeSkeletonLoader} from './js/skeleton-loader'


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
footerModal();

async function fetchTrendMovies() {
  try {
    const { results, total_results, page} = await moviesApi.fetchTrendWeekMovies();


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

    results.length && refs.imagesContainer.insertAdjacentHTML("afterbegin", results.map(createMarkupElement).join(""))
    
    // Skeleton
        makeSkeletonLoader();
  } catch (error) {
    console.log(error);
  }
}
