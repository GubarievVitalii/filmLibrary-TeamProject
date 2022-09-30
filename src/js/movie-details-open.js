import axios from 'axios';
import renderMovieDetails from './movie-details-render';
import playTrailer from './movie-play-trailer';
import addToWatchOrQueue from './add-to-watch-queue'; // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")

export default async function openMovieDetails(movieId) {
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.remove('is-hidden');
  const modalContent = document.querySelector('.modal-content');

  const movieDetails = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=babda8599831afaa2c30cb95eedbc1fe&language=en`
  );
  renderMovieDetails(movieDetails);
  addToWatchOrQueue(movieDetails); // FT-18, FT-19 (Функціонал для кнопок "Додати до переглянутих", "Додати до черги")
  // console.log(movieDetails.data);
  document.getElementById('first-btn').focus();
  playTrailer(movieId);

  // ----------------------------------------- CLOSE MODAL ---------------------------------------------

  const closeBtn = document.querySelector('.btn-close');
  closeBtn.addEventListener('click', onCloseBtnClick);
  function onCloseBtnClick() {
    // document.getElementById('first-btn').blur();
    backdrop.classList.add('is-hidden');
    modalContent.innerHTML = '';
  }

  backdrop.addEventListener('click', onBackdropClick);
  function onBackdropClick(e) {
    if (e.target === backdrop) {
      // document.getElementById('first-btn').blur();
      backdrop.classList.add('is-hidden');
      modalContent.innerHTML = '';
    }
  }

  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    if (event.code === 'Escape') {
      document.getElementById('first-btn').blur();
      backdrop.classList.add('is-hidden');
      modalContent.innerHTML = '';
      document.removeEventListener('keydown', onEscPress);
    }
  }
}
