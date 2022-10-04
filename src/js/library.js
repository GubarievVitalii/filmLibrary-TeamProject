import getRefs from './get-refs';
import MoviesApi from "./moviesApi";
import { Pagination as CustomPagination } from './custom/pagination/pagination'

const refs = getRefs();

const moviesApi = new MoviesApi();

const renderLibrary = { functionRender : "" , itemOnPage : 6} ;

function currentPageLibrary(currentPage, functionRender) {
    const {itemOnPage} = renderLibrary;
    functionRender(currentPage, itemOnPage);
}

const customPagination = new CustomPagination(refs.paginationList,{
    countPoint : 5,
    // totalPages : 0,
    onShow: (currentPage) => {
        window.scrollTo({ top: 240, behavior: 'smooth' });
        const {functionRender} = renderLibrary;
        if (typeof functionRender === 'function') 
          currentPageLibrary(currentPage, functionRender);

    }
    }
  );

export {moviesApi, customPagination, renderLibrary}