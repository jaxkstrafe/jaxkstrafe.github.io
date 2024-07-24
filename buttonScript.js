// Common animation class
const animationClass = 'animate'; // Use a descriptive name

function createAndObserveButton(buttonSelector) {
  const button = document.querySelector(buttonSelector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        button.classList.add(animationClass); 
        observer.unobserve(button); 
      }
    });
  });

  observer.observe(button);
}

// Create and observe multiple buttons
createAndObserveButton(".main_btn");
createAndObserveButton(".skills_btn");
createAndObserveButton(".project_btn");
