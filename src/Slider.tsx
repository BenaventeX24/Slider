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
  const itemsRef = useRef<Array<SensorRef>>([]);

  const [disableLeftButton, setDisableLeftButton] = useState<boolean>(true);
  const [disableRightButton, setDisableRightButton] = useState<boolean>(false);
  const [visibleButtons, setVisibleButtons] = useState<boolean>(false);

  const slideRight = () => {
    setDisableLeftButton(true);
    setDisableRightButton(true);

    let scrollTo = 0;
    let visibleItems = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (
        item.isVisible &&
        (itemsRef.current[index + 1]?.isVisible === false ||
          itemsRef.current[index + 1]?.isVisible === undefined)
      )
        scrollTo = index + 1;
    });

    /*if (scrollTo > itemsRef.current.length - 1)
      scrollTo = itemsRef.current.length - 1;*/

    /*if (scrollTo + visibleItems >= itemsRef.current.length - 1)
      reachedMaxScroll = true;*/

    scrollIntoView(
      itemsRef.current[scrollTo],
      {
        time: time ? time : 350,
        align: { left: 0.001, lockY: true },
        cancellable: false,
      },
      function (_completed) {
        if (scrollTo + visibleItems < itemsRef.current.length - 1)
          setDisableRightButton(false);
        setDisableLeftButton(false);
      }
    );
  };

  const slideLeft = () => {
    setDisableLeftButton(true);
    setDisableRightButton(true);

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
        time: time ? time : 350,
        align: { left: 0.001, lockY: true },
        cancellable: false,
      },
      function (_completed) {
        if (scrollTo !== 0) setDisableLeftButton(false);
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

            transition: visibility 0.5s, opacity 0.5s;

            visibility: ${!disableLeftButton && visibleButtons
              ? "visible"
              : "hidden"};
            opacity: ${!disableLeftButton && visibleButtons ? "1" : "0"};
            pointer-events: ${!disableLeftButton && visibleButtons
              ? "auto"
              : "none"};
          `}
        >
          <BsChevronLeft />
        </button>
        <div
          className={`${css`
            white-space: nowrap;
            overflow: scroll;
            width: ${width ? `${width}px` : `1200px`};

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

            transition: visibility 0.5s, opacity 0.5s;

            visibility: ${!disableRightButton && visibleButtons
              ? "visible"
              : "hidden"};
            opacity: ${!disableRightButton && visibleButtons ? "1" : "0"};
            pointer-events: ${!disableRightButton && visibleButtons
              ? "auto"
              : "none"};
          `}
        >
          <BsChevronRight />
        </button>
      </div>
    </>
  );
};

export default Slider;
