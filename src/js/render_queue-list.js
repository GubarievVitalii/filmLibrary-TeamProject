import { createMarkupElement } from './renderMarkup';
import { makeSkeletonLoader } from './skeleton-loader';
import getRefs from './get-refs';

const { galleryList, queuedBtn } = getRefs();

export default function renderQueue() {
  queuedBtn.focus();
  if (
    localStorage.getItem('Queue') &&
    JSON.parse(localStorage['Queue']).length > 0
  ) {
    galleryList.innerHTML = '';
    let genres;
    let watchedMarkup = '';

    JSON.parse(localStorage['Queue']).map(watchedItem => {
      genres = watchedItem.genreNames;
      delete watchedItem.genres;
      watchedItem.genre_str = genres;

      watchedMarkup += createMarkupElement(watchedItem);
    });

    galleryList.insertAdjacentHTML('beforeend', watchedMarkup);
    makeSkeletonLoader();
  }
}
