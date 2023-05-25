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
  children: ReactNode;
  threshold?: number | number[];
  spacing?: string;
  time?: number;
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
  buttonLeftStyles?: CSSInterpolation;
  buttonRightStyles?: CSSInterpolation;
  disableScrollbar?: boolean;
  width?: number;
  showButtons?: boolean;
  outterContainerStyles?: CSSInterpolation;
  innerContainerStyles?: CSSInterpolation;
  disappearingButtons?: boolean;
};

type scrollTo = {
  to: number;
  direction: slideDirections;
};

const Slider: React.FC<props> = ({
  children,
  spacing,
  buttonLeft,
  buttonRight,
  threshold,
  time,
  width,
  outterContainerStyles,
  innerContainerStyles,
  buttonLeftStyles,
  buttonRightStyles,
  disableScrollbar = false,
  showButtons = true,
  disappearingButtons = true,
}: props) => {
  const itemsRef = useRef<Array<SensorRef>>([]);
  //const items = useMemo(() => Children.toArray(children), [children]);

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

  console.log(itemsRef);

  return (
    <>
      <SliderContainer
        setVisibleButtons={setVisibleButtons}
        outterContainerStyles={outterContainerStyles}
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
          width={width}
          disableScrollbar={disableScrollbar}
          innerContainerStyles={innerContainerStyles}
        >
          {Children.toArray(children).map((item, index) => (
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
