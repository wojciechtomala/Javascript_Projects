function scrollAppear(){
    const introText = document.querySelector('.intro-text');
    let introTextPosition = introText.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.5;
    
    if(introTextPosition < screenPosition){
        introText.classList.add('intro-visible');
    }
}

window.addEventListener('scroll', scrollAppear);