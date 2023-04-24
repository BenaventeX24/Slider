import React, { useRef, useState } from "react";
import styles from "./Slider.module.css";
import Box from "./Box";
import Sensor, { SensorRef } from "./Sensor";
import scrollIntoView from "scroll-into-view";

const Slider: React.FC = () => {
  const itemsRef = useRef<Array<SensorRef>>([]);

  const items = [
    <Box>0</Box>,
    <Box>1</Box>,
    <Box>2</Box>,
    <Box>3</Box>,
    <Box>4</Box>,
    <Box>5</Box>,
    <Box>6</Box>,
    <Box>7</Box>,
    <Box>8</Box>,
    <Box>9</Box>,
    <Box>10</Box>,
    <Box>11</Box>,
    <Box>12</Box>,
    <Box>13</Box>,
    <Box>14</Box>,
    <Box>15</Box>,
    <Box>16</Box>,
    <Box>17</Box>,
    <Box>18</Box>,
    <Box>19</Box>,
    <Box>20</Box>,
    <Box>21</Box>,
    <Box>22</Box>,
  ];

  const [disabled, setDisabled] = useState<boolean>(false);

  const slideRight = () => {
    setDisabled(true);

    let visibleItems = 0;
    let scrollTo = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (
        item.isVisible &&
        (itemsRef.current[index + 1]?.isVisible === false ||
          itemsRef.current[index + 1]?.isVisible === undefined)
      )
        scrollTo = index + 1;
    });

    if (scrollTo > itemsRef.current.length - 1)
      scrollTo = itemsRef.current.length - 1;

    console.log(scrollTo);

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
    let scrollTo = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (item.isVisible && itemsRef.current[index - 1]?.isVisible === false) {
        scrollTo = index - visibleItems;
        console.log(index, scrollTo);
      }
    });

    if (scrollTo < 0) scrollTo = 0;

    /*itemsRef.current[scrollTo]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });*/

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
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
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
          className={`${styles.sliderButton} ${styles.slideLeft}`}
          onClick={() => slideLeft()}
          disabled={disabled}
        >
          left
        </button>
        <button
          onClick={() => slideRight()}
          className={`${styles.sliderButton} ${styles.slideRight}`}
          disabled={disabled}
        >
          right
        </button>
      </div>
    </>
  );
};

export default Slider;
