function footerModal() {
  const refs = {
    footerModalOpen: document.querySelector('.footer-modal-open'),
    footerModalClose: document.querySelector('svg.icon-close'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
  };

  refs.footerModalOpen.addEventListener('click', footerMO);
  refs.footerModalClose.addEventListener('click', footerMC);
  refs.backdrop.addEventListener('click', footerMC);

  document.addEventListener('keypress', function (e) {
    console.log(e.code);
    if (e.code === 'Escape') {
      footerMC();
    }
  });

  function footerMO(evt) {
    evt.preventDefault();

    console.log('kurva open');
    window.addEventListener('keydown', onEscKeyPress);
    refs.modal.classList.remove('is-hidden');
  }

  function footerMC(evt) {
    evt.preventDefault();
    console.log('closed');
    refs.modal.classList.add('is-hidden');
  }

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
      footerMC(event);
    }
  }
}
// достукатись до хреста
//     відкрити по анкору

//     закрити по хресту
//     закрити по еск
//     закрити по бекдропу

export default footerModal;
