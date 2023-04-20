import React, { useRef, useState, useEffect } from "react";
import styles from "./Slider.module.css";

type Props = {
  children: (isVisible: boolean, itemId: number) => React.ReactNode;
  itemId: number;
};

const Sensor: React.FC<Props> = ({ children, itemId }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetNode = targetRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (targetNode) {
      observer.observe(targetNode);
    }

    return () => {
      if (targetNode) {
        observer.unobserve(targetNode);
      }
    };
  }, []);

  return (
    <div ref={targetRef} className={styles.sensor}>
      {children(isVisible, itemId)}
    </div>
  );
};

export default Sensor;
