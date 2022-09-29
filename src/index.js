
// import Notiflix from 'notiflix';
// import axios from 'axios';
import getRefs from './get-refs';
// import renderMarkupImageInfo from './renderMarkup';
import createPagination from './js/pagination';
import openMovieDetails from './js/movie-details-open';

import { createMarkupElement } from './js/renderMarkup';
import MoviesApi from './js/moviesApi';
import './js/top.js';
import {makeSkeletonLoader} from './js/skeleton-loader'

// // кнопка top
// export const scroll = new OnlyScroll(document.scrollingElement, {
//   damping: 0.8,
// });

const refs = getRefs();

const moviesApi = new MoviesApi();

document.addEventListener('DOMContentLoaded', () => {
  fetchTrendMovies();
});

const movieGallery = document.querySelector('.galary-list');
movieGallery.addEventListener('click', onMovieCardClick);

function onMovieCardClick(e) {
  if (e.target.classList.contains('galary-list-item-img')) {
    const movieId = e.target.dataset.movieId;
    openMovieDetails(movieId);
  }
}

async function fetchTrendMovies () {
  try {
    const { results } = await moviesApi.fetchTrendWeekMovies();
    //  // pagination
        // const totalResult = results.total_results;
        // let currentPage = results.page;
        
        const instance = createPagination();
        instance.setItemsPerPage(20);
        // instance.setTotalItems(totalResult);
        // instance.movePageTo(currentPage);

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
