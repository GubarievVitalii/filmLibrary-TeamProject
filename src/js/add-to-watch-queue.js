import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './get-refs';

export default function addToWatchOrQueue(movieDetails) {
  const { data } = movieDetails;
  const { id, title, poster_path, genres, release_date, vote_average } = data;
  const { addWatchBtn, removeWatchBtn, addQueueBtn, removeQueueBtn } =
    getRefs();

  let watched = localStorage.getItem('Watched');
  let queue = localStorage.getItem('Queue');

  const filmInfo = {
    id,
    title,
    poster_path,
    genres,
    release_date,
    vote_average,
  };
  // Перевірка наявності в LocalStorage ключа Watched,
  // якщо є -> перевіряємо наявність фільму в масиві
  // об'єктів і в залежності від результату відображаємо потрібну кнопку
  // якщо немає -> створюємо ключ з значенням [];
  if (watched !== null) {
    watched = JSON.parse(watched);
    const isFilmWatched = watched.find(film => film.id === id);
    if (isFilmWatched !== undefined) {
      addWatchBtn.classList.add('vissualy-hidden');
      removeWatchBtn.classList.remove('vissualy-hidden');
    }
  } else {
    localStorage.setItem('Watched', JSON.stringify([]));
    watched = JSON.parse(localStorage.getItem('Watched'));
  }
  // Теж саме що і в попередньому випадку, але для ключа Queue і відповідно його кнопок
  if (queue !== null) {
    queue = JSON.parse(queue);
    const isFilmQueue = queue.find(film => film.id === id);
    if (isFilmQueue !== undefined) {
      addQueueBtn.classList.add('vissualy-hidden');
      removeQueueBtn.classList.remove('vissualy-hidden');
    }
  } else {
    localStorage.setItem('Queue', JSON.stringify([]));
    queue = JSON.parse(localStorage.getItem('Queue'));
  }
  // Додавання поточного фільму до LocalStorage
  // та перевірка його наявності в значенні ключа Queue
  // якщо цей фільм є в Queue, він звідти видаляється
  function addFilmToWatched() {
    watched.push(filmInfo);
    localStorage.setItem('Watched', JSON.stringify(watched));

    const isFilmQueue = queue.find(film => film.id === id);
    if (isFilmQueue !== undefined) {
      removeFilmFromQueue();
    }

    addWatchBtn.classList.add('vissualy-hidden');
    removeWatchBtn.classList.remove('vissualy-hidden');

    Notify.success(`The movie "${title}" has been added to watched`);
  }
  // Додавання поточного фільму до LocalStorage
  // та перевірка його наявності в значенні ключа Watched
  // якщо цей фільм є в Watched, він звідти видаляється
  function addFilmToQueue() {
    queue.push(filmInfo);
    localStorage.setItem('Queue', JSON.stringify(queue));

    const isFilmWatched = watched.find(film => film.id === id);
    if (isFilmWatched !== undefined) {
      removeFilmFromWatched();
    }

    addQueueBtn.classList.add('vissualy-hidden');
    removeQueueBtn.classList.remove('vissualy-hidden');

    Notify.success(`The movie "${title}" has been added to the queue`);
  }
  // Видалення об'єкта фільму ключа Watched з LocalStorage за індексом
  function removeFilmFromWatched() {
    const index = watched.indexOf(watched.find(film => film.id === id));

    watched.splice(index, 1);
    localStorage.setItem('Watched', JSON.stringify(watched));

    addWatchBtn.classList.remove('vissualy-hidden');
    removeWatchBtn.classList.add('vissualy-hidden');

    Notify.info(`The film "${title}" has been removed from watched`);
  }
  // Видалення об'єкта фільму ключа Queue з LocalStorage за індексом
  function removeFilmFromQueue() {
    const index = queue.indexOf(queue.find(film => film.id === id));

    queue.splice(index, 1);
    localStorage.setItem('Queue', JSON.stringify(queue));

    addQueueBtn.classList.remove('vissualy-hidden');
    removeQueueBtn.classList.add('vissualy-hidden');

    Notify.info(`The film "${title}" been removed from the queue`);
  }

  addWatchBtn.addEventListener('click', addFilmToWatched);
  addQueueBtn.addEventListener('click', addFilmToQueue);

  removeWatchBtn.addEventListener('click', removeFilmFromWatched);
  removeQueueBtn.addEventListener('click', removeFilmFromQueue);
}
