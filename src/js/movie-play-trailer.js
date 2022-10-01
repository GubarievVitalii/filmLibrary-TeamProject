import getRefs from './get-refs';
const { playerContainer, playerBackdrop, playerCloseBtn } = getRefs();

export default function playTrailer(trailer) {
  const playerWidth = Math.round(window.innerWidth * 0.65);
  const playerHeight = Math.round(playerWidth / 1.77777);

  // 2. This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement('script');

  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: `${playerHeight}`,
      width: `${playerWidth}`,
      videoId: `${trailer}`,
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

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
    }
  }

  playerCloseBtn.addEventListener('click', onClosePlayerBtnClick);
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
