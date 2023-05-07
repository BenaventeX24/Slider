import { css } from "@emotion/css";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Box: React.FC<Props> = ({ children }: Props) => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        border: 1px solid black;
        background-color: aqua;
      `}
    >
      {children}
    </div>
  );
};

export default Box;
