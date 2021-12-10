window.onload = () => {
  const kindWrap = document.querySelector(".kind_wrap");
  const slider = kindWrap.querySelector(".slider");
  const slideLis = slider.querySelectorAll("li");
  const moveButton = kindWrap.querySelector(".arrow");
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
};
