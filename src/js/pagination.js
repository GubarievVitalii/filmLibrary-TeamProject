import MoviesApi from './moviesApi';
import getRefs from './get-refs';
import { createMarkupElement } from './renderMarkup';
import { showMovies } from './filter';
import { makeSkeletonLoader } from './skeleton-loader';

const refs = getRefs();
const moviesApi = new MoviesApi();


document.addEventListener('DOMContentLoaded', () => {
  fetchTrendMovies(1);
});

let currentPage = 1;

export async function fetchTrendMovies() {
  try {
    const { results, page, total_pages } = await moviesApi.fetchTrendWeekMovies();
    refs.imagesContainer.innerHTML = '';

    results.length &&
      refs.imagesContainer.insertAdjacentHTML(
        'afterbegin',
        results.map(createMarkupElement).join('')
      );
      renderPagination(page, total_pages);
   
  } catch (error) {
    console.log(error);
  }
}

export function renderPagination(page, totalPage) {
  currentPage = page;
  let paginationMarkup = '';
  let beforeTwoPage = page - 2;
  let beforePage = page - 1;
  let afterTwoPage = page + 2;
  let afterPage = page + 1;

  if (page > 1) {
    paginationMarkup += `<li class="pagination__arrow pagination__arrow--left materials-icons">&larr;</li>`;
  }
  if (page > 2) {
    paginationMarkup += `<li class="pagination__number display-none">1</li>`;
  }
  if (page > 4) {
    paginationMarkup += `<li class="pagination__number display-none">...</li>`;
  }

  if (page > 3) {
    paginationMarkup += `<li class="pagination__number">${beforeTwoPage}</li>`;
  }

  if (page >= 2) {
    paginationMarkup += `<li class="pagination__number">${beforePage}</li>`;
  }

  paginationMarkup += `<li class="pagination__number active">${page}</li>`;
  if (page < totalPage - 1) {
    paginationMarkup += `<li class="pagination__number">${afterPage}</li>`;
  }
  if (page < totalPage - 2) {
    paginationMarkup += `<li class="pagination__number">${afterTwoPage}</li>`;
  }
  if (page <= totalPage - 1) {
    if (page < totalPage - 3) {
      paginationMarkup += `<li class="pagination__number display-none">...</li>`;
    }
    paginationMarkup += `<li class="pagination__number display-none">${totalPage}</li>`;
  }

  if (page < totalPage) {
    paginationMarkup += `<li class='pagination__arrow pagination__arrow--right materials-icons'>&rarr;</li>`;
  }
  refs.paginationList.innerHTML = paginationMarkup;

  refs.paginationList.addEventListener('click', onPagination);
}


export function onPagination(e) {
  if (e.target.nodeName !== `LI`) {
    return;
  }
  const target = e.target.textContent;
  
  window.scrollTo({ top: 240, behavior: 'smooth' });
  switch (target) {
    case '←':
      moviesApi.previousPage()
      break;
    case '→':
      moviesApi.nextPage()
      break;

    case '...':
      break;

    default:
      moviesApi.eventPage(target) 
  }
fetchTrendMovies()
}

export function renderPaginationbyGenre(page, totalPage) {
  currentPage = page;
  let paginationMarkup = '';
  let beforeTwoPage = page - 2;
  let beforePage = page - 1;
  let afterTwoPage = page + 2;
  let afterPage = page + 1;

  if (page > 1) {
    paginationMarkup += `<li class="pagination__arrow pagination__arrow--left materials-icons">&larr;</li>`;
  }
  if (page > 2) {
    paginationMarkup += `<li class="pagination__number display-none">1</li>`;
  }
  if (page > 4) {
    paginationMarkup += `<li class="pagination__number display-none">...</li>`;
  }

  if (page > 3) {
    paginationMarkup += `<li class="pagination__number">${beforeTwoPage}</li>`;
  }

  if (page >= 2) {
    paginationMarkup += `<li class="pagination__number">${beforePage}</li>`;
  }

  paginationMarkup += `<li class="pagination__number active">${page}</li>`;
  if (page < totalPage - 1) {
    paginationMarkup += `<li class="pagination__number">${afterPage}</li>`;
  }
  if (page < totalPage - 2) {
    paginationMarkup += `<li class="pagination__number">${afterTwoPage}</li>`;
  }
  if (page <= totalPage - 1) {
    if (page < totalPage - 3) {
      paginationMarkup += `<li class="pagination__number display-none">...</li>`;
    }
    paginationMarkup += `<li class="pagination__number display-none">${totalPage}</li>`;
  }

  if (page < totalPage) {
    paginationMarkup += `<li class='pagination__arrow pagination__arrow--right materials-icons'>&rarr;</li>`;
  }
  refs.paginationList.innerHTML = paginationMarkup;

  refs.paginationList.addEventListener('click', onPaginationbyGenre);
}

export function onPaginationbyGenre(e) {
  if (e.target.nodeName !== `LI`) {
    return;
  }
  const target = e.target.textContent;

  window.scrollTo({ top: 240, behavior: 'smooth' });
  switch (target) {
    case '←':
      moviesApi.previousPage();
      break;
    case '→':
      moviesApi.nextPage();
      break;

    case '...':
      break;

    default:
      moviesApi.eventPage(target);
  }
  showMovies();
}
