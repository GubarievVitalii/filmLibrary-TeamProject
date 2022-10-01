function footerModal() {
  const refs = {
    footerModalOpen: document.querySelector('.footer-modal-open'),
    footerModalClose: document.querySelector('.close'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.backdrop'),
  };

  refs.footerModalOpen.addEventListener('click', footerMO);
  refs.footerModalClose.addEventListener('click', footerMC);
  refs.backdrop.addEventListener('click', onBackdropClick);

  document.addEventListener('keypress', function (e) {
    console.log(e.code);
    if (e.code === 'Escape') {
      footerMC();
    }
  });

  function footerMO(evt) {
    evt.preventDefault();

    console.log('open modal footer');
    window.addEventListener('keydown', onEscKeyPress);
    refs.modal.classList.remove('is-hidden');
  }

  function footerMC(evt) {
    evt.preventDefault();
    refs.modal.classList.add('is-hidden');
  }

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
      footerMC(event);
    }
  }

  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      refs.modal.classList.add('is-hidden');
      footerMC();
    }
  }
}

export default footerModal;
