const slider = document.querySelector(".slider");

// add parent div kindWrap
const parent = slider.parentNode;
const kindWrap = document.createElement("div");
kindWrap.classList.add("kind_wrap");
parent.replaceChild(kindWrap, slider);
kindWrap.appendChild(slider);
// add parent div kind_slider
const parent2 = slider.parentNode;
const kind_slider = document.createElement("div");
kind_slider.classList.add("kind_slider");
parent2.replaceChild(kind_slider, slider);
kind_slider.appendChild(slider);
// add child div moveButton
const moveButton = document.createElement("div");
moveButton.classList.add("arrow");
kindWrap.appendChild(moveButton);
// add child a prev and next
const prev = document.createElement("a");
prev.classList.add("prev");
prev.innerText = "이전";
moveButton.appendChild(prev);
const next = document.createElement("a");
next.classList.add("next");
next.innerText = "다음";
moveButton.appendChild(next);

const slideLis = slider.querySelectorAll("li");
let duration = "1000ms";
const node = slideLis[0].cloneNode(true);
const node2 = slideLis[slideLis.length - 1].cloneNode(true);
slider.appendChild(node);
slider.insertBefore(node2, slideLis[0]);
const liWidth = slideLis[0].clientWidth;
const newslideLis = slider.querySelectorAll("li");
const sliderWidth = liWidth * newslideLis.length;
slider.style.width = sliderWidth + "px";
let focus = 1;
let moveDist = -liWidth;
slider.style.transform = `translateX(${moveDist}px)`;
moveButton.addEventListener("click", (value) => {
  value.preventDefault();

  if (value.target.className === "next") {
    focus++;
    moveDist += -liWidth;
  } else {
    focus--;
    moveDist += liWidth;
  }
  slider.style.transition = `transform ${duration}`;
  slider.style.transform = `translateX(${moveDist}px)`;
  if (focus === slideLis.length + 1) {
    setTimeout(() => {
      moveDist = -liWidth;
      slider.style.transition = "none";
      slider.style.transform = `translateX(${moveDist}px)`;
      focus = 1;
    }, 1000);
  }
  if (focus === 0) {
    setTimeout(() => {
      moveDist = -liWidth * slideLis.length;
      slider.style.transition = "none";
      slider.style.transform = `translateX(${moveDist}px)`;
      focus = slideLis.length;
    }, 1000);
  }
});
