import React from "react";
import { css } from "@emotion/css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { slideDirections } from "./utils";

type props = {
  disableButtons: boolean;
  visibleButtons: boolean;
  lockSlide: string;
  slideFunction: () => void;
  direction: slideDirections;
};

const LeftButton: React.FC<props> = ({
  disableButtons,
  visibleButtons,
  lockSlide,
  slideFunction,
  direction,
}: props) => {
  return (
    <>
      <button
        onClick={() => slideFunction()}
        disabled={disableButtons}
        className={css`
          display: flex;
          align-items: center;
          padding-right: ${direction.includes(slideDirections.LEFT) && "8px"};
          padding-left: ${direction.includes(slideDirections.RIGHT) && "8px"};
          align-self: center;
          font-size: 40px;
          width: 45px;
          height: 45px;
          border-radius: 50%;

          margin-right: ${direction.includes(slideDirections.LEFT) && "-25px"};
          margin-left: ${direction.includes(slideDirections.RIGHT) && "-25px"};
          z-index: 10;

          background-color: #fff;
          border: 1px solid gray;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

          transition: visibility 0.5s, opacity 0.5s;

          visibility: ${!lockSlide.includes(direction) && visibleButtons
            ? "visible"
            : "hidden"};
          opacity: ${!lockSlide.includes(direction) && visibleButtons
            ? "1"
            : "0"};
          pointer-events: ${!lockSlide.includes(direction) && visibleButtons
            ? "auto"
            : "none"};
        `}
      >
        {direction.includes(slideDirections.LEFT) && <BsChevronLeft />}
        {direction.includes(slideDirections.RIGHT) && <BsChevronRight />}
      </button>
    </>
  );
};

export default LeftButton;
