import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import Box from "./Box";

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

  const sliderIdentifier = { "slide-id": "example1" };

  //const visibleItemsRef = useRef<Array<Element>>([]);
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleItems = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target);

        setVisibleItems(visibleItems.length);
      },
      { rootMargin: "0px", threshold: 1 }
    );

    const items = document.querySelectorAll('[slide-id="example1"]');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [shouldRender]);

  useEffect(() => {
    console.log(visibleItems);
  }, [visibleItems]);

  useLayoutEffect(() => {
    function handleResize() {
      setShouldRender((prevShouldRender) => !prevShouldRender);
    }

    function handleScroll() {
      setShouldRender((prevShouldRender) => !prevShouldRender);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{ display: "inline-block" }}
            {...sliderIdentifier}
          >
            {item}
          </div>
        ))}
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
