
import axios from 'axios';
import getRefs from './get-refs';
import { createMarkupElement } from './renderMarkup.js';
import { makeSkeletonLoader } from './skeleton-loader.js';
import MoviesApi from './moviesApi.js';
// import createPagination from './pagination.js';


const refs = getRefs();

const moviesApi = new MoviesApi();

export default  async function  onSearch (e) {
    e.preventDefault();
    await  fetchQMovies(refs.searchInput.value)
 
}


async function fetchQMovies(q) {
  try {
    moviesApi.query = q;
    const { results, total_results, page } =
      await moviesApi.fetchMovieQuery();

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


