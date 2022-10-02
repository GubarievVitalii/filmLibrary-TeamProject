import MoviesApi from './moviesApi';
import getRefs from './get-refs';
import renderMovieDetails from './movie-details-render';
import watchTrailer from './movie-play-trailer';
import addToWatchOrQueue from './add-to-watch-queue'; // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")
import Notiflix from 'notiflix';

const moviesApi = new MoviesApi();
const { movieBackdrop, movieModalContent } = getRefs();
const TRAILER = 'Trailer';

export default function openMovieDetails(movieId) {
  movieBackdrop.classList.remove('is-hidden');
  movieBackdrop.insertAdjacentHTML(
    'beforeend',
    `<div class="lds-ring"><div></div><div></div><div></div><div></div>`
  );
  const spinner = document.querySelector('.lds-ring');

  moviesApi
    .fetchMovieByID(movieId)
    .then(movieDetails => {
      spinner.remove();
      renderMovieDetails(movieDetails);

      const closeMovieModalBtn = document.querySelector('.modal-close-btn');
      closeMovieModalBtn.addEventListener('click', onCloseBtnClick);
      function onCloseBtnClick() {
        movieBackdrop.classList.add('is-hidden');
        movieModalContent.innerHTML = '';
        closeMovieModalBtn.removeEventListener('click', onCloseBtnClick);
        watchTrailerBtn.removeEventListener('click', onWatchTrailerClick);
      }

      addToWatchOrQueue(movieDetails); // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")

      const watchTrailerBtn = document.querySelector('.play-trailer');
      // movieDetails = undefined;
      let movieTrailer;
      try {
        movieTrailer = movieDetails.resultVideo.find(
          video => video.type === TRAILER
        );
        // movieTrailer = undefined;
        if (!movieTrailer) {
          throw new Error();
        }
        watchTrailerBtn.addEventListener('click', onWatchTrailerClick);
        function onWatchTrailerClick() {
          watchTrailer(movieTrailer.key);
        }
      } catch (e) {
        watchTrailerBtn.addEventListener('click', onWatchTrailerClick);
        function onWatchTrailerClick() {
          Notiflix.Notify.warning("Sorry, we didn't find trailer", {
            position: 'center-center',
          });
        }
      }
    })
    .catch(e => {
      Notiflix.Notify.warning('Ups! Something went wrong.', {
        position: 'center-center',
      });
      // console.log(e);
      // console.log(e.name);
      // console.log(e.message);
    });

  // ----------------------------------------- CLOSE MODAL ---------------------------------------------

  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    if (event.code === 'Escape') {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
      document.removeEventListener('keydown', onEscPress);
      movieBackdrop.removeEventListener('click', onBackdropClick);
    }
  }
  movieBackdrop.addEventListener('click', onBackdropClick);
  function onBackdropClick(e) {
    if (e.target === movieBackdrop) {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
      movieBackdrop.removeEventListener('click', onBackdropClick);
      document.removeEventListener('keydown', onEscPress);
    }
  }
}
