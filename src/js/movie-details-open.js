import MoviesApi from './moviesApi';
import getRefs from './get-refs';
import renderMovieDetails from './movie-details-render';
import watchTrailer from './movie-play-trailer';
import addToWatchOrQueue from './add-to-watch-queue'; // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")

const moviesApi = new MoviesApi();
const { movieBackdrop, movieModalContent } = getRefs();

export default function openMovieDetails(movieId) {
  movieBackdrop.classList.remove('is-hidden');
  movieBackdrop.insertAdjacentHTML(
    'beforeend',
    `<div class="lds-ring"><div></div><div></div><div></div><div></div>`
  );
  const spinner = document.querySelector('.lds-ring');

  let trailer;
  const playTrailerBtnMarkup = `<button class="button-modal play-trailer" type="button">Watch trailer</button>`;

  moviesApi.fetchMovieByID(movieId).then(movieDetails => {
    // movieModalContent.innerHTML = '';
    spinner.remove();
    renderMovieDetails(movieDetails);
    const closeMovieModalBtn = document.querySelector('.modal-close-btn');
    closeMovieModalBtn.addEventListener('click', onCloseBtnClick);
    function onCloseBtnClick() {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
    }
    addToWatchOrQueue(movieDetails); // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")

    if (movieDetails.resultVideo.length !== 0) {
      trailer = movieDetails.resultVideo.find(
        video => video.type === 'Trailer'
      );
      const movieModalButtons = document.querySelector('.movie-modal-buttons');
      movieModalButtons.insertAdjacentHTML('beforeend', playTrailerBtnMarkup);

      const watchTrailerBtn = document.querySelector('.play-trailer');
      watchTrailerBtn.addEventListener('click', onWatchTrailerClick);
      function onWatchTrailerClick() {
        watchTrailer(trailer.key);
      }
    }
  });

  // ----------------------------------------- CLOSE MODAL ---------------------------------------------

  // function clearMovieModal() {
  //   movieModalContent.innerHTML = '';
  // }

  movieBackdrop.addEventListener('click', onBackdropClick);
  function onBackdropClick(e) {
    if (e.target === movieBackdrop) {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
      // setTimeout(() => clearMovieModal(), 500);
    }
  }

  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    if (event.code === 'Escape') {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
      // setTimeout(() => clearMovieModal(), 500);
      document.removeEventListener('keydown', onEscPress);
    }
  }
}
