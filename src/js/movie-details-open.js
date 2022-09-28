import axios from 'axios';
import renderMovieDetails from './movie-details-render';

export default async function openMovieDetails(movieId) {
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.remove('is-hidden');
  const modalContent = document.querySelector('.modal-content');

  const movieDetails = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=babda8599831afaa2c30cb95eedbc1fe&language=uk`
  );
  renderMovieDetails(movieDetails);

  // ----------------------------------------- CLOSE MODAL ---------------------------------------------

  const closeBtn = document.querySelector('.btn-close');
  closeBtn.addEventListener('click', onCloseBtnClick);
  function onCloseBtnClick() {
    backdrop.classList.add('is-hidden');
    modalContent.innerHTML = '';
  }

  backdrop.addEventListener('click', onBackdropClick);
  function onBackdropClick() {
    backdrop.classList.add('is-hidden');
    modalContent.innerHTML = '';
  }

  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    if (event.code === 'Escape') {
      backdrop.classList.add('is-hidden');
      modalContent.innerHTML = '';
      document.removeEventListener('keydown', onEscPress);
    }
  }
}
