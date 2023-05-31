import { CSSInterpolation } from "@emotion/css";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  spacing?: number;
  buttonLeft?: ReactNode;
  buttonRight?: ReactNode;
  threshold?: number;
  time?: number;
  width?: number;
  outterContainerStyles?: CSSInterpolation;
  innerContainerStyles?: CSSInterpolation;
  buttonLeftStyles?: CSSInterpolation;
  buttonRightStyles?: CSSInterpolation;
  disableScrollbar?: boolean;
  showButtons?: boolean;
  disappearingButtons?: boolean;
};

/**
 * Slider fully responsive to the items inside
 *
 * @param {ReactNode} children The items to display inside
 * @param {number} spacing Adds a margin between each item in the slider
 * @param {ReactNode} buttonLeft A custom button element to display instead of the default buttons
 * @param {ReactNode} buttonRight A custom button element to display instead of the default buttons
 * @param {number} threshold How much of a single item must be visible to be count as visible (0=A single visible pixel will be acceptable, 1=Every pixel must be visible to be accepted)
 * @param {number} time Slide animation time 
 * @param {number} width In pixels, the width of the slider (only inner container)
 * @param {CSSInterpolation} outterContainerStyles Styles for the whole slider container
 * @param {CSSInterpolation} innerContainerStyles Styles for the inner (items) container
 * @param {CSSInterpolation} buttonLeftStyles Styles for the left button
 * @param {CSSInterpolation} buttonRightStyles Styles for the right button
 * @param {boolean} disableScrollbar Disable scrollbar, slider will only work with buttons (default false)
 * @param {boolean} showButtons false -> buttons will not show up (default true)
 * @param {boolean} disappearingButtons false -> buttons will only show when hovering over sldier (default true)

* @return {JSX.Element} A scrollable slider with the given elements inside as an horizontal list
 */

declare const Slider: React.FC<Props>;

export default Slider;
