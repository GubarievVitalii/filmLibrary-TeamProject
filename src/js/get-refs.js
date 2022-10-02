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
    filterWrap: document.querySelector('.filter__wrap'),
    filterSelectBtn: document.querySelector('.filter__select-btn'),

    movieBackdrop: document.querySelector('.movie-modal-backdrop'),
    movieModalContent: document.querySelector('.movie-modal-content'),

    playerContainer: document.querySelector('.player'),
    playerBackdrop: document.querySelector('.player-backdrop'),
    playerCloseBtn: document.querySelector('.btn-player-close'),

    galleryList: document.querySelector('.gallery__list--library'),
    watchedBtn: document.querySelector('.watched-btn'),
    queuedBtn: document.querySelector('.queue-btn'),

    //  footer-modal
    footerModalOpen: document.querySelector('.footer-modal-open'),
    footerModalClose: document.querySelector('.close'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),

    // top.js
    scrollUp: document.querySelector('.top'),
    scrollUpSvgPath: document.querySelector('.top__svg--path'),
  };
}
