import React, { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import Box from "./Box";
import Sensor, { SensorRef } from "./Sensor";

const Slider: React.FC = () => {
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
  ];

  //const sliderIdentifier = { "slide-id": "example1" };

  const slideRight = () => {
    let visibleItems = 0;
    let scrollTo = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (
        item.isVisible &&
        (itemsRef.current[index + 1]?.isVisible === false ||
          itemsRef.current[index + 1]?.isVisible === undefined)
      )
        scrollTo = index + visibleItems;
    });

    console.log(visibleItems, scrollTo);
    if (scrollTo > itemsRef.current.length - 1)
      scrollTo = itemsRef.current.length - 1;

    itemsRef.current[scrollTo]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });
  };

  const slideLeft = () => {
    let visibleItems = 0;
    let scrollTo = 0;

    itemsRef.current.forEach((item, index) => {
      if (item.isVisible) visibleItems++;
      if (item.isVisible && itemsRef.current[index - 1]?.isVisible === false)
        scrollTo = index - visibleItems;
    });
    console.log(visibleItems, scrollTo);

    if (scrollTo < 0) scrollTo = 0;

    itemsRef.current[scrollTo]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });
  };

  const itemsRef = useRef<Array<SensorRef>>([]);

  /*useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      console.log(index, item.isVisible);
    });
  }, [update]);*/

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
        onClick={() => slideLeft()}
      >
        left
      </button>
      <button
        onClick={() => slideRight()}
        className={`${styles.sliderButton} ${styles.slideRight}`}
      >
        right
      </button>
    </div>
  );
};

export default Slider;
