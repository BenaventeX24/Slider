import React from "react";
import styles from "./Slider.module.css";

const Slider: React.FC = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.box}>1</div>
      <div className={styles.box}>2</div>
      <div className={styles.box}>3</div>
      <div className={styles.box}>4</div>
      <div className={styles.box}>5</div>
      <div className={styles.box}>6</div>
      <div className={styles.box}>7</div>
      <div className={styles.box}>8</div>
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
