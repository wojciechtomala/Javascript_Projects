const loadBtn = document.querySelector('#load-btn');

// GET:

loadBtn.addEventListener('click', function(){
    fetch("https://jsonplaceholder.typicode.com/posts").then(function(res){
        return res.json();
    })
    .then(function(posts){
        console.log(posts);
    })
    .catch(function(){
        console.error("eroor!");
    })
});

// POST:
const post = {
    title: "New title",
    body: "Informations"
};

loadBtn.addEventListener('click', function(){
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content=Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
    });
});