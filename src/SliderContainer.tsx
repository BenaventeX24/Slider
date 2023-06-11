import React from "react";
import { CSSInterpolation, css } from "@emotion/css";

type props = {
  id?: string;
  children: React.ReactNode;
  setVisibleButtons: React.Dispatch<React.SetStateAction<boolean>>;
  outerContainerStyles?: CSSInterpolation;
};

const SliderContainer: React.FC<props> = ({
  id,
  children,
  outerContainerStyles,
  setVisibleButtons,
}: props) => {
  function isTouchableDevice() {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
  }
  return (
    <>
      <div
        id={id}
        className={`${css`
          display: flex;
        `} ${outerContainerStyles}`}
        onMouseOver={() => !isTouchableDevice() && setVisibleButtons(true)}
        onMouseOut={() => !isTouchableDevice() && setVisibleButtons(false)}
      >
        {children}
      </div>
    </>
  );
};

export default SliderContainer;
