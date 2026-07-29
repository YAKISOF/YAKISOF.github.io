const cards = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

cards.forEach((card, index) => {
  card.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
  observer.observe(card);
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorTrailOne = document.querySelector(".cursor-trail-one");
const cursorTrailTwo = document.querySelector(".cursor-trail-two");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cursorDot && cursorTrailOne && cursorTrailTwo && finePointer && !reducedMotion) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailOneX = mouseX;
  let trailOneY = mouseY;
  let trailTwoX = mouseX;
  let trailTwoY = mouseY;

  const moveCursor = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    document.body.classList.add("cursor-ready");
  };

  const animateTrail = () => {
    trailOneX += (mouseX - trailOneX) * 0.2;
    trailOneY += (mouseY - trailOneY) * 0.2;
    trailTwoX += (trailOneX - trailTwoX) * 0.16;
    trailTwoY += (trailOneY - trailTwoY) * 0.16;

    cursorTrailOne.style.left = `${trailOneX}px`;
    cursorTrailOne.style.top = `${trailOneY}px`;
    cursorTrailTwo.style.left = `${trailTwoX}px`;
    cursorTrailTwo.style.top = `${trailTwoY}px`;
    requestAnimationFrame(animateTrail);
  };

  document.addEventListener("mousemove", moveCursor);
  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready");
  });
  document.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-ready");
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  animateTrail();
}
