const hamburgerButton = document.querySelector(".hamburger-button__button");
const gnavSpList = document.querySelector(".gnav-sp__list-wrapper");
const gnavSpListItems = document.querySelectorAll(".gnav-sp__list");
const header = document.querySelector(".header");

let currentScrollPosition = 0;

hamburgerButton.addEventListener("click", function () {
  this.classList.toggle("js-actived");
  gnavSpList.classList.toggle("js-actived");
  gnavSpListItems.forEach(item => {
    item.classList.toggle("js-actived");
  })
});

window.addEventListener("scroll", function () {
  toggleHeader();
});

function toggleHeader() {
  const newScrollPositon = window.scrollY;
  if (newScrollPositon > currentScrollPosition) {
    header.classList.add("js-hidden");
  } else {
    header.classList.remove("js-hidden");
  }
  currentScrollPosition = newScrollPositon;
}

function setFvTitleAnimation() {
  gsap.set(".fv__title span", {
    yPercent: 120,
  });

  gsap.set(".fv__sub-title span", {
    yPercent: 120,
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".fv__inner",
      start: "top 1px",
      end: "bottom center",
      toggleActions: "play reverse play none",
      invalidateOnRefresh: true,
    },
  }).to(".fv__title span", {
    duration: 0.8,
    yPercent: 0,
    ease: "",
  }).to(".fv__sub-title span", {
    duration: 0.8,
    yPercent: 0,
    ease: "",
  }, "<");
}

setFvTitleAnimation();