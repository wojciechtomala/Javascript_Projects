const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide .img');

// BUTTONS:
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// CURRENT IMG:
let current = 1;
// GET IMG WIDTH:
const size = carouselImages[0].clientWidth;

//
carouselSlide.style.transform = `translateX(${-size * current}px)`;

// BUTTON LISTENER:
nextBtn.addEventListener('click',() =>{
    if(current >= carouselImages.length -1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    current++;
    carouselSlide.style.transform = `translateX(${-size * current}px)`;
});

prevBtn.addEventListener('click',() =>{
    if(current <=0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    current--;
    carouselSlide.style.transform = `translateX(${-size * current}px)`;
});

carouselSlide.addEventListener('transitionend', ()=>{
    console.log(carouselImages[current].id);
    if(carouselImages[current].id === 'firstClone'){
        carouselSlide.style.transition = "none";
        current = 1;
        carouselSlide.style.transform = `translateX(${-size * current}px)`;
    }
    if(carouselImages[current].id === 'lastClone'){
        carouselSlide.style.transition = "none";
        current = carouselImages.length - 2;
        carouselSlide.style.transform = `translateX(${-size * current}px)`;
    }
});