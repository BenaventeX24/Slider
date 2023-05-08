import React from "react";
import { css } from "@emotion/css";

type props = {
  children: React.ReactNode;
  isTouchableDevice: () => boolean;
  setVisibleButtons: React.Dispatch<React.SetStateAction<boolean>>;
  sliderContainerStyles?: string;
};

const SliderContainer: React.FC<props> = ({
  children,
  sliderContainerStyles,
  setVisibleButtons,
  isTouchableDevice,
}: props) => {
  return (
    <>
      <div
        className={`${css`
          display: flex;
        `} ${sliderContainerStyles}`}
        onMouseOver={() => setVisibleButtons(!isTouchableDevice())}
        onMouseOut={() => setVisibleButtons(false)}
      >
        {children}
      </div>
    </>
  );
};

export default SliderContainer;
