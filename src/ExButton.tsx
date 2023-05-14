import React from "react";
import { css } from "@emotion/css";
import { BsChevronLeft } from "react-icons/bs";

const ExButton: React.FC = () => {
  return (
    <>
      <button
        className={css`
          display: flex;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -25px;
          cursor: pointer;
          align-items: center;
          padding-right: 7px;
          align-self: center;
          justify-self: center;

          font-size: 40px;
          width: 45px;
          height: 45px;
          border-radius: 50%;

          z-index: 10;

          background-color: #fff;
          border: 1px solid gray;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        `}
      >
        <BsChevronLeft />
      </button>
    </>
  );
};

export default ExButton;
