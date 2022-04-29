/* eslint-disable max-len */
const burger = document.querySelector("header > div#burger");
const navHeader = document.querySelector("header > nav");
const closeButtonNav = document.querySelector("header > nav > button");
const formHeader = document.querySelector("header > form");
const reseauxSociaux = document.querySelector("footer > div:first-of-type");
const listeMenu = document.querySelectorAll("header > nav > ul > li > a");
const articlePanel = document.querySelectorAll("main > div > article");
const pauseButton = document.querySelector(".slideshow-container > a:nth-of-type(2)");
let counterToggleMenu = 0;

burger.addEventListener("click", () => {
  if (counterToggleMenu === 0) {
    burger.classList.toggle("open");
    navHeader.style.left = "0vw";
    counterToggleMenu = 1;
  } else {
    burger.classList.toggle("open");
    navHeader.style.left = "-100vw";
    counterToggleMenu = 0;
  }
});

closeButtonNav.addEventListener("click", () => {
  burger.classList.toggle("open");
  navHeader.style.left = "-100vw";
  counterToggleMenu = 0;
});

window.addEventListener("load", () => {
  const sizeWindow = window.innerWidth;
  if (sizeWindow >= 1200) {
    document.querySelector("header").insertBefore(reseauxSociaux, formHeader);
  } else if (sizeWindow >= 768) {
    document.querySelector("header").insertBefore(reseauxSociaux, burger);
  }
});

window.addEventListener("resize", () => {
  const sizeWindow = window.innerWidth;
  if (sizeWindow >= 1200) {
    document.querySelector("header").insertBefore(reseauxSociaux, formHeader);
  } else if (sizeWindow >= 768) {
    document.querySelector("header").insertBefore(reseauxSociaux, burger);
  } else {
    document.querySelector("footer").prepend(reseauxSociaux);
  }
});

// Color liste Menu
listeMenu.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.backgroundColor = "black  ";
    element.style.transform = "scale(0.8)";
    element.style.color = "red";
  });
  element.addEventListener("mouseleave", () => {
    element.style.backgroundColor = "";
    element.style.transform = "scale(0.8)";
    element.style.color = "";
  });
});


// Button PREV #################################################################
const buttonPrev = document.querySelector("main > div > a.prev");
buttonPrev.addEventListener("click", () => {
  plusSlides(-1);
  clearInterval(autoScrollTimer);
  autoScrollTimer = setInterval(() => {
    plusSlides(1);
  }, 6000);
});

// Button NEXT #################################################################
const buttonNext = document.querySelector("main > div > a.next");
buttonNext.addEventListener("click", () => {
  plusSlides(1);
  clearInterval(autoScrollTimer);
  autoScrollTimer = setInterval(() => {
    plusSlides(1);
  }, 6000);
});

// Button PAUSE #################################################################
let counterPause = 0;
pauseButton.addEventListener("click", () => {
  if (counterPause === 0) {
    counterPause = 1;
    pauseButton.innerHTML = "&#9658;";
    clearInterval(autoScrollTimer);
  } else {
    counterPause = 0;
    pauseButton.innerHTML = "&#10074;&#10074;";
    autoScrollTimer = setInterval(() => {
      plusSlides(1);
    }, 6000);
  }
});

// Get ALT of IMG and put it on <p> label #######################################
const altImgCarousel = document.querySelectorAll("main > div > div > img");
const labelCarousel = document.querySelectorAll("main > div > div > p:nth-of-type(2)");
let counterCarousel = 0;
altImgCarousel.forEach((element) => {
  labelCarousel[counterCarousel].innerHTML = element.getAttribute("alt");
  counterCarousel = counterCarousel + 1;
});

// Add number of Dots we need to select the pic we want
for (let i = 0; i < altImgCarousel.length; i++) {
  const dotsTag = document.createElement("span");
  dotsTag.setAttribute("class", "dot");
  document.querySelector("#selector").appendChild(dotsTag);
}

// Carrousel

let slideIndex = 1;
showSlides(slideIndex);

/**
 * @param {n} n
 */
function plusSlides(n) {
  showSlides((slideIndex += n));
}

/**
 * @param {n} n
 */
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Auto scroll Carousel
let autoScrollTimer = setInterval(() => {
  plusSlides(1);
}, 3000);

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots.className += " active";
}

const dotsdots = document.querySelectorAll(".dot");
let counterDots = 1;
dotsdots.forEach((element) => {
  element.setAttribute("onclick", "currentSlide(" + counterDots + ")");
  counterDots = counterDots + 1;
});

// Width of dots => Number of img
const dotContainer = document.getElementById("selector");
dotContainer.style.gridTemplateColumns = "repeat(" + dotsdots.length + ", auto";
