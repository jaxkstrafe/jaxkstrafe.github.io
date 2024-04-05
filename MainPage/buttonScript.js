

const button = document.querySelector(".main_btn");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      button.classList.add("animate");
      observer.disconnect();
    }
  });
});

observer.observe(button);
