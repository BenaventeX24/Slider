import React, { useRef, useState, useEffect, forwardRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { css } from "@emotion/css";

type Props = {
  children: (isVisible: boolean) => React.ReactNode;
  threshold: number | number[];
};

export interface SensorRef extends HTMLDivElement {
  isVisible: boolean;
}

const Sensor: React.ForwardRefRenderFunction<SensorRef, Props> = (
  { children, threshold },
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
        threshold: threshold,
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
  }, [threshold]);

  return (
    <div
      ref={mergeRefs([targetRef, ref])}
      className={css`
        display: inline-block;
      `}
    >
      {children(isVisible)}
    </div>
  );
};

export default forwardRef(Sensor);
