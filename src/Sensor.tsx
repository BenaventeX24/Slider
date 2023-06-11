import React, { forwardRef } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";

type Props = {
  children: (inView: boolean) => React.ReactNode;
  spacing?: string;
};

export interface SensorRef extends HTMLDivElement {
  inView: boolean;
}

const Sensor: React.ForwardRefRenderFunction<SensorRef, Props> = (
  { children, spacing },
  ref
) => {
  const [upperRef, isUpperVisible] = useInView({ threshold: 1 });
  const [lowerRef, isLowerVisible] = useInView({ threshold: 1 });
  const [middleRef, isMiddleVisible] = useInView({ threshold: 1 });

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
        ref={upperRef}
        className={css`
          height: 1px;
          width: 100%;
          position: absolute;
          top: 0;
        `}
      ></div>
      <div
        ref={middleRef}
        className={css`
          height: 1px;
          width: 100%;
          position: absolute;
          top: 50%;
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        `}
      ></div>
      <div
        ref={lowerRef}
        className={css`
          height: 1px;
          width: 100%;
          position: absolute;
          bottom: 0;
        `}
      ></div>
      {children(isUpperVisible || isMiddleVisible || isLowerVisible)}
    </div>
  );
};

export default forwardRef(Sensor);
