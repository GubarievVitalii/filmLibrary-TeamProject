import getRefs from './get-refs';
import { moviesApi, customPagination } from './gallery';
import { clearFilterOnSearch } from './filter';

const refs = getRefs();

export default function onSearch(e) {
  e.preventDefault();
  clearFilterOnSearch();

  moviesApi.query = refs.searchInput.value;
  moviesApi.currentFetch = moviesApi.fetchMovieQuery;
  customPagination.moveToPage(moviesApi.currentPage);
}
