import React, { useEffect, useRef, useState } from "react";
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
  showButtons?: boolean;
  sliderContainerStyles?: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
  };
  itemsContainerStyles?: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
  };
};

enum slideDirections {
  LEFT = "left",
  RIGHT = "right",
  NONE = "",
  BOTH = "left right",
}

type scrollTo = {
  to: number;
  direction: slideDirections;
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
  showButtons,
  sliderContainerStyles,
  itemsContainerStyles,
}: props) => {
  const itemsRef = useRef<Array<SensorRef>>([]);
  function isTouchDevice() {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
  }

  useEffect(() => {
    itemsRef.current.splice(items.length - 1);
  }, [items]);

  const [scrollTo, setScrollTo] = useState<scrollTo>({
    to: 0,
    direction: slideDirections.LEFT,
  });

  const [disableButtons, setDisableButtons] = useState<boolean>(true);

  const [lockSlide, setLockSlide] = useState<slideDirections>(
    slideDirections.BOTH
  );

  const [visibleButtons, setVisibleButtons] = useState<boolean>(false);

  const evaluteButtonsLock = () => {
    setTimeout(() => {
      setLockSlide(slideDirections.NONE);

      if (itemsRef.current[0]?.isVisible === true) {
        setLockSlide(slideDirections.LEFT);
      }
      if (itemsRef.current[itemsRef.current.length - 1]?.isVisible === true)
        setLockSlide(slideDirections.RIGHT);
      if (
        itemsRef.current[0]?.isVisible === true &&
        itemsRef.current[itemsRef.current.length - 1]?.isVisible === true
      )
        setLockSlide(slideDirections.BOTH);
    }, 0);
  };

  useEffect(() => {
    setDisableButtons(true);
    const align = scrollTo.direction === slideDirections.RIGHT ? 0.001 : 1;

    scrollIntoView(
      itemsRef.current[scrollTo.to],
      {
        time: time ? time : 350,
        align: { left: align, lockY: true },
        cancellable: false,
      },
      function (_completed) {
        setDisableButtons(false);
        evaluteButtonsLock();
      }
    );
  }, [scrollTo, time, items]);

  useEffect(() => {
    /*const handleResize = () => {
      setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
      });
    }*/

    window.addEventListener("resize", evaluteButtonsLock);

    return () => {
      window.removeEventListener("resize", evaluteButtonsLock);
    };
  }, []);

  const slideRight = () => {
    setLockSlide(slideDirections.NONE);

    let scrollToRight = 0;
    let visibleItems = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (
        item.isVisible &&
        (itemsRef.current[index + 1]?.isVisible === false ||
          itemsRef.current[index + 1]?.isVisible === undefined)
      )
        scrollToRight = index + 1;
    });

    if (scrollToRight + visibleItems >= itemsRef.current.length)
      setLockSlide(slideDirections.RIGHT);

    setScrollTo({ to: scrollToRight, direction: slideDirections.RIGHT });
  };

  const slideLeft = () => {
    setLockSlide(slideDirections.NONE);

    let firstVisibleItem = 0;
    let scrollToLeft = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible && itemsRef.current[index - 1]?.isVisible === false) {
        firstVisibleItem = index;
      }
    });

    scrollToLeft = firstVisibleItem - 1;

    if (scrollToLeft <= 0) {
      setLockSlide(slideDirections.LEFT);
      scrollToLeft = 0;
    }

    setScrollTo({
      to: scrollToLeft,
      direction: slideDirections.LEFT,
    });
  };

  return (
    <>
      <div
        className={`${css`
          display: flex;
        `} ${sliderContainerStyles}`}
        onMouseOver={() => setVisibleButtons(!isTouchDevice())}
        onMouseOut={() => setVisibleButtons(false)}
      >
        <button
          onClick={() => slideLeft()}
          disabled={disableButtons}
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

            visibility: ${!lockSlide.includes("left") && visibleButtons
              ? "visible"
              : "hidden"};
            opacity: ${!lockSlide.includes("left") && visibleButtons
              ? "1"
              : "0"};
            pointer-events: ${!lockSlide.includes("left") && visibleButtons
              ? "auto"
              : "none"};
          `}
        >
          <BsChevronLeft />
        </button>
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
  
              @media (max-width: 768px) {
                width: 400px;
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
          {items.map((item, index) => (
            <Sensor
              key={index}
              threshold={threshold}
              ref={(element: SensorRef) => {
                itemsRef.current[index] = element;
              }}
            >
              {(isVisible: boolean) => {
                if (itemsRef.current[index]) {
                  itemsRef.current[index].isVisible = isVisible;
                  evaluteButtonsLock();
                }
                return item;
              }}
            </Sensor>
          ))}
        </div>
        <button
          onClick={() => slideRight()}
          disabled={disableButtons}
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

            visibility: ${!lockSlide.includes("right") && visibleButtons
              ? "visible"
              : "hidden"};
            opacity: ${!lockSlide.includes("right") && visibleButtons
              ? "1"
              : "0"};
            pointer-events: ${!lockSlide.includes("right") && visibleButtons
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
