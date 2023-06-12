import React, { useEffect, useRef, useState, Children, ReactNode } from "react";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";
import SliderContainer from "./SliderContainer";
import ItemsContainer from "./ItemsContainer";
import { slideDirections } from "./utils";
import SliderButton from "./SliderButton";
import UserCustomButton from "./UserCustomButton";
import { CSSInterpolation } from "@emotion/css";

type props = {
  id?: string;
  children: ReactNode;
  threshold?: number;
  spacing?: string;
  time?: number;
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
  buttonLeftStyles?: CSSInterpolation;
  buttonRightStyles?: CSSInterpolation;
  disableScrollbar?: boolean;
  width?: string;
  showButtons?: boolean;
  outerContainerStyles?: CSSInterpolation;
  innerContainerStyles?: CSSInterpolation;
  disappearingButtons?: boolean;
};

type scrollTo = {
  to: number;
  direction: slideDirections;
};

const errorMessage =
  "Sensor was unable to detect visible items. Try reducing threshold, increasing slider's width or reducing item's width";

const Slider: React.FC<props> = ({
  id,
  children,
  threshold,
  spacing,
  buttonLeft,
  buttonRight,
  time,
  width,
  outerContainerStyles,
  innerContainerStyles,
  buttonLeftStyles,
  buttonRightStyles,
  disableScrollbar = false,
  showButtons = true,
  disappearingButtons = true,
}: props) => {
  const itemsRef = useRef<Array<SensorRef>>([]);

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

      if (itemsRef.current[0]?.inView === true) {
        setLockSlide(slideDirections.LEFT);
      }
      if (itemsRef.current[itemsRef.current.length - 1]?.inView === true)
        setLockSlide(slideDirections.RIGHT);
      if (
        itemsRef.current[0]?.inView === true &&
        itemsRef.current[itemsRef.current.length - 1]?.inView === true
      )
        setLockSlide(slideDirections.BOTH);
    }, 0);
  };

  useEffect(() => {
    setDisableButtons(true);
    //const align = scrollTo.direction === slideDirections.RIGHT ? 0.001 : 1;

    scrollIntoView(
      itemsRef.current[scrollTo.to],
      {
        time: time ? time : 350,
        align: { left: 0.001, lockY: true },
        cancellable: false,
      },
      function (_completed) {
        setDisableButtons(false);
        evaluteButtonsLock();
      }
    );
  }, [scrollTo, time]);

  useEffect(() => {
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
      if (item.inView) visibleItems++;

      if (
        item.inView &&
        (itemsRef.current[index + 1]?.inView === false ||
          itemsRef.current[index + 1]?.inView === undefined)
      )
        scrollToRight = index + 1;
    });

    if (scrollToRight + visibleItems >= itemsRef.current.length)
      setLockSlide(slideDirections.RIGHT);

    if (visibleItems === 0) console.error(errorMessage);

    setScrollTo({ to: scrollToRight, direction: slideDirections.RIGHT });
  };

  const slideLeft = () => {
    setLockSlide(slideDirections.NONE);

    let firstVisibleItem = 0;
    let scrollToLeft = 0;
    let visibleItems = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.inView) visibleItems++;
      if (item.inView && itemsRef.current[index - 1]?.inView === false) {
        firstVisibleItem = index;
      }
    });

    scrollToLeft = firstVisibleItem - visibleItems;

    if (scrollToLeft <= 0) {
      setLockSlide(slideDirections.LEFT);
      scrollToLeft = 0;
    }

    if (visibleItems === 0) console.error(errorMessage);

    setScrollTo({
      to: scrollToLeft,
      direction: slideDirections.LEFT,
    });
  };

  return (
    <>
      <SliderContainer
        id={id}
        width={width}
        setVisibleButtons={setVisibleButtons}
        outerContainerStyles={outerContainerStyles}
      >
        {buttonLeft && showButtons ? (
          <UserCustomButton
            disappearingButtons={disappearingButtons}
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
            disappearingButtons={disappearingButtons}
            disabled={disableButtons}
            visible={visibleButtons}
            locked={lockSlide}
            onClick={slideLeft}
            styles={buttonLeftStyles}
            direction={slideDirections.LEFT}
          />
        )}
        <ItemsContainer
          disableScrollbar={disableScrollbar}
          innerContainerStyles={innerContainerStyles}
        >
          {Children.toArray(children).map((item, index) => (
            <Sensor
              spacing={spacing}
              threshold={threshold}
              key={index}
              ref={(element: SensorRef) => {
                itemsRef.current[index] = element;
              }}
            >
              {(inView: boolean) => {
                if (itemsRef.current[index]) {
                  itemsRef.current[index].inView = inView;
                  evaluteButtonsLock();
                }
                return item;
              }}
            </Sensor>
          ))}
        </ItemsContainer>
        {buttonLeft && showButtons ? (
          <UserCustomButton
            disappearingButtons={disappearingButtons}
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
            disappearingButtons={disappearingButtons}
            disabled={disableButtons}
            visible={visibleButtons}
            locked={lockSlide}
            onClick={slideRight}
            styles={buttonRightStyles}
            direction={slideDirections.RIGHT}
          />
        )}
      </SliderContainer>
    </>
  );
};

export default Slider;
