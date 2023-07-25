function smoothScroll(target, duration){
    let t = document.querySelector(target);
    let tPosition = t.getBoundingClientRect().top;
    let startPosition = window.scrollY
    let distance = tPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let start = ease(timeElapsed,startPosition,distance,duration);
        window.scrollTo(0,start);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing animation:
    function ease(t,b,c,d){
        t /= d /2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b; 
    }

    requestAnimationFrame(animation);
}

// Event Listener:
const goDownBtn = document.querySelector(".section1");
const goUpBtn = document.querySelector(".section2");

goDownBtn.addEventListener('click', ()=>{
    smoothScroll('.section2',1000);
});

goUpBtn.addEventListener('click', ()=>{
    smoothScroll('.section1',1000);
});