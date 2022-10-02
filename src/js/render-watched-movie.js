import { createMarkupElement } from './renderMarkup';
import { makeSkeletonLoader } from './skeleton-loader';
import getRefs from './get-refs';

const { galleryList, watchedBtn } = getRefs();

export default function renderGallery() {
  watchedBtn.focus();
  if (
    localStorage.getItem('Watched') &&
    JSON.parse(localStorage['Watched']).length > 0
  ) {
    galleryList.innerHTML = '';
    let genres;
    let watchedMarkup = '';

    JSON.parse(localStorage['Watched']).map(watchedItem => {
      genres = watchedItem.genreNames;
      delete watchedItem.genres;
      watchedItem.genre_str = genres;

      watchedMarkup += createMarkupElement(watchedItem);
    });

    galleryList.insertAdjacentHTML('beforeend', watchedMarkup);
    makeSkeletonLoader();
  }
}
