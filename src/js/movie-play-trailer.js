import getRefs from './get-refs';
const { playerContainer, playerBackdrop, playerCloseBtn } = getRefs();
const origin = location.origin;

export default function playTrailer(trailer) {
  const iframe = `<iframe class="responsive-player" id="player" type="text/html"
                            src="https://www.youtube.com/embed/${trailer}?origin=${origin}"
                        frameborder="0" allowfullscreen></iframe>`;

  playerContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="lds-ring"><div></div><div></div><div></div><div></div>`
  );
  playerContainer.insertAdjacentHTML('beforeend', iframe);

  playerBackdrop.classList.remove('is-hidden');

  const player = document.querySelector('.responsive-player');
  const spinner = document.querySelector('.lds-ring');
  playerBackdrop.addEventListener('click', onPlayerBackdropClick);
  function onPlayerBackdropClick(e) {
    if (e.target === playerBackdrop) {
      playerBackdrop.classList.add('is-hidden');
      player.remove();
      spinner.remove();
      playerBackdrop.removeEventListener('click', onPlayerBackdropClick);
      playerCloseBtn.removeEventListener('click', onClosePlayerBtnClick);
    }
  }

  playerCloseBtn.addEventListener('click', onClosePlayerBtnClick);
  function onClosePlayerBtnClick() {
    playerBackdrop.classList.add('is-hidden');
    player.remove();
    spinner.remove();
    playerCloseBtn.removeEventListener('click', onClosePlayerBtnClick);
    playerBackdrop.removeEventListener('click', onPlayerBackdropClick);
  }
}
