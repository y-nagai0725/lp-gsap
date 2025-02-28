const hamburgerButton = document.querySelector(".hamburger-button__button");
const gnavSpList = document.querySelector(".gnav-sp__list-wrapper");
const gnavSpListItems = document.querySelectorAll(".gnav-sp__list");
const header = document.querySelector(".header");
const horizontalScrollValue = 900;

//GSAPメディアクエリ
const mm = gsap.matchMedia();

let currentScrollPosition = 0;

/**
 * ハンバーガーメニュークリックイベント
 */
hamburgerButton.addEventListener("click", function () {
  this.classList.toggle("js-actived");
  gnavSpList.classList.toggle("js-actived");
  gnavSpListItems.forEach(item => {
    item.classList.toggle("js-actived");
  })
});

/**
 * スクロールイベント
 */
window.addEventListener("scroll", function () {
  toggleHeader();
});

/**
 * ヘッダー表示切り替え
 */
function toggleHeader() {
  const newScrollPositon = window.scrollY;
  if (newScrollPositon > currentScrollPosition) {
    header.classList.add("js-hidden");
  } else {
    header.classList.remove("js-hidden");
  }
  currentScrollPosition = newScrollPositon;
}

/**
 * FVアニメーション設定
 */
function setFvAnimation() {
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

  gsap.timeline({
    scrollTrigger: {
      trigger: ".fv__inner",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  }).to(".picture-right", {
    rotation: 180,
    ease: "linear",
  }).to(".picture-left", {
    rotation: -180,
    ease: "linear",
  }, "<")
}

/**
 * Introductionセクションのアニメーション設定
 */
function setIntroductionSectionAnimation() {
  const scrollArea = document.querySelector(".introduction__scroll-area");
  const introductionTitleWrapper = document.querySelector(".introduction__title-wrapper");
  const introductionTitle = document.querySelectorAll(".introduction__title span");
  const introductionText = document.querySelector(".introduction__text");
  const introductionImageWrapper = document.querySelector(".introduction__image-wrapper");
  const introductionPicture_1 = document.querySelector(".introduction__picture-1");
  const introductionPicture_2 = document.querySelector(".introduction__picture-2");
  const introductionPicture_3 = document.querySelector(".introduction__picture-3");
  const introductionPicture_4 = document.querySelector(".introduction__picture-4");

  //sp,tab,pc共通
  gsap.set(introductionTitle, {
    yPercent: 120,
  });

  gsap.set(introductionText, {
    opacity: 0,
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: scrollArea,
      start: "top center",
      onEnter: () => {
        gsap.timeline().to(introductionTitle, {
          duration: 0.8,
          yPercent: 0,
          ease: "",
        }).to(introductionText, {
          duration: 0.8,
          opacity: 1,
        }, "<0.4");
      },
    }
  });

  //pcのみ
  mm.add("(min-width: 1024px)", () => {
    gsap.set(introductionPicture_1, {
      y: () => -(window.innerHeight),
    });
    gsap.set(introductionPicture_2, {
      y: () => (window.innerHeight),
    });
    gsap.set(introductionPicture_3, {
      y: () => -(window.innerHeight * 1.5),
    });
    gsap.set(introductionPicture_4, {
      y: () => (window.innerHeight * 1.5),
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: scrollArea,
        start: "top top",
        end: () => "+=" + (scrollArea.scrollWidth - window.innerWidth + horizontalScrollValue),
        scrub: 1,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
      }
    }).to(introductionTitleWrapper, {
      x: () => -(introductionTitleWrapper.offsetWidth),
      ease: "none",
    }).to(introductionText, {
      x: () => -(introductionText.getBoundingClientRect().left + introductionText.offsetWidth * 0.8),
      ease: "none",
    }, "<").to(introductionImageWrapper, {
      x: () => -(introductionImageWrapper.getBoundingClientRect().left - (window.innerWidth - introductionImageWrapper.offsetWidth) * 0.5),
      ease: "none",
    }, "<").to([introductionPicture_1, introductionPicture_3], {
      y: 150,
      ease: "none",
    }, "<").to([introductionPicture_2, introductionPicture_4], {
      y: -150,
      ease: "none",
    }, "<");
  });
}

/**
 * 初期処理
 */
function init() {
  setFvAnimation();
  setIntroductionSectionAnimation();
}

init();