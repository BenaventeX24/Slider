import React, { useEffect, useRef, useState, Children, ReactNode } from "react";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";
import SliderContainer from "./SliderContainer";
import ItemsContainer from "./ItemsContainer";
import { slideDirections } from "./utils";
import SliderButton from "./SliderButton";
import UserCustomButton from "./UserCustomButton";
import { CSSInterpolation } from "@emotion/css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type props = {
  children: ReactNode;
  threshold?: number | number[];
  spacing?: string;
  time?: number;
  styles?: React.CSSProperties;
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
  disableScrollbar?: boolean;
  width?: number;
  showButtons?: boolean;
  sliderContainerStyles?: CSSInterpolation;
  itemsContainerStyles?: CSSInterpolation;
};

type scrollTo = {
  to: number;
  direction: slideDirections;
};

const Slider: React.FC<props> = ({
  children,
  styles,
  spacing,
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
  const items = Children.toArray(children);
  const itemsRef = useRef<Array<SensorRef>>([]);

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
        setVisibleButtons={setVisibleButtons}
        sliderContainerStyles={sliderContainerStyles}
      >
        {buttonLeft ? (
          <UserCustomButton
            disabled={disableButtons}
            visible={visibleButtons}
            locked={lockSlide}
            onClick={slideLeft}
            direction={slideDirections.LEFT}
          >
            {buttonLeft}
          </UserCustomButton>
        ) : (
          <SliderButton
            disabled={disableButtons}
            visible={visibleButtons}
            locked={lockSlide}
            onClick={slideLeft}
            direction={slideDirections.LEFT}
          >
            <BsChevronLeft />
          </SliderButton>
        )}

        <ItemsContainer
          width={width}
          disableScrollbar={disableScrollbar}
          itemsContainerStyles={itemsContainerStyles}
        >
          {items.map((item, index) => (
            <Sensor
              spacing={spacing}
              key={index}
              threshold={threshold ? threshold : 1}
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
          <UserCustomButton
            disabled={disableButtons}
            visible={visibleButtons}
            locked={lockSlide}
            onClick={slideRight}
            direction={slideDirections.RIGHT}
          >
            {buttonRight}
          </UserCustomButton>
        ) : (
          <SliderButton
            disabled={disableButtons}
            visible={visibleButtons}
            locked={lockSlide}
            onClick={slideRight}
            direction={slideDirections.RIGHT}
          >
            <BsChevronRight />
          </SliderButton>
        )}
      </SliderContainer>
    </>
  );
};

export default Slider;
