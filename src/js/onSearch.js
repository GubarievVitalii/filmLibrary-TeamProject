import getRefs from './get-refs';
import { moviesApi, customPagination } from './gallery';
import { clearFilter } from './filter';

const refs = getRefs();

function onSearch(e) {
  e.preventDefault();
  clearFilter();

  if (refs.searchInput.value) {
    moviesApi.query = refs.searchInput.value;
    moviesApi.currentFetch = moviesApi.fetchMovieQuery;
    customPagination.moveToPage(1); 
  }
}

refs.searchForm.addEventListener('submit', onSearch);

