const DAY_COLORS = ["#00AEB3", "#7C3AED", "#48CAE4"];

function switchDay(index) {
  [0, 1, 2].forEach((tabIndex) => {
    const module = document.getElementById(`module${tabIndex}`);
    const tab = document.getElementById(`tab${tabIndex}`);

    if (module) {
      module.style.display = tabIndex === index ? "block" : "none";
    }

    if (!tab) return;

    tab.style.background = tabIndex === index ? DAY_COLORS[tabIndex] : "transparent";
    tab.style.color = tabIndex === index ? "#fff" : "#94A3B8";
    tab.style.borderColor = tabIndex === index ? DAY_COLORS[tabIndex] : "rgba(255,255,255,.12)";
    tab.style.boxShadow = tabIndex === index ? `0 4px 20px ${DAY_COLORS[tabIndex]}55` : "none";
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        entry.target
          .querySelectorAll(".pip-cell,.price-card,.req-item,.topic-row,.faq-item")
          .forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.06}s`;
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity .5s ease,transform .5s ease";

            setTimeout(() => {
              element.style.opacity = "1";
              element.style.transform = "none";
            }, index * 60 + 100);
          });
      });
    },
    { threshold: 0.05 },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    document.querySelectorAll(".hero-bg-img").forEach((element) => {
      element.style.transform = `translateY(${scrollY * 0.25}px)`;
    });
  });
}

function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");
  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

  document.querySelectorAll(".faq-a").forEach((element) => {
    element.style.maxHeight = "0";
    element.style.paddingTop = "0";
    element.style.paddingBottom = "0";
  });

  document.querySelectorAll(".faq-icon").forEach((element) => {
    element.textContent = "+";
    element.style.transform = "rotate(0deg)";
  });

  document.querySelectorAll(".faq-q").forEach((element) => {
    element.style.background = "transparent";
  });

  if (isOpen || !answer || !icon) return;

  answer.style.maxHeight = `${answer.scrollHeight + 40}px`;
  answer.style.paddingTop = "4px";
  answer.style.paddingBottom = "0";
  icon.textContent = "x";
  icon.style.transform = "rotate(90deg)";
  button.style.background = "rgba(0,180,216,.05)";
}

function submitForm() {
  const name = document.getElementById("f-name")?.value.trim() ?? "";
  const phone = document.getElementById("f-phone")?.value.trim() ?? "";
  const email = document.getElementById("f-email")?.value.trim() ?? "";
  const level = document.getElementById("f-level")?.value ?? "";
  const tablet = document.getElementById("f-tablet")?.value ?? "";

  if (!name || !phone || !email || !level || !tablet) {
    [
      { id: "f-name", value: name },
      { id: "f-phone", value: phone },
      { id: "f-email", value: email },
      { id: "f-level", value: level },
      { id: "f-tablet", value: tablet },
    ].forEach((field) => {
      const element = document.getElementById(field.id);
      if (!element || field.value) return;

      element.style.borderColor = "rgba(239,68,68,.6)";
      element.style.boxShadow = "0 0 0 2px rgba(239,68,68,.15)";

      setTimeout(() => {
        element.style.borderColor = "rgba(255,255,255,.1)";
        element.style.boxShadow = "none";
      }, 2500);
    });

    return;
  }

  const form = document.getElementById("apply-form");
  const success = document.getElementById("form-success");
  const seatsCounter = document.getElementById("seats-count");

  if (form) form.style.display = "none";
  if (success) {
    success.style.display = "block";
    success.style.animation = "fadeSlideUp .6s ease forwards";
  }

  if (seatsCounter) {
    const nextValue = parseInt(seatsCounter.textContent || "0", 10) - 1;
    if (nextValue >= 0) seatsCounter.textContent = `${nextValue}`;
  }
}

function initSeats() {
  const seats = 7;
  document.querySelectorAll("#seats-count").forEach((element) => {
    element.textContent = `${seats}`;
  });
}

function exposeGlobals() {
  window.switchDay = switchDay;
  window.toggleFaq = toggleFaq;
  window.submitForm = submitForm;
}

function initPage() {
  switchDay(0);
  initReveal();
  initParallax();
  initSeats();
  exposeGlobals();
}

document.addEventListener("DOMContentLoaded", () => {
  initPage();
});
