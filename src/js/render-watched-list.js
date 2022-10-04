import { createMarkupElementGallery } from './renderMarkup';
import { spinnerOn } from './loader';
import getRefs from './get-refs';
import Notiflix from 'notiflix';
import { customPagination } from './library'

const { galleryList, watchedBtn, queuedBtn, paginationList } = getRefs();

export default function renderWatched(page, countOnePage = 20) {
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

    watchedData = JSON.parse(watchedList);
    
    watchedData.slice((page-1) * countOnePage, (page)*countOnePage).map(watchedItem => {
      genres = watchedItem.genreNames;
      delete watchedItem.genres;
      watchedItem.genre_str = genres;

      watchedMarkup += createMarkupElementGallery(watchedItem);
    });
    paginationList.classList.remove("is-hidden");
    customPagination.setTotalPages(Math.ceil(watchedData.length / countOnePage));
    !watchedData.length && paginationList.classList.add("is-hidden");
  } catch (e) {
    Notiflix.Notify.warning('There is no watched list!');
    paginationList.classList.add("is-hidden");
    spinnerOn();
    return;
  }

  galleryList.insertAdjacentHTML('beforeend', watchedMarkup);
  spinnerOn();
}