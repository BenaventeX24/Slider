import React from "react";
import styles from "./Slider.module.css";
import Box from "./Box";
import Sensor from "./Sensor";

const Slider: React.FC = () => {
  const logItems = (itemId: number, isVisible: boolean) => {
    console.log(itemId, isVisible);
  };
  const items: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {items.map((item, index) => {
          return (
            <Sensor itemId={item} key={item}>
              {(isVisible: boolean, itemId: number) => {
                logItems(itemId, isVisible);
                return <Box>{item}</Box>;
              }}
            </Sensor>
          );
        })}
      </div>
      <button className={`${styles.sliderButton} ${styles.slideLeft}`}>
        left
      </button>
      <button className={`${styles.sliderButton} ${styles.slideRight}`}>
        right
      </button>
    </div>
  );
};

export default Slider;
