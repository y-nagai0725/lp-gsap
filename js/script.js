/**
 * GSAPメディアクエリ
 */
const mm = gsap.matchMedia();

/**
 * 現在のスクロール位置(y座標)
 */
let currentScrollPosition = 0;

/**
 * ハンバーガーメニュークリックイベント
 */
document.querySelector(".hamburger-button__button").addEventListener("click", function () {
  const gnavSpList = document.querySelector(".gnav-sp__list-wrapper");
  const gnavSpListItems = document.querySelectorAll(".gnav-sp__list");
  this.classList.toggle("js-actived");
  gnavSpList.classList.toggle("js-actived");
  gnavSpListItems.forEach(item => {
    item.classList.toggle("js-actived");
  })
});

/**
 * トップへ戻るボタンクリック時処理
 */
document.querySelector(".footer__back-button").addEventListener("click", function () {
  gsap.to(window, {
    duration: 0.8,
    ease: "",
    scrollTo: {
      y: 0,
    }
  });
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
  const header = document.querySelector(".header");
  const newScrollPositon = window.scrollY;
  if (newScrollPositon > currentScrollPosition) {
    header.classList.add("js-hidden");
  } else {
    header.classList.remove("js-hidden");
  }
  currentScrollPosition = newScrollPositon;
}

/**
 * ヘッダーの色モード切り替え
 */
function setChangeHeaderModeAnimation() {
  const brandSection = document.querySelector(".brand");
  const outlineSection = document.querySelector(".outline");
  const changeHeaderMode = () => {
    [brandSection, outlineSection].forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        toggleClass: { targets: ".header", className: "js-white-mode" },
      });
    });
  };

  mm.add("(max-width: 1023px)", () => {
    changeHeaderMode();
  });

  mm.add("(min-width: 1024px)", () => {
    changeHeaderMode();
  });
}

/**
 * アンカーリンクのスムーススクロール設定
 */
function setAnchorLinkScrollAnimation() {
  const links = document.querySelectorAll("[href^='#']");
  links.forEach(link => {
    const href = link.getAttribute("href");
    link.addEventListener("click", function (e) {
      e.preventDefault();
      gsap.to(window, {
        duration: 0.8,
        ease: "",
        scrollTo: {
          y: href === "#" ? 0 : href,
        }
      });
    });
  });
}

/**
 * ハンバーガーボタンhideアニメーション設定
 */
function setHamburgerButtonHideAnimation() {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "center+=20% bottom",
      end: "bottom bottom",
      scrub: 1,
    },
  }).to(".hamburger-button__button", {
    autoAlpha: 0,
  }).to(".gnav-sp", {
    autoAlpha: 0,
  }, "<");
}

/**
 * sp,tabのグローバルナビゲーションメニューのテキストアニメーション設定
 */
function setGnavSpTextAnimation() {
  const sections = document.querySelectorAll("[data-tag='section']");
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom bottom",
      toggleClass: { targets: "[data-tag='link-" + section.className + "']", className: "js-actived" },
    });
  });
}

/**
 * OPアニメーション設定
 */
function setOpeningAnimation() {
  const opening = document.querySelector(".opening");
  const openingStartBg = document.querySelector(".opening__start-bg");
  const openingEndBg = document.querySelector(".opening__end-bg");
  const openingLogoWrapper = document.querySelector(".opening__logo-wrapper");
  const openingLogo = document.querySelector(".opening__logo");

  //スクロール禁止
  disableScroll();

  //背景、ロゴ表示アニメーション
  gsap.timeline().to(openingEndBg, {
    duration: 0.6,
    ease: "",
    clipPath: "inset(0 0 0 0%)",
  }).add(() => {
    openingLogo.classList.add("js-white-mode");
  }, "<0.2").to([openingEndBg, openingStartBg, openingLogoWrapper], {
    duration: 0.6,
    ease: "",
    clipPath: "inset(0 100% 0 0)",
    onComplete: () => {
      gsap.to(opening, {
        display: "none",
      })
    },
  }, ">1").add(() => {
    //FVの画像表示処理
    showFvImage();

    //スクロール禁止解除
    enableScroll();
  }, "<");
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
  }).fromTo(".picture-right", {
    rotation: 0,
  }, {
    rotation: 180,
    ease: "linear",
  }).fromTo(".picture-left", {
    rotation: 0,
  }, {
    rotation: -180,
    ease: "linear",
  }, "<");
}

/**
 * FVの画像表示処理
 */
