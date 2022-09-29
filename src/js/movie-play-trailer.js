import axios from 'axios';

export default function playTrailer(movieId) {
  let trailer = '';

  const playTrailerBtnMarkup = `<button class="button-modal play-trailer" type="button">
                                Watch trailer
                            </button>`;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=babda8599831afaa2c30cb95eedbc1fe`
    )
    .then(response => {
      //   console.log(response.data.results[0].key);
      if (response.data.results.length !== 0) {
        trailer = response.data.results[0].key;
        const btnContainer = document.querySelector('.md-modal-buttons');
        btnContainer.insertAdjacentHTML('beforeend', playTrailerBtnMarkup);

        const playerWidth = Math.round(window.innerWidth * 0.8);
        const playerHeight = Math.round(playerWidth / 1.77777);

        const playTrailerBtn = document.querySelector('.play-trailer');
        playTrailerBtn.addEventListener('click', onPlayTrailerClick);
        function onPlayTrailerClick(e) {
          const iframe = `<iframe class="player" id="player" type="text/html" width="${playerWidth}" height="${playerHeight}"
                            src="http://www.youtube.com/embed/${trailer}?enablejsapi=1"
                        frameborder="0"></iframe>`;
          const playerContainer = document.querySelector('.player');
          playerContainer.insertAdjacentHTML('beforeend', iframe);

          const playerBackdrop = document.querySelector('.player-backdrop');
          playerBackdrop.classList.remove('is-hidden');

          playerBackdrop.addEventListener('click', onPlayerBackdropClick);
          function onPlayerBackdropClick(e) {
            if (e.target === playerBackdrop) {
              playerBackdrop.classList.add('is-hidden');
              playerContainer.innerHTML = '';
            }
          }

          window.addEventListener('keydown', onEscPress);
          function onEscPress(e) {
            if (e.code === 'Escape') {
              playerBackdrop.classList.add('is-hidden');
              playerContainer.innerHTML = '';
              document.removeEventListener('keydown', onEscPress);
            }
          }
        }
      }
    });
}
