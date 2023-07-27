(function(){
    let activeTooltip = null;

    function createTooltip(text, options){
        const tooltip = document.createElement('div');
        tooltip.textContent = text;
        tooltip.className = 'tooltip hidden';
        document.body.append(tooltip);
        tooltip.style.left = `${options.x + options.width / 2 - tooltip.offsetWidth/2}px`;
        tooltip.style.top = `${options.y - tooltip.offsetHeight / 2 - 20}px`;
    
        tooltip.classList.remove('hidden');
        activeTooltip = tooltip;
    }
    
    function showTooltip(e){
        const position = e.currentTarget.getBoundingClientRect();
        const innnerText = e.currentTarget.getAttribute('title');
        
        const options = {
            width: position.width,
            x: position.left,
            y: position.top
        }
        console.log(options.x)
        createTooltip(innnerText, options);
        e.currentTarget.removeAttribute('title');
    }
    
    function hideTooltip(e){
        if(activeTooltip){
            e.currentTarget.setAttribute('title', activeTooltip.textContent);
            activeTooltip.remove();
        }
    }
    
    function init(elems){
        for(let elem of elems){
            elem.addEventListener('mouseenter',showTooltip);
            elem.addEventListener('mouseleave',hideTooltip);
        }
    }

    window.makeTooltip = init;
})();

makeTooltip(document.querySelectorAll('[title]'))