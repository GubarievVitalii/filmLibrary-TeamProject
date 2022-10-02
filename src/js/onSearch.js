
import getRefs from './get-refs';
import {moviesApi, customPagination} from './gallery';

const refs = getRefs();

export default function  onSearch (e) {
    e.preventDefault();
   
    moviesApi.query = refs.searchInput.value;
    moviesApi.currentFetch = moviesApi.fetchMovieQuery;  
    customPagination.moveToPage(moviesApi.currentPage);
 }


