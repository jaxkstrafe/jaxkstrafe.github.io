const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('icon_show');
            observer.unobserve(entry.target); 
        } 
        else {
            entry.target.classList.remove('icon_show');
        }
    })
});

const hiddenElements = document.querySelectorAll('.icon_hidden');
hiddenElements.forEach((el) => observer.observe(el));
