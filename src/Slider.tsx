import React, { useEffect, useRef, useState } from "react";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";
import { CSSInterpolation, css } from "@emotion/css";
import SliderContainer from "./SliderContainer";
import LeftButton from "./LeftButton";
import ItemsContainer from "./ItemsContainer";
import RightButton from "./RightButton";

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

  function isTouchableDevice() {
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
      <SliderContainer
        isTouchableDevice={isTouchableDevice}
        setVisibleButtons={setVisibleButtons}
        sliderContainerStyles={sliderContainerStyles}
      >
        {buttonLeft ? (
          <div
            onClick={() => slideLeft()}
            className={css`
              background-color: transparent;
              border: 0;
              padding: 0;
              z-index: 10;
              transition: visibility 0.5s, opacity 0.5s;

              visibility: ${!lockSlide.includes("left") && visibleButtons
                ? "visible"
                : "hidden"};
              opacity: ${!lockSlide.includes("left") && visibleButtons
                ? "1"
                : "0"};
              pointer-events: ${!lockSlide.includes("left") &&
              visibleButtons &&
              !disableButtons
                ? "auto"
                : "none"};
            `}
          >
            {buttonLeft}
          </div>
        ) : (
          <LeftButton
            disableButtons={disableButtons}
            visibleButtons={visibleButtons}
            lockSlide={lockSlide}
            slideLeft={slideLeft}
          />
        )}

        <ItemsContainer
          width={width}
          disableScrollbar={disableScrollbar}
          itemsContainerStyles={itemsContainerStyles}
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
        </ItemsContainer>
        {buttonRight ? (
          <div
            onClick={() => slideLeft()}
            className={css`
              background-color: transparent;
              border: 0;
              padding: 0;
              z-index: 10;
              transition: visibility 0.5s, opacity 0.5s;

              visibility: ${!lockSlide.includes("right") && visibleButtons
                ? "visible"
                : "hidden"};
              opacity: ${!lockSlide.includes("right") && visibleButtons
                ? "1"
                : "0"};
              pointer-events: ${!lockSlide.includes("right") &&
              visibleButtons &&
              !disableButtons
                ? "auto"
                : "none"};
            `}
          >
            {buttonRight}
          </div>
        ) : (
          <RightButton
            disableButtons={disableButtons}
            visibleButtons={visibleButtons}
            lockSlide={lockSlide}
            slideRight={slideRight}
          />
        )}
      </SliderContainer>
    </>
  );
};

export default Slider;
