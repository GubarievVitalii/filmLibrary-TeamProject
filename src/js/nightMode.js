import getRefs from './get-refs';
import ls from './storage';

const switherMode = ls.load('light');
if (switherMode === 'off') {
  getRefs().checkBoxEl.checked = true;
  getRefs().bodyEl.classList.add('night');
}

getRefs().checkBoxEl.addEventListener('change', nigthlight);

function nigthlight() {
  if (getRefs().checkBoxEl.checked) {
    ls.save('light', 'off');
    getRefs().bodyEl.classList.add('night');
  } else {
    getRefs().bodyEl.classList.remove('night');
    ls.save('light', 'on');
  }
}

