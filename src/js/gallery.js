import getRefs from "./get-refs";
import { spinnerOn } from './loader';
import MoviesApi from "./moviesApi";

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import { Pagination as CustomPagination } from './custom/pagination/pagination'

import { createMarkupElementGallery } from "./renderMarkup";

const refs = getRefs();

function renderMovies({ results, total_results, total_pages, page }){

  refs.imagesContainer.innerHTML = "";  

  if (results.length === 0) {
    Notiflix.Notify.warning(
      '❌ Sorry, there are no movies matching your search query. Please try again.',
      {
        timeout: 3000,
      }
    );
    refs.paginationList.classList.add("is-hidden");
    return
  }

  if (results.length > 0 && page === 1) {
    Notiflix.Notify.success (
      ` We found ${total_results} movies.`, {
        timeout: 3000,}
    )
  }
  
  results.length && refs.imagesContainer.insertAdjacentHTML(
      'afterbegin',
      results.map(createMarkupElementGallery).join(''));
  
  refs.paginationList.classList.remove("is-hidden");
  customPagination.setTotalPages(total_pages);
  
  // Skeleton
  spinnerOn();
}

const moviesApi = new MoviesApi(renderMovies);

const customPagination = new CustomPagination(refs.paginationList,{
    countPoint : 5,
    onShow: (currentPage) => {
      moviesApi.currentPage = currentPage;
      window.scrollTo({ top: 240, behavior: 'smooth' });
      moviesApi.currentFetch();
    }
    }
  );

export {moviesApi, customPagination}