import React from "react";
import styles from "./Slider.module.css";

type Props = {
  children: React.ReactNode;
};

const Box: React.FC<Props> = ({ children }: Props) => {
  return <div className={styles.box}>{children}</div>;
};

export default Box;