function showFvImage() {
  gsap.fromTo([".fv__picture-1", ".fv__picture-2", ".fv__picture-3"], {
    rotation: -90,
    opacity: 0,
    scale: 0.5,
  }, {
    duration: 1.2,
    rotation: 0,
    opacity: 1,
    scale: 1,
    ease: "",
    stagger: {
      each: 0.33,
    },
  });
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
  const horizontalScrollValue = 900;

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
 * Brandセクションのアニメーション設定
 */
function setBrandSectionAnimation() {
  const animateBackground = (value) => {
    const brandTitleWrapper = document.querySelector(".brand__title-wrapper");
    ScrollTrigger.create({
      trigger: brandTitleWrapper,
      start: "top bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const backgroundPositionValue = "center -" + (self.progress * value) + "%";
        brandTitleWrapper.style.setProperty("--background-position-value", backgroundPositionValue);
      },
    });
  };

  const animateBrandSection = () => {
    const brandSection = document.querySelector(".brand__pin-container");
    ScrollTrigger.create({
      trigger: brandSection,
      start: "bottom bottom",
      end: () => "+=" + brandSection.offsetHeight,
      pin: brandSection,
      pinSpacing: false,
      aniticipatePin: 1,
      invalidateOnRefresh: true,
    });
  };

  const animateListItem = () => {
    const brandList = document.querySelectorAll(".brand__list");
    brandList.forEach(list => {
      gsap.fromTo(list, {
        yPercent: 20,
        rotationX: -3,
        opacity: 5,
      }, {
        yPercent: -40,
        rotationX: 3,
        opacity: 0,
        ease: "",
        scrollTrigger: {
          trigger: list,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });
  };

  const animateOverviewArea = () => {
    const brandOverviewArea = document.querySelector(".brand__overview-area");
    gsap.fromTo(brandOverviewArea, {
      scale: 1.15,
      yPercent: 30,
    }, {
      scale: 1,
      yPercent: 0,
      ease: "",
      scrollTrigger: {
        trigger: brandOverviewArea,
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  };

  mm.add("(max-width: 1023px)", () => {
    animateBackground(15);
  });

  mm.add("(min-width: 1024px)", () => {
    animateBackground(20);
    animateListItem();
    animateOverviewArea();
    animateBrandSection();
  });
}

/**
 * Presentセクションのアニメーション設定
 */
function setPresentSectionAnimation() {
  const animateBackground = (value) => {
    const presentTitleWrapper = document.querySelector(".present__title-wrapper");
    ScrollTrigger.create({
      trigger: presentTitleWrapper,
      start: "top bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const backgroundPositionValue = "center -" + (self.progress * value) + "%";
        presentTitleWrapper.style.setProperty("--background-position-value", backgroundPositionValue);
      },
    });
  };

  const animateListItem = () => {
    const presentList = document.querySelectorAll(".present__list");
    const presentListWrapper = document.querySelector(".present__list-wrapper");
    const listGap = Number(getComputedStyle(presentListWrapper).gap.replace("px", ""));
    presentList.forEach(list => {
      gsap.to(list, {
        opacity: 0,
        yPercent: 25,
        scale: 0.9,
        ease: "",
        scrollTrigger: {
          trigger: list,
          start: "top top",
          end: () => "+=" + (list.offsetHeight + listGap),
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });
  };

  const animatePresentSection = () => {
    const presentSection = document.querySelector(".present__pin-container");
    ScrollTrigger.create({
      trigger: presentSection,
      start: "bottom bottom",
      end: () => "+=" + presentSection.offsetHeight,
      pin: true,
      pinSpacing: false,
      aniticipatePin: 1,
      invalidateOnRefresh: true,
    });
  };

  mm.add("(max-width: 1023px)", () => {
    animateBackground(15);
  });

  mm.add("(min-width: 1024px)", () => {
    animateBackground(20);
    animateListItem();
    animatePresentSection();
  });
}

/**
 * Outlineセクションのアニメーション設定
 */
function setOutlineSectionAnimation() {
  const animateBackground = (value) => {
    const outlineTitleWrapper = document.querySelector(".outline__title-wrapper");
    ScrollTrigger.create({
      trigger: outlineTitleWrapper,
      start: "top bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const backgroundPositionValue = "center -" + (self.progress * value) + "%";
        outlineTitleWrapper.style.setProperty("--background-position-value", backgroundPositionValue);
      },
    });
  };

  const animateList = () => {
    const outlineList = document.querySelector(".outline__list-wrapper");
    gsap.fromTo(outlineList, {
      scale: 1.08,
    }, {
      scale: 1,
      ease: "",
      scrollTrigger: {
        trigger: outlineList,
        start: "top bottom",
        end: () => "+=" + outlineList.offsetHeight,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  };

  mm.add("(max-width: 1023px)", () => {
    animateBackground(15);
  });

  mm.add("(min-width: 1024px)", () => {
    animateBackground(20);
    animateList();
  });
}

/**
 * イベント処理禁止
 * @param {*} e
 */
function noEvent(e) {
  e.preventDefault();
}

/**
 * スクロール禁止
 */
function disableScroll() {
  document.addEventListener('touchmove', noEvent, { passive: false });
  document.addEventListener('wheel', noEvent, { passive: false });
}

/**
 * スクロール禁止を解除
 */
function enableScroll() {
  document.removeEventListener('touchmove', noEvent);
  document.removeEventListener('wheel', noEvent);
}

/**
 * 慣性スクロール用Lenis設定
 */
function setLenis() {
  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  };

  const lenis = new Lenis({
    lerp: 0.2,
    duration: 1,
    easing: easeOutQuart,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

/**
 * 初期処理
 */
function init() {
  setAnchorLinkScrollAnimation();
  setHamburgerButtonHideAnimation();
  setGnavSpTextAnimation();
  setOpeningAnimation();
  setFvAnimation();
  setIntroductionSectionAnimation();
  setBrandSectionAnimation();
  setPresentSectionAnimation();
  setOutlineSectionAnimation();
  setChangeHeaderModeAnimation();
  setLenis();
}

init();