import { createMarkupElement } from './renderMarkup';
import { makeSkeletonLoader } from './skeleton-loader';
import getRefs from './get-refs';
import Notiflix from 'notiflix';

const { galleryList, watchedBtn, queuedBtn } = getRefs();

export default function renderGallery() {
  try {
    watchedBtn.classList.add('selected');
    queuedBtn.classList.remove('selected');
  } catch (e) {
    return;
  }

  let watchedList;
  let watchedMarkup = '';
  try {
    watchedList = localStorage.getItem('Watched');
    galleryList.innerHTML = '';
    let genres;

    JSON.parse(watchedList).map(watchedItem => {
      genres = watchedItem.genreNames;
      delete watchedItem.genres;
      watchedItem.genre_str = genres;

      watchedMarkup += createMarkupElement(watchedItem);
    });
  } catch (e) {
    Notiflix.Notify.warning('There is no watched list!');
    return;
  }

  // if (!watchedMarkup) {
  //   Notiflix.Notify.warning('There is no watched list!');
  //   return;
  // }
  galleryList.insertAdjacentHTML('beforeend', watchedMarkup);
  makeSkeletonLoader();
}
