const modalBtn = document.querySelector('.modal-btn');
const modalBg = document.querySelector('.subscribe-section-bg');
const modalClose = document.querySelector('.subscribe-section-close');

modalBtn.addEventListener('click', () =>{
    modalBg.classList.add('bg-active');
});

modalClose.addEventListener('click', () =>{
    modalBg.classList.remove('bg-active');
});