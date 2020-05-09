window.onbeforeunload = function () {
  currentIndex = 0;
  this.setCurrentPage();
  this.setButtons();
  this.setAllEventListeners();
  window.scroll({
    top: 0
  });
}

const pages = [
  'page-1',
  'page-2',
  'page-3',
  'page-4'
]
let currentIndex = 0;
window.location.replace('#' + pages[currentIndex])
// window.location.href = '#' + pages[currentIndex]
let currentPage;
setCurrentPage();

let nextBtn;
let prevBtn;
setButtons();

setAllEventListeners();

let heading;
let paragraph;
setMovableElements();

function setCurrentPage() {
  currentPage = document.getElementById(pages[currentPage]);
}

function nextPage() {
  console.log(currentIndex)
  currentIndex += 1;
  console.log(currentIndex)
  setCurrentPage();
  setButtons();
}

function prevPage() {
  currentIndex --;
  setCurrentPage();
  setButtons();
}

function setButtons() {
  if (pages.length === (currentIndex + 1)) {
    nextBtn = null;
    setPrevBtn();
  } else if (currentIndex === 0) {
    setNextBtn();
    prevBtn = null;
  } else {
    setNextBtn();
    setPrevBtn();
  }
  setAllEventListeners();
}

function setNextBtn() {
  nextBtn = document.querySelector('#' + pages[currentIndex] + ' .next-btn');
}

function setPrevBtn() {
  prevBtn = document.querySelector('#' + pages[currentIndex] + ' .prev-btn');
}

function setMovableElements() {
  heading = document.querySelector('#' + pages[currentIndex] + ' h1');
  paragraph = document.querySelector('#' + pages[currentIndex] + ' p');
  moveItems();
}

function setAllEventListeners() {
  if (!(nextBtn === null)) {
    nextBtn.addEventListener("mouseup", function(event) {
      eventHandler("next");
    });
  }
  if (!(prevBtn === null)) {
    prevBtn.addEventListener("click", function(event) {
      eventHandler("prev");
    });
  }
}

function eventHandler(direction) {
  if (direction === "next") {
    nextPage();
  }
  if (direction === "prev") {
    prevPage();
  }
  setMovableElements();
}

function moveItems() {
  moveHeading();
  moveParagraph();
}

function moveHeading() {
  heading.animate([
    { transform: 'translateX(1500px)' },
    { transform: 'translateX(0px)' }
  ], {
    duration: 2000,
    easing: 'ease-out'
  });
}

function moveParagraph() {
  paragraph.animate([
    { transform: 'translateX(-1500px)' },
    { transform: 'translateX(0px)' }
  ], {
    duration: 2000,
    easing: 'ease-out'
  });
}
