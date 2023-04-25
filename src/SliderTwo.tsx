import React, { useRef, useState } from "react";
import stylesModule from "./Slider.module.css";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";

type props = {
  items: JSX.Element[];
  styles?: React.CSSProperties;
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
};

const Slider: React.FC<props> = ({
  items,
  styles,
  buttonLeft,
  buttonRight,
}: props) => {
  const itemsRef = useRef<Array<SensorRef>>([]);

  const [disabled, setDisabled] = useState<boolean>(false);

  const slideRight = () => {
    setDisabled(true);

    let scrollTo = 0;

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
        time: 350,
        align: { left: 0.001, lockY: true },
      },
      function (_completed) {
        setDisabled(false);
      }
    );
  };

  const slideLeft = () => {
    setDisabled(true);

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
        time: 350,
        align: { left: 0.001, lockY: true },
      },
      function (_completed) {
        setDisabled(false);
      }
    );
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            whiteSpace: "nowrap",
            width: "1200px",
            overflow: "scroll",
            border: "1px solid black",
            margin: "20px 0",
          }}
        >
          {items.map((item, index) => (
            <Sensor
              itemId={index}
              key={index}
              ref={(element: SensorRef) => {
                itemsRef.current[index] = element;
              }}
            >
              {(isVisible: boolean, itemId: number) => {
                if (itemsRef.current[index])
                  itemsRef.current[index].isVisible = isVisible;
                return item;
              }}
            </Sensor>
          ))}
        </div>
        <button
          className={`${stylesModule.sliderButton} ${stylesModule.slideLeft}`}
          onClick={() => slideLeft()}
          disabled={disabled}
        >
          left
        </button>
        <button
          onClick={() => slideRight()}
          className={`${stylesModule.sliderButton} ${stylesModule.slideRight}`}
          disabled={disabled}
        >
          right
        </button>
      </div>
    </>
  );
};

export default Slider;
