const hamburgerButton = document.querySelector(".hamburger-button__button");

hamburgerButton.addEventListener("click", function(){
  this.classList.toggle("js-actived");
});