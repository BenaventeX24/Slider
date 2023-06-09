import React, { forwardRef } from "react";
import composeRefs from "@seznam/compose-react-refs";
import { css } from "@emotion/css";
import { InView, useInView } from "react-intersection-observer";

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
  const [inViewRef, inView] = useInView();
  return (
    <div
      ref={ref}
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
      <div ref={inViewRef}>{children(inView)}</div>
    </div>
  );
};

export default forwardRef(Sensor);
