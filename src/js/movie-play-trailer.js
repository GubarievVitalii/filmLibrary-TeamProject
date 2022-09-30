export default function playTrailer(trailer) {
  const playerWidth = Math.round(window.innerWidth * 0.65);
  const playerHeight = Math.round(playerWidth / 1.77777);
  const iframe = `<iframe class="player" id="player" type="text/html" width="${playerWidth}" height="${playerHeight}"
                            src="http://www.youtube.com/embed/${trailer}?enablejsapi=1"
                        frameborder="0"></iframe>`;

  const playerContainer = document.querySelector('.player');
  playerContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="lds-ring"><div></div><div></div><div></div><div></div>`
  );
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

  const closePlayerBtn = document.querySelector('.btn-player-close');
  closePlayerBtn.addEventListener('click', onClosePlayerBtnClick);
  function onClosePlayerBtnClick() {
    playerBackdrop.classList.add('is-hidden');
    playerContainer.innerHTML = '';
  }

  // window.addEventListener('keydown', onEscPress);
  // function onEscPress(e) {
  //   if (e.code === 'Escape') {
  //     playerBackdrop.classList.add('is-hidden');
  //     playerContainer.innerHTML = '';
  //     document.removeEventListener('keydown', onEscPress);
  //   }
  // }
}
