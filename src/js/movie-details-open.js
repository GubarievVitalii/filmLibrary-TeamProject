import axios from 'axios';
import renderMovieDetails from './movie-details-render';
import playTrailer from './movie-play-trailer';
import addToWatchOrQueue from './add-to-watch-queue'; // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")

export default function openMovieDetails(movieId) {
  const movieBackdrop = document.querySelector('.movie-modal-backdrop');
  console.log(movieBackdrop);
  const movieModalContent = document.querySelector('.movie-modal-content');
  movieBackdrop.classList.remove('is-hidden');

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=babda8599831afaa2c30cb95eedbc1fe&language=en`
    )
    .then(movieDetails => {
      renderMovieDetails(movieDetails);
      addToWatchOrQueue(movieDetails); // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")
    });

  let trailer = '';
  const playTrailerBtnMarkup = `<button class="button-modal play-trailer" type="button">
                                Watch trailer
                            </button>`;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=babda8599831afaa2c30cb95eedbc1fe`
    )
    .then(response => {
      if (response.data.results.length !== 0) {
        trailer = response.data.results[0].key;
        const btnContainer = document.querySelector('.md-modal-buttons');
        btnContainer.insertAdjacentHTML('beforeend', playTrailerBtnMarkup);

        const playTrailerBtn = document.querySelector('.play-trailer');
        playTrailerBtn.addEventListener('click', onWatchTrailerClick);
        function onWatchTrailerClick() {
          playTrailer(trailer);
        }
      }
    });

  // ----------------------------------------- CLOSE MODAL ---------------------------------------------

  const closeBtn = document.querySelector('.btn-close');
  closeBtn.addEventListener('click', onCloseBtnClick);
  function onCloseBtnClick() {
    movieBackdrop.classList.add('is-hidden');
    movieModalContent.innerHTML = '';
  }

  movieBackdrop.addEventListener('click', onBackdropClick);
  function onBackdropClick(e) {
    if (e.target === movieBackdrop) {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
    }
  }

  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    if (event.code === 'Escape') {
      movieBackdrop.classList.add('is-hidden');
      movieModalContent.innerHTML = '';
      document.removeEventListener('keydown', onEscPress);
    }
  }
}
