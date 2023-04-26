import React, { useRef, useState } from "react";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";
import { css } from "@emotion/css";

type props = {
  items: JSX.Element[];
  styles?: React.CSSProperties;
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
  threshold: number | number[];
  disableScrollbar?: boolean;
};

const Slider: React.FC<props> = ({
  items,
  styles,
  buttonLeft,
  buttonRight,
  threshold,
  disableScrollbar,
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
        cancellable: false,
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
        cancellable: false,
      },
      function (_completed) {
        setDisabled(false);
      }
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
        }}
      >
        <button
          onClick={() => slideLeft()}
          disabled={disabled}
          style={{ display: "flex", width: "60px" }}
        >
          left
        </button>
        <div
          className={css`
            white-space: nowrap;
            overflow: scroll;
            width: 1200px;
            border: 1px solid black;

            ${disableScrollbar &&
            `
              -ms-overflow-style: none;
              scrollbar-width: none;
              
              &::-webkit-scrollbar {
                display: none;
              }
            `}
          `}
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
          disabled={disabled}
          style={{ display: "flex", width: "60px", justifySelf: "flex-end" }}
        >
          right
        </button>
      </div>
    </>
  );
};

export default Slider;
