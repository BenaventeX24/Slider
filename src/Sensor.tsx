import React, { forwardRef } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";

type Props = {
  children: (inView: boolean) => React.ReactNode;
  spacing?: string;
  threshold?: number;
};

export interface SensorRef extends HTMLDivElement {
  inView: boolean;
}

const Sensor: React.ForwardRefRenderFunction<SensorRef, Props> = (
  { children, spacing, threshold = 0.5 },
  ref
) => {
  const sensorWidth = threshold && threshold * 100;

  const [upperLeftRef, isUpperLeftVisible] = useInView({
    threshold: threshold,
  });
  const [lowerLeftRef, isLowerLeftVisible] = useInView({
    threshold: threshold,
  });
  const [middleLeftRef, isMiddleLeftVisible] = useInView({
    threshold: threshold,
  });
  const [upperRightRef, isUpperRightVisible] = useInView({
    threshold: threshold,
  });
  const [lowerRightRef, isLowerRightVisible] = useInView({
    threshold: threshold,
  });
  const [middleRightRef, isMiddleRightVisible] = useInView({
    threshold: threshold,
  });

  return (
    <div
      ref={ref}
      className={css`
        display: inline-block;
        position: relative;
        margin: 0 ${spacing};

        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      `}
    >
      <div
        ref={upperLeftRef}
        className={css`
          height: 1px;
          width: ${sensorWidth ? sensorWidth : 100}%;
          position: absolute;
          top: 0;
          left: 0;
        `}
      ></div>
      <div
        ref={middleLeftRef}
        className={css`
          height: 1px;
          width: ${sensorWidth ? sensorWidth : 100}%;
          position: absolute;
          top: 50%;
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          left: 0;
        `}
      ></div>
      <div
        ref={lowerLeftRef}
        className={css`
          height: 1px;
          width: ${sensorWidth ? sensorWidth : 100}%;
          position: absolute;
          bottom: 0;
          left: 0;
        `}
      ></div>
      <div
        ref={upperRightRef}
        className={css`
          height: 1px;
          width: ${sensorWidth ? sensorWidth : 100}%;
          position: absolute;
          top: 0;
          right: 0;
        `}
      ></div>
      <div
        ref={middleRightRef}
        className={css`
          height: 1px;
          width: ${sensorWidth ? sensorWidth : 100}%;
          position: absolute;
          top: 50%;
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          right: 0;
        `}
      ></div>
      <div
        ref={lowerRightRef}
        className={css`
          height: 1px;
          width: ${sensorWidth ? sensorWidth : 100}%;
          position: absolute;
          bottom: 0;
          right: 0;
        `}
      ></div>
      {children(
        isUpperLeftVisible ||
          isLowerLeftVisible ||
          isMiddleLeftVisible ||
          isUpperRightVisible ||
          isLowerRightVisible ||
          isMiddleRightVisible
      )}
    </div>
  );
};

export default forwardRef(Sensor);
