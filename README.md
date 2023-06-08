<p align="center">
  <img src="https://i.ibb.co/kKyY0NL/Logo-1.jpg" />
</p>

# Slider

A React package for creating a ready to use and fully customizable slider for your items.

![React badge](https://badges.aleen42.com/src/react.svg) [![install size](https://packagephobia.com/badge?p=@benavente/slider)](https://packagephobia.com/result?p=@benavente/slider)

### Installation

```sh
npm install @benavente/slider
```

```sh
yarn add @benavente/slider
```

### Usage

```sh
import Slider from "@benavente/slider"

 <Slider
      innerContainerStyles={css`
        & div {
          display: inline-block;
          width: 210px;
          height: 210px;
          border: 1px solid black;
          text-align: center;
          line-height: 200px;
        }
      `}
    >
      <div> Put your items here! </div>
      <div> Each </div>
      <div> separate </div>
      <div> element </div>
      <div> </> </div>
      <div> will </div>
      <div> be </div>
      <div> interpeted </div>
      <div> as a </div>
      <div> separate </div>
      <div> scrollable </div>
      <div> item </div>
    </Slider>
```

### License: MIT
