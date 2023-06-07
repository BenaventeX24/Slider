import React from "react";
import { CSSInterpolation, css } from "@emotion/css";

type props = {
  children: React.ReactNode;
  width?: string;
  disableScrollbar?: boolean;
  innerContainerStyles?: CSSInterpolation;
};

const ItemsContainer: React.FC<props> = ({
  children,
  width,
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

          ${width
            ? { width }
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
        `} ${innerContainerStyles}`}
      >
        {children}
      </div>
    </>
  );
};

export default ItemsContainer;
