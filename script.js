// Main javascript file.

// responsive navbar javascript part
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".Navheader");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Slider JS
// Modified cconceicao's slider (Amini Version )

var slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");

var slideSize = document.getElementsByClassName("wrapper")[0].offsetWidth,
  posInitial,
  index = 0;

function slide(wrapper, items, prev, next) {
  var posX1 = 0,
    posX2 = 0,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName("slide"),
    slidesLength = slides.length,
    // slideSize =  = document.getElementsByClassName('wrapper')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add("loaded");

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", function () {
    shiftSlide(-1);
  });
  next.addEventListener("click", function () {
    shiftSlide(1);
  });

  // Transition events
  items.addEventListener("transitionend", checkIndex);

  setWidth();

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);

function setWidth() {
  var slides = document.getElementsByClassName("slide");

  slideSize = document.getElementsByClassName("wrapper")[0].offsetWidth;

  Array.from(slides).forEach((item) => {
    item.style.width = slideSize + "px";
  });
  document.getElementById("slides").style.left = -slideSize + "px";

  // slider.style.left = -(wrapper[0].offsetWidth)+'px';
}

window.addEventListener("resize", setWidth);

// second slider //POPULAR COURSES (Musa)
const sliderWrapper = document.querySelector(".sliderWrapper");
const secondCarousel = document.querySelector(".secondCarousel");
const btnSlide = document.querySelectorAll(".btnSlide");
const firstCardWith = secondCarousel.querySelector(".s-card").offsetWidth;
const secondCarouselChildrens = [...secondCarousel.children];
let isDragging = false,
  startX,
  startScrollLeft;
// timeoutId;

// get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(secondCarousel.offsetWidth / firstCardWith);

