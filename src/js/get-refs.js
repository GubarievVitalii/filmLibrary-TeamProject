export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('.search-input'),
    searchBtn: document.querySelector('.search-button'),
    imagesContainer: document.querySelector('.galary-list'),
    addWatchBtn: document.querySelector('.add-watch-js'), // FT-18, FT-19 Start || file -> add-to-watch-queue.js
    removeWatchBtn: document.querySelector('.remove-watch-js'),
    addQueueBtn: document.querySelector('.add-queue-js'),
    removeQueueBtn: document.querySelector('.remove-queue-js'), // FT-18, FT-19 End
  };
}
