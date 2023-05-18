import React, { useRef, useState, useEffect, forwardRef } from "react";
import composeRefs from "@seznam/compose-react-refs";
import { css } from "@emotion/css";

type Props = {
  children: (isVisible: boolean) => React.ReactNode;
  threshold: number | number[];
  spacing?: string;
};

export interface SensorRef extends HTMLDivElement {
  isVisible: boolean;
}

const Sensor: React.ForwardRefRenderFunction<SensorRef, Props> = (
  { children, threshold, spacing },
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
      ref={composeRefs(targetRef, ref)}
      className={css`
        display: inline-block;
        margin: 0 ${spacing};

        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      `}
    >
      {children(isVisible)}
    </div>
  );
};

export default forwardRef(Sensor);
