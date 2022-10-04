import getRefs from './get-refs';
import MoviesApi from "./moviesApi";
import { Pagination as CustomPagination } from './custom/pagination/pagination'

refs = getRefs();

const moviesApi = new MoviesApi();

function currentPageLibrary(currentPage, renderLibrary) {
    const itemOnPage = 6;
    renderLibrary(currentPage, itemOnPage);
}

const customPagination = new CustomPagination(refs.paginationList,{
    countPoint : 5,
    // totalPages : 0,
    onShow: (currentPage) => {
        window.scrollTo({ top: 240, behavior: 'smooth' });
        if (typeof renderLibrary === 'function') 
          currentPageLibrary(currentPage,renderLibrary);

    }
    }
  );

export {moviesApi, customPagination, renderLibrary}