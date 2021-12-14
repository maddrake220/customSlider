const customSlider = (target, option) => {
  /* 이미지 로드 여부 */
  // 이미지에만 onload 하는 방법 -> 퍼포먼스 향상
  // async await 대체 가능
  const toBeLoaded = document.querySelectorAll(`${target} img`);
  let loadedImages = 0;
  toBeLoaded.forEach((image) => {
    image.onload = () => {
      loadedImages++;
      if (loadedImages === toBeLoaded.length) {
        innerName(target, option);
      } else {
        return;
      }
    };
  });

  // window.onload 방법 => window 모든 객체를 체크해서 퍼포먼스 낮음
  // window.onload = (function (target, option) {
  //   return () => {
  //     innerName(target, option);
  //   };
  // })(target, option);

  /* READY DOM */
  function innerName(target, option) {
    const slider = document.querySelector(target);
    slider.classList.add("slider");
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
    prev.href = "";
    moveButton.appendChild(prev);
    const next = document.createElement("a");
    next.classList.add("next");
    next.innerText = "다음";
    next.href = "";
    moveButton.appendChild(next);

    const slideLis = slider.querySelectorAll(`${target} > *`);
    slideLis.forEach((item) => {
      item.classList.add("slider_item");
    });

    // 옵션 예외처리와 셋팅
    const OPTION = ((option) => {
      const OPTION = { ...option };
      if (OPTION.speed <= 0) {
        throw new Error("option.speed: Need to set over 0");
      } else {
        return Object.freeze(OPTION);
      }
    })(option);

    let duration = OPTION.speed;
    const node = slideLis[0].cloneNode(true);
    const node2 = slideLis[slideLis.length - 1].cloneNode(true);
    slider.appendChild(node);
    slider.insertBefore(node2, slideLis[0]);
    const liWidth = slideLis[0].clientWidth;
    const newslideLis = slider.querySelectorAll(`${target} > *`);
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
      slider.style.transition = `transform ${duration}ms`;
      slider.style.transform = `translateX(${moveDist}px)`;
      if (focus === slideLis.length + 1) {
        setTimeout(() => {
          moveDist = -liWidth;
          slider.style.transition = "none";
          slider.style.transform = `translateX(${moveDist}px)`;
          focus = 1;
        }, duration);
      }
      if (focus === 0) {
        setTimeout(() => {
          moveDist = -liWidth * slideLis.length;
          slider.style.transition = "none";
          slider.style.transform = `translateX(${moveDist}px)`;
          focus = slideLis.length;
        }, duration);
      }
    });
  }
};
