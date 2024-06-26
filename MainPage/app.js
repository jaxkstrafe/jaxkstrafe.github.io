const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        } 
        else {
            entry.target.classList.remove('show');
        }
    })
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar_menu');

mobileMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});
