import React from "react";
import { CSSInterpolation, css } from "@emotion/css";

type props = {
  children: React.ReactNode;
  disableScrollbar?: boolean;
  innerContainerStyles?: CSSInterpolation;
};

const ItemsContainer: React.FC<props> = ({
  children,
  disableScrollbar,
  innerContainerStyles,
}: props) => {
  return (
    <>
      <div
        className={`${css`
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;

          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }
          &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
          }
          &::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.4);
          }
          &::-webkit-scrollbar-thumb:active {
            background: rgba(124, 124, 124, 0.9);
          }

          ${disableScrollbar &&
          `
              -ms-overflow-style: none;
              scrollbar-width: none;
              
              &::-webkit-scrollbar {
                display: none;
              }
            `}
        `} ${innerContainerStyles}`}
      >
        {children}
      </div>
    </>
  );
};

export default ItemsContainer;
