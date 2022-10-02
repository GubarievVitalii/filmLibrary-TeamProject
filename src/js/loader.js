import getRefs from './get-refs';

const refs = getRefs();

export function spinnerOn() {
    refs.backdropSpinnerRef.classList.remove('visually-hidden');


  setTimeout(function () {
    refs.backdropSpinnerRef.classList.add('visually-hidden');
  }, 2000);
}