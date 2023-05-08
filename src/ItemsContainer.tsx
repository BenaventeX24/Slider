import React from "react";
import { CSSInterpolation, css } from "@emotion/css";

type props = {
  children: React.ReactNode;
  width?: number;
  disableScrollbar?: boolean;
  itemsContainerStyles?: CSSInterpolation;
};

const ItemsContainer: React.FC<props> = ({
  children,
  width,
  disableScrollbar,
  itemsContainerStyles,
}: props) => {
  return (
    <>
      <div
        className={`${css`
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;

          ${width
            ? `${width}px`
            : `
              width: 1200px;

              @media (max-width: 1300px) {
                width: 900px;
              }
  
              @media (max-width: 960px) {
                width: 600px;
              }

              @media (max-width: 668px) {
                width: 400px;
              }

              @media (max-width: 420px) {
                width: 300px;
              }

              @media (max-width: 320px) {
                width: 260px;
              }

              `}

          ${disableScrollbar &&
          `
              -ms-overflow-style: none;
              scrollbar-width: none;
              
              &::-webkit-scrollbar {
                display: none;
              }
            `}
        `} ${itemsContainerStyles}`}
      >
        {children}
      </div>
    </>
  );
};

export default ItemsContainer;
