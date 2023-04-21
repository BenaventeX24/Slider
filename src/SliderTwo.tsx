import React, { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import Box from "./Box";
import Sensor, { SensorRef } from "./Sensor";

const Slider: React.FC = () => {
  const items = [
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
  ];

  //const sliderIdentifier = { "slide-id": "example1" };

  /*const [visibleItems, setVisibleItems] = useState<
    Array<{
      itemId: number;
      isVisible: boolean;
    }>
  >([]);*/

  const itemsRef = useRef<Array<SensorRef>>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      console.log(index, item.isVisible);
    });
  }, [update]);

  return (
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
        onClick={() => setUpdate(!update)}
      >
        left
      </button>
      <button className={`${styles.sliderButton} ${styles.slideRight}`}>
        right
      </button>
    </div>
  );
};

export default Slider;
