import { css } from "@emotion/css";
import React from "react";
import { slideDirections } from "./utils";

type props = {
  disabled: boolean;
  visible: boolean;
  locked: string;
  onClick: () => void;
  children?: JSX.Element;
  direction: slideDirections;
  disappearingButtons: boolean;
};

const UserCustomButton: React.FC<props> = ({
  disabled,
  visible,
  locked,
  onClick,
  children,
  direction,
  disappearingButtons,
}: props) => {
  return (
    <div
      onClick={() => onClick()}
      className={css`
        position: relative;
        background-color: transparent;
        border: 0;
        padding: 0;
        z-index: 10;

        & button {
          transition: visibility 0.5s, opacity 0.5s;

          ${disappearingButtons &&
          `
          visibility: ${
            !locked.includes(direction) && visible ? "visible" : "hidden"
          };
          opacity: ${!locked.includes(direction) && visible ? "1" : "0"};
          pointer-events: ${
            !locked.includes(direction) && visible && !disabled
              ? "auto"
              : "none"
          };
            `}
        }
      `}
    >
      {children}
    </div>
  );
};

export default UserCustomButton;
