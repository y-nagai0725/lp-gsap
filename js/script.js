const hamburgerButton = document.querySelector(".hamburger-button__button");
const gnavSpList = document.querySelector(".gnav-sp__list-wrapper");
const gnavSpListItems = document.querySelectorAll(".gnav-sp__list");

hamburgerButton.addEventListener("click", function () {
  this.classList.toggle("js-actived");
  gnavSpList.classList.toggle("js-actived");
  gnavSpListItems.forEach(item => {
    item.classList.toggle("js-actived");
  })
});