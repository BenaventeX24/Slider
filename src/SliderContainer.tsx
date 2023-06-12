import React from "react";
import { CSSInterpolation, css } from "@emotion/css";

type props = {
  id?: string;
  width?: string;
  children: React.ReactNode;
  setVisibleButtons: React.Dispatch<React.SetStateAction<boolean>>;
  outerContainerStyles?: CSSInterpolation;
};

const SliderContainer: React.FC<props> = ({
  id,
  width,
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
          position: relative;
          display: flex;

          ${width
            ? { width }
            : `
              width: 1200px;

              @media (max-width: 1300px) {
                width: 900px;
              }
  
              @media (max-width: 960px) {
                width: 600px;
              }

              @media (max-width: 668px) {
                width: 400px;
              }

              @media (max-width: 420px) {
                width: 300px;
              }

              @media (max-width: 320px) {
                width: 260px;
              }

              `}
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
