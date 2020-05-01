# @harmonograph/xy

> 🖼 Generate a harmonographs X and Y coordinates


## Install

```shell
npm install @harmonograph/xy
```


## Get started

The harmonograph is a mechanical apparatus that uses pendulums to create a geometric image. This function uses the drawing time, size and pendulums to create X and Y coordinates for a harmonograph.

If you wish to draw the harmonograph for use on a website you can use `@harmonograph/svg` or `@harmonograph/canvas`.


### Create harmonograph XY coordinates

```js
const generateHarmonographXY = require('@harmonograph/xy');

const harmonograph = generateHarmonographXY(
  150,
  700,
  [{
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
);
```

This returns an object containing an array of X and Y coordinates.

```js
{
  x: [1, 2, 3],
  y: [1, 3, 9]
}
```


### Create randomised harmonograph XY coordinates

```js
const generateHarmonographXY = require('@harmonograph/xy');
const {randomPendulums} = require('@harmonograph/xy');

const harmonograph = generateHarmonographXY(150, 700, randomPendulums());
```


## Options

| Option | Description | Default value | Type |
| --- | --- | --- | --- |
| drawingTime | How long the pendulum swings in seconds | `150` | _number_ |
| size | The size of the svg | `700` | _number_ |
| pendulums | Two pendulums require four items ( x, y and x, y ). Each X and Y value is an object that contains _amplitude_, _frequency_, _phase_, and _damping_ ( see pendulum options below ) | `random values` | _array_ |


## Pendulums object

| Parameter | Description | Default value | Type |
| --- | --- | --- | --- |
| pendulum.amplitude | How far a pendulum swings back and forth, must be from `0` - `360` degrees | `random number` | _number_ |
| pendulum.frequency | How fast a pendulum swings back and forth, for best results use decimal values around `2` and `3` | `random number` | _number_ |
| pendulum.phase | The rate that a pendulum loses its energy, or slows down, must be from `0` to `π` | `random number` | _number_ |
| pendulum.damping | The offset from the normal starting position of a pendulum, must be from `0` to `0.01` | `random number` | _number_ |


## Release History

* v0.0.0  - 💥 Initial version
