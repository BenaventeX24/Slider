import React, { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import Box from "./Box";
import Sensor, { SensorRef } from "./Sensor";

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
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [scrollCount, setScrollCount] = useState<number>(0);

  const slideRight = () => {
    let scrollTo = currentItem + scrollCount;

    if (scrollTo > itemsRef.current.length - 1)
      scrollTo = itemsRef.current.length - 1;

    itemsRef.current[scrollTo]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });
  };

  const slideLeft = () => {
    let scrollTo = currentItem - scrollCount;

    if (scrollTo > itemsRef.current.length - 1)
      scrollTo = itemsRef.current.length - 1;

    itemsRef.current[scrollTo]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });
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

                return <Box>{item}</Box>;
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
