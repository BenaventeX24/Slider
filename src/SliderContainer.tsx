import React from "react";
import { CSSInterpolation, css } from "@emotion/css";

type props = {
  children: React.ReactNode;
  setVisibleButtons: React.Dispatch<React.SetStateAction<boolean>>;
  sliderContainerStyles?: CSSInterpolation;
};

const SliderContainer: React.FC<props> = ({
  children,
  sliderContainerStyles,
  setVisibleButtons,
}: props) => {
  function isTouchableDevice() {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
  }
  return (
    <>
      <div
        className={`${css`
          display: flex;
        `} ${sliderContainerStyles}`}
        onMouseOver={() => !isTouchableDevice() && setVisibleButtons(true)}
        onMouseOut={() => !isTouchableDevice() && setVisibleButtons(false)}
      >
        {children}
      </div>
    </>
  );
};

export default SliderContainer;
