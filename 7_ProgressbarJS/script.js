(function(){
    const progressBar = document.createElement('div');
    const progressLine = document.createElement('div');
    
    progressBar.className = "progress-bar";
    progressLine.className = "progress-bar-inner";
    
    progressBar.append(progressLine);
    document.body.prepend(progressBar);
    
    const html = document.documentElement;
    window.addEventListener('scroll', () =>{
        const height = html.scrollHeight - window.innerHeight;
        const scrolled = html.scrollTop / height * 100;
        console.log(scrolled);
        progressLine.style.width = `${scrolled}%`;
    });
})();