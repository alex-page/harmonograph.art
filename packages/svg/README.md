# @harmonograph/svg

> 🖼 Generate a harmonograph SVG


## Install

```shell
npm install @harmonograph/svg
```


## Get started

The harmonograph is a mechanical apparatus that uses pendulums to create a geometric image. This creates an SVG of a harmonograph.


### Create harmonograph SVG

```js
const generateHarmonographSVG = require('@harmonograph/svg');

const harmonograph = generateHarmonographSVG({
  size: 700,
  strokeWidth: 1,
  strokeColor: '#000',
  pendulumTime: 150,
  pendulums: [{
    amplitude: 200, frequency: 2.985, phase: 2.054, damping: 0.001
  },
  {
    amplitude: 200, frequency: 3.006, phase: 1.820, damping: 0.008
  },
  {
    amplitude: 200, frequency: 3.003, phase: 2.283, damping: 0.001
  },
  {
    amplitude: 200, frequency: 1.994, phase: 1.155, damping: 0.001
  }]
});
```

This returns an SVG of a drawn harmonograph

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><rect fill="transparent" width="100%" height="100%"></rect><path stroke="#000" stroke-width="1" fill="none" d="M 679.068 646.723 C 646.36 628.881, 417.218 495.899, 249.676 392.849 S -28.969 212.083, 9.448 201.383 229.928 241.52, 402.486 287.403 712.231 363.501, 699.031 350.759 524.344 287.226, 350.469 262.826 16.412 251.089, 4.27 315.364 129.74 490.425, 301.232 560.133 652.343 645.958, 689.393 576.041 615.481 354.027, 450.006 221.669 89.434 -8.64, 28.434 0.66 49.576 125.994, 205.543 266.677 567.831 557.749, 651.306 617.899 683.011 644.863, 539.811 559.696 183.558 350.442, 79.541 279.709 -3.948 196.458, 123.519 225.983 466.178 316.111, 588.361 340.053 721.459 346.467, 612.334 310.892 290.483 232.23, 152.891 243.93 -26.608 327.129, 62 417.687 356.315 606.371, 506.257 624.646 727.936 574.222, 661.594 451.855 400.89 165.032, 241.915 75.065 -16.861 -19.959, 25.981 64.799 247.753 314.759, 412.286 443.909 702.305 653.591, 683.688 641.708 505.273 531.422, 338.765 432.805 23.99 247.771, 18.19 225.929 149.785 243.301"></path></svg>
```


### Create randomised harmonograph SVG

To create a randomised harmonograph, do not add the pendulums.

```js
const generateHarmonographSVG = require('@harmonograph/svg');

const harmonograph = generateHarmonographSVG({
  size: 700,
  strokeWidth: 1,
  strokeColor: '#000',
  pendulumTime: 150,
});
```

### Animate the path of the harmonograph SVG

```js
const generateHarmonographSVG = require('@harmonograph/svg');

const harmonograph = generateHarmonographSVG({
  size: 700,
  strokeWidth: 1,
  strokeColor: '#000',
  pendulumTime: 150,
  animatePath: true
});
```

### Animate the path of the harmonograph SVG with set duration and bezier curve

```js
const generateHarmonographSVG = require('@harmonograph/svg');

const harmonograph = generateHarmonographSVG({
  size: 700,
  strokeWidth: 1,
  strokeColor: '#000',
  pendulumTime: 150,
  animatePath: {
    duration: '10s',
    easing: 'ease-in-out'
  }
});
```


## Options

| Option | Description | Default value | Type |
| --- | --- | --- | --- |
| size | The size of the svg | `700` | _number_ |
| strokeWidth | The width of the line | `1` | _number_ |
| strokeColor | The color of the line | `#000` | _string_ |
| pendulumTime | How long the pendulum swings in seconds | `150` | _number_ |
| animatePath | How the path animates | `false` | _object_ or _boolean_ |
| animatePath.duration | The time for the animation to end | `15000ms` | _string_ |
| animatePath.easing | The speed curve of the animation | `linear` | _string_ |
| pendulum | Two pendulums require four items ( x, y and x, y ). Each X and Y value is an object that contains _amplitude_, _frequency_, _phase_, and _damping_ ( see pendulum options below ) | `random values` | _array_ |


## Pendulums object

| Parameter | Description | Default value | Type |
| --- | --- | --- | --- |
| pendulum.amplitude | How far a pendulum swings back and forth, must be from `0` - `360` degrees | `random number` | _number_ |
| pendulum.frequency | How fast a pendulum swings back and forth, for best results use decimal values around `2` and `3` | `random number` | _number_ |
| pendulum.phase | The rate that a pendulum loses its energy, or slows down, must be from `0` to `π` | `random number` | _number_ |
| pendulum.damping | The offset from the normal starting position of a pendulum, must be from `0` to `0.01` | `random number` | _number_ |


## Release History

* v0.0.0  - 💥 Initial version