// Insert copies  of the last few cards to begining of carousel gor infinite scrolling
secondCarouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    secondCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies  of the first few cards to end of carousel for infinite scrolling
secondCarouselChildrens.slice(0, cardPerView).forEach((card) => {
  secondCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
btnSlide.forEach((btn) => {
  btn.addEventListener("click", () => {
    //tenary operator
    secondCarousel.scrollLeft +=
      btn.id === "left" ? -firstCardWith : firstCardWith;
  });
});

const dragStart = (e) => {
  isDragging = true;
  secondCarousel.classList.add("dragging");

  // Recordes the initial cursor and scroll position of the carousel

  startX = e.pageX;
  startScrollLeft = secondCarousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; //if isDragging is false return
  secondCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  secondCarousel.classList.remove("dragging");
};

// const autoPlay = () => {
//   if (window.innerWidth < 800) return;

//   timeoutId = setTimeout(() => {
//     secondCarousel.scrollLeft += firstCardWith;
//   }, 3000);
//  };
// autoPlay();
const infiniteScroll = () => {
  // If the carousel is at the begining, scroll to the end
  if (secondCarousel.scrollLeft === 0) {
    secondCarousel.classList.add("no-transition");
    secondCarousel.scrollLeft =
      secondCarousel.scrollWidth - secondCarousel.offsetWidth;
    secondCarousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(secondCarousel.scrollLeft) ===
    secondCarousel.scrollWidth - secondCarousel.offsetWidth
  ) {
    secondCarousel.classList.add("no-transition");
    secondCarousel.scrollLeft = secondCarousel.offsetWidth;
    secondCarousel.classList.remove("no-transition");
  }
  // clearTimeout(timeoutId);
  // if (!sliderWrapper.matches(":hover")) autoPlay();
};

secondCarousel.addEventListener("mousedown", dragStart);
secondCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
secondCarousel.addEventListener("scroll", infiniteScroll);
// sliderWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// sliderWrapper.addEventListener("mouseleave", autoPlay);

// gallery Musa

const galleryItem = document.getElementsByClassName("gallery-item");
// create element for lightbox
const lightBoxContainer = document.querySelector(".BoxContainer");
const closeGallery = document.querySelector(".close-gallery");
// for basic area
const lightBoxContent = document.querySelector(".BoxContent");
// for images
const lightBoxImg = document.querySelector(".BoxImg");
// for prev button to change images
const lightBoxPrev = document.querySelector(".BoxPrev");
//for next button
const lightBoxNext = document.querySelector(".BoxNext");

let imgIndex = 1;
//create function
function showLightBox(n) {
  if (n > galleryItem.length) {
    imgIndex = 1;
  } else if (n < 1) {
    imgIndex = galleryItem.length;
  }
  let imageLocation = galleryItem[imgIndex - 1].children[0].getAttribute("src");
  lightBoxImg.setAttribute("src", imageLocation);
}

function currentImage() {
  lightBoxContainer.style.display = "block";
  let imageIndex = parseInt(this.getAttribute("data-index"));
  showLightBox((imgIndex = imageIndex));
}

for (let i = 0; i < galleryItem.length; i++) {
  galleryItem[i].addEventListener("click", currentImage);
}
function sliderImage(n) {
  showLightBox((imgIndex += n));
}
function prevImage(n) {
  sliderImage(-1);
}
function nextImage(n) {
  sliderImage(1);
}

lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);

// close lightbox
function closeLightBox(event) {
  if (this === event.target) {
    lightBoxContainer.style.display = "none";
  }
}
lightBoxContainer.addEventListener("click", closeLightBox);
closeGallery.addEventListener("click", () => {
  lightBoxContainer.style.display = "none";
  console.log("click");
});

// gallery ends

// what other say js

// what other say slider

const people = [
  {
    id: 1,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
  {
    id: 2,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
  {
    id: 3,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
  {
    id: 4,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
];

const slideContainer = document.querySelector(".other-say-container");
const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");

slideContainer.innerHTML = people
  .map((person, slidesIndex) => {
    const { img, name, text } = person;
    let position = "next";
    if (slidesIndex === 0) {
      position = "active";
    }
    if (slidesIndex === people.length - 1) {
      position = "last";
    }

    return `<div class="customer-item ${position}">
<div class="div-border">
  <figure class="figure">
    <img src="${img}" alt="customer" />
    <h3 class="customer-name">${name}</h3>
    <p class="stars">
      <i class="fa-solid fa-star fa-yellow"></i>
      <i class="fa-solid fa-star fa-yellow"></i>
      <i class="fa-regular fa-star"></i
      ><i class="fa-regular fa-star"></i
      ><i class="fa-regular fa-star"></i
      >
    </p>
  </figure>
  <p class="customer-p">
   ${text}
  </p>
</div>
</div>`;
  })
  .join(" ");

const startSlider = (type) => {
  // get all three slides active,last next
  const active = document.querySelector(".active");
  const last = document.querySelector(".last");
  let next = active.nextElementSibling;
  if (!next) {
    next = slideContainer.firstElementChild;
  }
  active.classList.remove("active");
  last.classList.remove("last");
  next.classList.remove("next");

  if (type === "prev") {
    active.classList.add("next");
    last.classList.add("active");
    next = last.previousElementSibling;
    if (!next) {
      next = slideContainer.lastElementChild;
    }
    next.classList.remove("next");
    next.classList.add("last");
    return;
  }
  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
};
nextButton.addEventListener("click", () => {
  startSlider();
});
prevButton.addEventListener("click", () => {
  startSlider("prev");
});
// what other say ends

// latest slider (last slider) Musa
// latestSlideBtn

const lastCarousel = document.querySelector(".lastCarousel");
const latestSlideBtn = document.querySelectorAll(".latestSlideBtn");
const lastCardWith = lastCarousel.querySelector(".latest-card").offsetWidth;

// Add event listeners for the arrow buttons to scroll the carousel left and right
latestSlideBtn.forEach((slidebtns) => {
  slidebtns.addEventListener("click", () => {
    lastCarousel.scrollLeft +=
      slidebtns.id === "left" ? -lastCardWith : lastCardWith;
  });
});
const lastdraggingStart = (e) => {
  isDragging = true;
  lastCarousel.classList.add("drag");
  startX = e.pageX;
  startScrollLeft = lastCarousel.scrollLeft;
};

const lastdraggingStop = () => {
  isDragging = false;
  lastCarousel.classList.remove("drag");
};
const lastdragging = (e) => {
  if (!isDragging) return;
  lastCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

lastCarousel.addEventListener("mousedown", lastdraggingStart);
lastCarousel.addEventListener("mousemove", lastdragging);
document.addEventListener("mouseup", lastdraggingStop);
