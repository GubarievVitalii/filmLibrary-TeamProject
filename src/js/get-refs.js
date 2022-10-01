export default function getRefs() {
    return {
      searchForm: document.querySelector('#search-form'),
      searchInput: document.querySelector('.search-input'),
      searchBtn: document.querySelector('.search-button'),
      imagesContainer: document.querySelector('.gallery__list'),
      paginationList: document.querySelector('.pagination'),

      checkBoxEl: document.querySelector('[name="ligthswitcher"]'),
      bodyEl: document.querySelector('body'),

      addWatchBtn: document.querySelector('.add-watch-js'),
      removeWatchBtn: document.querySelector('.remove-watch-js'),
      addQueueBtn: document.querySelector('.add-queue-js'),
      removeQueueBtn: document.querySelector('.remove-queue-js'),

    filterClear: document.querySelector('.filter__clear'),
    filterGenreList: document.querySelector('.filter__genre-list'),
    filterContainer: document.querySelector('.filter__container'),
    filterSelectBtn: document.querySelector('.filter__select-btn'),
  };
}


