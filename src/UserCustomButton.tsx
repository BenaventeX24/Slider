import { css } from "@emotion/css";
import React from "react";
import { slideDirections } from "./utils";

type props = {
  disableButtons: boolean;
  visibleButtons: boolean;
  lockSlide: string;
  slideFunction: () => void;
  children: JSX.Element;
  direction: slideDirections;
};

const UserCustomButton: React.FC<props> = ({
  disableButtons,
  visibleButtons,
  lockSlide,
  slideFunction,
  children,
  direction,
}: props) => {
  return (
    <div
      onClick={() => slideFunction()}
      className={css`
        position: relative;
        background-color: transparent;
        border: 0;
        padding: 0;
        z-index: 10;

        & button {
          transition: visibility 0.5s, opacity 0.5s;
          visibility: ${!lockSlide.includes(direction) && visibleButtons
            ? "visible"
            : "hidden"};
          opacity: ${!lockSlide.includes(direction) && visibleButtons
            ? "1"
            : "0"};
          pointer-events: ${!lockSlide.includes(direction) &&
          visibleButtons &&
          !disableButtons
            ? "auto"
            : "none"};
        }
      `}
    >
      {children}
    </div>
  );
};

export default UserCustomButton;
