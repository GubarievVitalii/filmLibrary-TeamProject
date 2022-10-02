import getRefs from './js/get-refs';
import openMovieDetails from './js/movie-details-open';
import footerModal from './js/footer-modal-open';
import { moviesApi, customPagination } from './js/gallery/';
import './js/nightMode';
import topUp from './js/top.js';
import './js/filter';

import { makeSkeletonLoader } from './js/skeleton-loader';
import onSearch from './js/onSearch';

// import renderPagination from './js/pagination';

import userAuth from './js/auth'


const refs = getRefs();

document.addEventListener('DOMContentLoaded', () => {
  moviesApi.currentFetch = moviesApi.fetchTrendWeekMovies;
  customPagination.moveToPage(moviesApi.currentPage);
});

// ------------ OPEN MOVIE MODAL --------------------

refs.imagesContainer.addEventListener('click', onMovieCardClick);
function onMovieCardClick(e) {
  if (e.target.classList.contains('gallery__img')) {
    e.preventDefault();
    const movieId = e.target.dataset.movieId;
    openMovieDetails(moviesApi.fetchMovieByID(movieId));
  }
}
// ---------- OPEN MOVIE MODAL END -------------------

footerModal();

// async function fetchTrendMovies() {
//   try {
//     const { results, total_results, page } =
//       await moviesApi.fetchTrendWeekMovies();

//     results.length &&
//       refs.imagesContainer.insertAdjacentHTML(
//         'afterbegin',
//         results.map(createMarkupElement).join('')
//       );

//     // pagination
//     // const instance = createPagination();
//     // instance.setItemsPerPage(20);
//     // instance.setTotalItems(total_results);
//     // instance.movePageTo(page);

//     // instance.on('afterMove', event => {
//     //   const currentPage = event.page;
//     //   window.scrollTo({ top: 240, behavior: 'smooth' });
//     // });

//     // results.length &&
//     //   refs.imagesContainer.insertAdjacentHTML(
//     //     'afterbegin',
//     //     results.map(createMarkupElement).join('')
//     //   );

//     // Skeleton
//     makeSkeletonLoader();
//   } catch (error) {
//     console.log(error);
//   }
// }

refs.searchForm.addEventListener('submit', onSearch);
topUp();
