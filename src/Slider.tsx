import React from "react";
import styles from "./Slider.module.css";

const Slider: React.FC = () => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div className={styles.box}>1</div>
        <div className={styles.box}>2</div>
        <div className={styles.box}>3</div>
        <div className={styles.box}>4</div>
        <div className={styles.box}>5</div>
        <div className={styles.box}>6</div>
        <div className={styles.box}>7</div>
        <div className={styles.box}>8</div>
        <div className={styles.box}>9</div>
        <div className={styles.box}>10</div>
        <div className={styles.box}>11</div>
        <div className={styles.box}>12</div>
        <div className={styles.box}>13</div>
        <div className={styles.box}>14</div>
        <div className={styles.box}>15</div>
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
