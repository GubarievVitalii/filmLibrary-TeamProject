import { createMarkupElement } from './renderMarkup';
import { makeSkeletonLoader } from './skeleton-loader';
import getRefs from './get-refs';
import Notiflix from 'notiflix';

const { galleryList, watchedBtn, queuedBtn } = getRefs();

export default function renderQueue() {
  try {
    queuedBtn.classList.add('selected');
    watchedBtn.classList.remove('selected');
  } catch (e) {
    return;
  }

  let queueList;
  let queueMarkup = '';
  try {
    queueList = localStorage.getItem('Queue');
    galleryList.innerHTML = '';
    let genres;

    JSON.parse(queueList).map(queueItem => {
      genres = queueItem.genreNames;
      delete queueItem.genres;
      queueItem.genre_str = genres;

      queueMarkup += createMarkupElement(queueItem);
    });
  } catch (e) {
    Notiflix.Notify.warning('There is no queue list!');
    return;
  }

  //   if (!queueMarkup) {
  //     Notiflix.Notify.warning('There is no queue list!');
  //     return;
  //   }
  galleryList.insertAdjacentHTML('beforeend', queueMarkup);
  makeSkeletonLoader();
}
