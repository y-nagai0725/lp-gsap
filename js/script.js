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

gsap.set(".fv__title span", {
  yPercent: -120,
});

gsap.to(".fv__title span", {
  yPercent: 0,
  ease: "",
  scrollTrigger: {
    trigger: ".fv__title span",
    start: "top 25%",
    toggleActions: "play none none reverse",
    invalidateOnRefresh: true,
    markers: true,
    onEnter: () => {
      console.log("onenter");
    },
    onLeave: () => {
      console.log("onleave");
    },
    onEnterBack: () => {
      console.log("onenterback");
    },
    onLeaveBack: () => {
      console.log("onleaveback");
    },
  }
});