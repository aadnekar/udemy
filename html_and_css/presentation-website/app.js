window.onbeforeunload = function () {
  moveElements();
  window.scroll({
    top: 0
  });
}


const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");
const paragraphs = document.querySelectorAll("p");
const headings = document.querySelectorAll("h1");


nextButtons.forEach(btn => {
  btn.addEventListener('click', moveElements);
});

prevButtons.forEach(btn => {
  btn.addEventListener('click', moveElements);
});

function moveElements() {
  paragraphs.forEach(paragraph => {
    moveParagraph(paragraph);
  });
  headings.forEach(heading => {
    moveHeading(heading);
  })
}

function moveHeading(heading) {
  heading.animate([
    { transform: 'translateX(1500px)' },
    { transform: 'translateX(0px)' }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
}

function moveParagraph(paragraph) {
  paragraph.animate([
    { transform: 'translateX(-1500px)' },
    { transform: 'translateX(0px)' }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
}
