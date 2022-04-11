import React, { useState } from "react";
import lodash from "lodash";
import { useSwipeable } from "react-swipeable";
import "./Slider.scss";

export const Slider = ({ children }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  {
    /* change current slide by swipe */
  }
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => previousSlide(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  function nextSlide() {
    let newIndex = slideIndex + 1;
    if (newIndex > React.Children.count(children) - 1) {
      newIndex = 0;
    }
    currentSlide(newIndex);
  }

  function previousSlide() {
    let newIndex = slideIndex - 1;
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    }
    currentSlide(newIndex);
  }

  function currentSlide(n) {
    setSlideIndex(n);
  }

  return (
    <>
      <div className="slideshow-container" {...swipeHandlers}>
        {React.Children.map(children, (item, index) => {
          if (index === slideIndex) {
            return <div key={index}>{item}</div>;
          }
          return <></>;
        })}

        {/* Next and previous buttons */}
        <a
          className="prev text-decoration-none"
          onClick={() => previousSlide()}
        >
          &#10094;
        </a>
        <a className="next text-decoration-none" onClick={() => nextSlide()}>
          &#10095;
        </a>
      </div>
      <div className="text-center">
        {lodash.range(React.Children.count(children)).map((index) => {
          let active = "";
          if (index == slideIndex) {
            active = "active";
          }
          return (
            <span
              key={index}
              className={`dot ${active}`}
              onClick={() => currentSlide(index)}
            ></span>
          );
        })}
      </div>
    </>
  );
};
