import React from "react";
import { css } from "@emotion/css";
import { BsChevronLeft } from "react-icons/bs";

type props = {
  disableButtons: boolean;
  visibleButtons: boolean;
  lockSlide: string;
  slideLeft: () => void;
};

const LeftButton: React.FC<props> = ({
  disableButtons,
  visibleButtons,
  lockSlide,
  slideLeft,
}: props) => {
  return (
    <>
      <button
        onClick={() => slideLeft()}
        disabled={disableButtons}
        className={css`
          display: flex;
          align-items: center;
          padding-right: 7px;
          align-self: center;
          font-size: 40px;
          width: 45px;
          height: 45px;
          border-radius: 50%;

          margin-right: -25px;
          z-index: 10;

          background-color: #fff;
          border: 1px solid gray;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

          cursor: pointer;

          transition: visibility 0.5s, opacity 0.5s;

          visibility: ${!lockSlide.includes("left") && visibleButtons
            ? "visible"
            : "hidden"};
          opacity: ${!lockSlide.includes("left") && visibleButtons ? "1" : "0"};
          pointer-events: ${!lockSlide.includes("left") && visibleButtons
            ? "auto"
            : "none"};
        `}
      >
        <BsChevronLeft />
      </button>
    </>
  );
};

export default LeftButton;
