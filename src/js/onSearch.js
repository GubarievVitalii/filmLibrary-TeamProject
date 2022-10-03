import getRefs from './get-refs';
import { moviesApi, customPagination } from './gallery';
import { clearFilter } from './filter';

const refs = getRefs();

export default function onSearch(e) {
  e.preventDefault();
  clearFilter();

  moviesApi.query = refs.searchInput.value;
  moviesApi.currentFetch = moviesApi.fetchMovieQuery;
  customPagination.moveToPage(moviesApi.currentPage);
}
