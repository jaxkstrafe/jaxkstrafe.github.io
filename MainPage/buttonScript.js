//This script plays the main_btn animation when the button comes into view

const button = document.querySelector(".main_btn");


const btnObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      button.classList.add("animate");
      btnObserver.disconnect();
    }
  });
});


const button2 = document.querySelector(".skills_btn");

const btn2Observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      button2.classList.add("animate");
      btn2Observer.disconnect();
    }
  });
});

const button3 = document.querySelector(".project_btn");

const btn3Observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      button3.classList.add("animate");
      btn3Observer.disconnect();
    }
  });
});

btnObserver.observe(button);
btn2Observer.observe(button2);
btn3Observer.observe(button3);
