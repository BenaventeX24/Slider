import React, { ReactNode } from "react";
import { css } from "@emotion/css";
import { slideDirections } from "./utils";

type props = {
  children: ReactNode;
  disabled: boolean;
  visible: boolean;
  locked: string;
  onClick: () => void;
  direction: slideDirections;
};

const LeftButton: React.FC<props> = ({
  children,
  disabled,
  visible,
  locked,
  onClick,
  direction,
}: props) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        disabled={disabled}
        className={css`
          display: flex;
          align-items: center;
          padding-right: ${direction.includes(slideDirections.LEFT) && "8px"};
          margin-right: ${direction.includes(slideDirections.LEFT) && "-25px"};
          padding-left: ${direction.includes(slideDirections.RIGHT) && "8px"};
          margin-left: ${direction.includes(slideDirections.RIGHT) && "-25px"};
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

          visibility: ${!locked.includes(direction) && visible
            ? "visible"
            : "hidden"};
          opacity: ${!locked.includes(direction) && visible ? "1" : "0"};
          pointer-events: ${!locked.includes(direction) && visible
            ? "auto"
            : "none"};
        `}
      >
        {children}
      </button>
    </>
  );
};

export default LeftButton;
