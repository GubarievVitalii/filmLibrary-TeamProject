const offset = 600;
const scrollUp = document.querySelector('.top');
const scrollUpSvgPath = document.querySelector('.top__svg--path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageXOffset || document.documentElement.scrollTop;

const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength) / height;

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

window.addEventListener('scroll', () => {
    updateDashoffset();
    if (getTop() > offset) {
        scrollUp.classList.add('top--active');
    } else {
        scrollUp.classList.remove('top--active');
    }
});

scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
