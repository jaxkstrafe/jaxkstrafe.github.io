

const button = document.querySelector(".main_btn");

const btnObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      button.classList.add("animate");
      btnObserver.disconnect();
    }
  });
});

btnObserver.observe(button);
