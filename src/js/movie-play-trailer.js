import getRefs from './get-refs';
const { playerContainer, playerBackdrop, playerCloseBtn } = getRefs();

export default function playTrailer(trailer) {
  const playerWidth = Math.round(window.innerWidth * 0.65);
  const playerHeight = Math.round(playerWidth / 1.77777);

  const iframe = `<iframe class="player" id="player" type="text/html" width="${playerWidth}" height="${playerHeight}"
                            src="http://www.youtube.com/embed/${trailer}?enablejsapi=1"
                        frameborder="0" allowfullscreen></iframe>`;

  playerContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="lds-ring"><div></div><div></div><div></div><div></div>`
  );
  playerContainer.insertAdjacentHTML('beforeend', iframe);

  playerBackdrop.classList.remove('is-hidden');

  playerBackdrop.addEventListener('click', onPlayerBackdropClick);
  function onPlayerBackdropClick(e) {
    if (e.target === playerBackdrop) {
      playerBackdrop.classList.add('is-hidden');
      playerContainer.innerHTML = '';
      playerBackdrop.removeEventListener('click', onPlayerBackdropClick);
      playerCloseBtn.removeEventListener('click', onClosePlayerBtnClick);
    }
  }

  playerCloseBtn.addEventListener('click', onClosePlayerBtnClick);
  function onClosePlayerBtnClick() {
    playerBackdrop.classList.add('is-hidden');
    playerContainer.innerHTML = '';
    playerCloseBtn.removeEventListener('click', onClosePlayerBtnClick);
    playerBackdrop.removeEventListener('click', onPlayerBackdropClick);
  }
}
