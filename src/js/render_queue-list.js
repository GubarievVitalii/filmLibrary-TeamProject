import { createMarkupElementGallery } from './renderMarkup';
import { spinnerOn } from './loader';
import getRefs from './get-refs';
import Notiflix from 'notiflix';
import { customPagination } from './library';



const { galleryList, watchedBtn, queuedBtn, paginationList } = getRefs();

export default function renderQueue(page, countOnePage = 20) {
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

    queueData = JSON.parse(queueList);

    queueData.slice((page-1)*countOnePage, (page)*countOnePage).map(queueItem => {
      genres = queueItem.genreNames;
      delete queueItem.genres;
      queueItem.genre_str = genres;

      queueMarkup += createMarkupElementGallery(queueItem);
    });
    paginationList.classList.remove("is-hidden");
    customPagination.setTotalPages(Math.ceil(queueData.length / countOnePage));
    !queueData.length && paginationList.classList.add("is-hidden");
  } catch (e) {
    Notiflix.Notify.warning('There is no queue list!');
    paginationList.classList.add("is-hidden");
    return;
  }

  //   if (!queueMarkup) {
  //     Notiflix.Notify.warning('There is no queue list!');
  //     return;
  //   }
  galleryList.insertAdjacentHTML('beforeend', queueMarkup);
  spinnerOn();
}
