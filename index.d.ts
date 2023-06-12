import { CSSInterpolation } from "@emotion/css";
import React, { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  spacing?: string;
  buttonLeft?: ReactNode;
  buttonRight?: ReactNode;
  time?: number;
  width?: string;
  outerContainerStyles?: CSSInterpolation;
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
 * @param {string} id Adds an id to the parent div of the slider
 * @param {ReactNode} children The items to display inside
 * @param {number} threshold Default: 0.5; Between 0 and 1 indicating the percentage that should be visible to be counted as visible in the slider.
 * @param {string} spacing Adds a margin between each item in the slider
 * @param {ReactNode} buttonLeft A custom button element to display instead of the default buttons
 * @param {ReactNode} buttonRight A custom button element to display instead of the default buttons
 * @param {number} time Slide animation time 
 * @param {string} width width of the Slider
 * @param {CSSInterpolation} outerContainerStyles Styles for the whole slider container
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
