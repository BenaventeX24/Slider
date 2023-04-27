import React, { useRef, useState } from "react";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";
import { CSSInterpolation, css } from "@emotion/css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type props = {
  items: JSX.Element[];
  threshold: number | number[];
  time?: number;
  styles?: React.CSSProperties;
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
  disableScrollbar?: boolean;
  width?: number;
  sliderContainerStyles?: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
  };
  itemsContainerStyles?: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
  };
};

const Slider: React.FC<props> = ({
  items,
  styles,
  buttonLeft,
  buttonRight,
  threshold,
  time,
  disableScrollbar,
  width,
  sliderContainerStyles,
  itemsContainerStyles,
}: props) => {
  const innerWidth = width ? `${width}px` : `1200px`;

  const itemsRef = useRef<Array<SensorRef>>([]);

  const [disableLeftButton, setDisableLeftButton] = useState<boolean>(true);
  const [disableRightButton, setDisableRightButton] = useState<boolean>(false);
  const [visibleButtons, setVisibleButtons] = useState<boolean>(false);

  // const [showButtonsOnHover, setShowButtonsOnHover] = useState<boolean>(false);
  // const [leftButtonDisplay, setLeftButtonDisplay] = useState<boolean>(false);
  // const [rightButtonDisplay, setRightButtonDisplay] = useState<boolean>(true);

  const slideRight = () => {
    let scrollTo = 0;
    setDisableLeftButton(true);
    setDisableRightButton(true);

    itemsRef.current.forEach((item, index) => {
      if (
        item.isVisible &&
        (itemsRef.current[index + 1]?.isVisible === false ||
          itemsRef.current[index + 1]?.isVisible === undefined)
      )
        scrollTo = index + 1;
    });

    if (scrollTo > itemsRef.current.length - 1)
      scrollTo = itemsRef.current.length - 1;

    scrollIntoView(
      itemsRef.current[scrollTo],
      {
        time: time ? time : 350,
        align: { left: 0.001, lockY: true },
        cancellable: false,
      },
      function (_completed) {
        if (itemsRef.current[itemsRef.current.length - 1]?.isVisible)
          setDisableRightButton(true);
        else setDisableRightButton(false);
        setDisableLeftButton(false);
      }
    );
  };

  const slideLeft = () => {
    let visibleItems = 0;
    let firstVisibleItem = 0;
    let scrollTo = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (item.isVisible && itemsRef.current[index - 1]?.isVisible === false) {
        firstVisibleItem = index;
      }
    });

    scrollTo = firstVisibleItem - visibleItems;
    if (scrollTo < 0) scrollTo = 0;

    scrollIntoView(
      itemsRef.current[scrollTo],
      {
        time: 2000,
        align: { left: 0.001, lockY: true },
        cancellable: false,
      },
      function (_completed) {
        if (itemsRef.current[0]?.isVisible) setDisableLeftButton(true);
        else setDisableLeftButton(false);
        setDisableRightButton(false);
      }
    );
  };

  return (
    <>
      <div
        className={`${css`
          display: flex;
        `} ${sliderContainerStyles}`}
        onMouseOver={() => setVisibleButtons(true)}
        onMouseOut={() => setVisibleButtons(false)}
      >
        <button
          onClick={() => slideLeft()}
          disabled={disableLeftButton}
          className={css`
            display: flex;
            align-items: center;
            padding-right: 7px;
            align-self: center;
            font-size: 40px;
            width: 45px;
            height: 45px;
            border-radius: 50%;

            margin-right: -25px;
            z-index: 10;

            background-color: #fff;
            border: 1px solid gray;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

            cursor: pointer;

            visibility: ${!disableLeftButton && visibleButtons
              ? "visible"
              : "hidden"};
          `}
        >
          <BsChevronLeft />
        </button>
        <div
          className={`${css`
            white-space: nowrap;
            overflow: scroll;
            width: ${innerWidth};

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
          {items.map((item, index) => (
            <Sensor
              key={index}
              threshold={threshold}
              ref={(element: SensorRef) => {
                itemsRef.current[index] = element;
              }}
            >
              {(isVisible: boolean) => {
                if (itemsRef.current[index])
                  itemsRef.current[index].isVisible = isVisible;
                return item;
              }}
            </Sensor>
          ))}
        </div>
        <button
          onClick={() => slideRight()}
          disabled={disableRightButton}
          className={css`
            display: flex;
            align-items: center;
            padding-left: 7px;
            align-self: center;
            font-size: 40px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: none;
            margin-left: -25px;
            z-index: 10;
            background-color: #fff;
            border: 1px solid gray;
            box-shadow: 0.5px 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;

            visibility: ${!disableRightButton && visibleButtons
              ? "visible"
              : "hidden"};
          `}
        >
          <BsChevronRight />
        </button>
      </div>
    </>
  );
};

export default Slider;
