import React, { useRef, useState, useEffect, forwardRef } from "react";
import styles from "./Slider.module.css";
import { mergeRefs } from "react-merge-refs";

type Props = {
  children: (isVisible: boolean, itemId: number) => React.ReactNode;
  itemId: number;
};

export interface SensorRef extends HTMLDivElement {
  isVisible: boolean;
}

const Sensor: React.ForwardRefRenderFunction<SensorRef, Props> = (
  { children, itemId },
  ref
) => {
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
        threshold: 1,
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
    <div ref={mergeRefs([targetRef, ref])} className={styles.sensor}>
      {children(isVisible, itemId)}
    </div>
  );
};

export default forwardRef(Sensor);
