import React from "react";
import { css } from "@emotion/css";
import { BsChevronLeft } from "react-icons/bs";

const ExButton: React.FC = () => {
  return (
    <>
      <button
        className={css`
          display: flex;
          align-items: center;
          padding-left: 7px;
          align-self: center;
          font-size: 40px;
          width: 45px;
          height: 100%;
          border: none;
          z-index: 10;
          margin-right: -50px;
          background-color: rgb(0, 0, 0, 0.5);
          cursor: pointer;
        `}
      >
        <BsChevronLeft />
      </button>
    </>
  );
};

export default ExButton;
