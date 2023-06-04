import React, { useRef } from "react";
import { CSSInterpolation, css } from "@emotion/css";
import { slideDirections } from "./utils";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type props = {
  disabled: boolean;
  visible: boolean;
  locked: string;
  onClick: () => void;
  direction: slideDirections;
  disappearingButtons: boolean;
  styles?: CSSInterpolation;
};

const LeftButton: React.FC<props> = ({
  disabled,
  visible,
  locked,
  onClick,
  direction,
  disappearingButtons,
  styles,
}: props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const innerWidth = ref.current?.offsetWidth;

  return (
    <>
      <button
        onClick={() => onClick()}
        disabled={disabled}
        ref={ref}
        className={css`
          display: flex;
          align-items: center;
          padding-right: ${direction.includes(slideDirections.LEFT) && "8px"};
          margin-right: ${direction.includes(slideDirections.LEFT) &&
          innerWidth &&
          -Math.abs(innerWidth / 2) + "px"};
          padding-left: ${direction.includes(slideDirections.RIGHT) && "8px"};
          margin-left: ${direction.includes(slideDirections.RIGHT) &&
          innerWidth &&
          -Math.abs(innerWidth / 2) + "px"};
          align-self: center;
          font-size: 40px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;

          z-index: 10;

          background-color: #fff;
          border: 1px solid gray;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

          transition: visibility 0.5s, opacity 0.5s;

          ${disappearingButtons &&
          `
          visibility: ${
            !locked.includes(direction) && visible ? "visible" : "hidden"
          };
          opacity: ${!locked.includes(direction) && visible ? "1" : "0"};
          pointer-events: ${
            !locked.includes(direction) && visible ? "auto" : "none"
          };
            `}
          ${styles}
        `}
      >
        {direction.includes(slideDirections.LEFT) ? (
          <BsChevronLeft />
        ) : (
          <BsChevronRight />
        )}
      </button>
    </>
  );
};

export default LeftButton;
