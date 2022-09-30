// (() => {
//   const refs = {
//     openModalBtn: document.querySelector('[data-modal-open-two]'),
//     closeModalBtn: document.querySelector('[data-modal-close-two]'),
//     modal: document.querySelector('[data-modal-two]'),
//     backdrop: document.querySelector('.js-back'),
//   };

//   refs.openModalBtn.addEventListener('click', openModal);
//   refs.closeModalBtn.addEventListener('click', closeModal);
//   refs.backdrop.addEventListener('click', onBackdropClick);

//   function openModal(e) {
//     e.preventDefault();
//     window.addEventListener('keydown', onEscKeyPress);
//     refs.modal.classList.remove('is-hidden');
//   }

//   function closeModal(e) {
//     window.removeEventListener('keydown', onEscKeyPress);
//     refs.modal.classList.add('is-hidden');
//   }

//   function onBackdropClick(event) {
//     if (event.currentTarget === event.target) {
//       console.log('Кликнули именно в бекдроп!!!!');
//       closeModal();
//     }
//   }

//   function onEscKeyPress(event) {
//     const ESC_KEY_CODE = 'Escape';
//     const isEscKey = event.code === ESC_KEY_CODE;
//     if (isEscKey) {
//       closeModal();
//     }
//   }
// })();
