import React from "react";
import { css } from "@emotion/css";
import { BsChevronRight } from "react-icons/bs";

type props = {
  disableButtons: boolean;
  visibleButtons: boolean;
  lockSlide: string;
  slideRight: () => void;
};

const RightButton: React.FC<props> = ({
  disableButtons,
  visibleButtons,
  lockSlide,
  slideRight,
}: props) => {
  return (
    <>
      <button
        onClick={() => slideRight()}
        disabled={disableButtons}
        className={css`
          display: flex;
          align-items: center;
          padding-left: 7px;
          align-self: center;
          font-size: 40px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: none;
          margin-left: -25px;
          z-index: 10;
          background-color: #fff;
          border: 1px solid gray;
          box-shadow: 0.5px 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;

          transition: visibility 0.5s, opacity 0.5s;

          visibility: ${!lockSlide.includes("right") && visibleButtons
            ? "visible"
            : "hidden"};
          opacity: ${!lockSlide.includes("right") && visibleButtons
            ? "1"
            : "0"};
          pointer-events: ${!lockSlide.includes("right") && visibleButtons
            ? "auto"
            : "none"};
        `}
      >
        <BsChevronRight />
      </button>
    </>
  );
};

export default RightButton;
