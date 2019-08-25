# Harmonograph

> 🖼 Generate a randomised harmonograph SVG


## Install

```shell
npm install harmonograph
```

## How to use

```html
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
  <script src="node_modules/harmonograph/harmonograph.min.js" ></script>
  <script>
    // Create a randomised Harmonograph
    var harmonograph = Harmonograph();
    document.body.appendChild( harmonograph );
    
    // Optional animation of the Harmonograph ⬇️
    // The Path element
    var svgPath = harmonograph.querySelector( 'path' );

    // Set up the path for animation
    var length = svgPath.getTotalLength();
    svgPath.style.strokeDasharray = length + ' ' + length;
    svgPath.style.strokeDashoffset = length;
    svgPath.style.transition = 'none';

    // Animate the path
    svgPath.getBoundingClientRect();
    svgPath.style.transition = 'stroke-dashoffset 30s linear';
    svgPath.style.strokeDashoffset = '0';
  </script>
</body>
</html>
```


## Settings

You can customise the default settings by adding values to the Harmonograph function. For example:

```js
const generateHarmonograph = require('harmonograph');

const harmonograph = generateHarmonograph({
  size: 700,
  strokeWidth: 1,
  strokeColor: '#000',
  backgroundColor: 'transparent',
  pendulumTime: 150,
  pendulum: [{
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

| Parameter | Description | Default value | Type |
| --- | --- | --- | --- |
| size | The size of the svg | `700` | _number_ |
| strokeWidth | The width of the line | `1` | _number_ |
| strokeWidth | The width of the line | `1` | _number_ |
| strokeColor | The color of the line | `#000` | _string_ |
| backgroundColor | The background color of the harmonograph | `transparent` | _string_ |
| backgroundColor | The background color of the harmonograph | `transparent` | _string_ |
| pendulumTime | How long the pendulum swings in seconds | `150` | _number_ |
| pendulum | Two pendulums require four items ( x, y and x, y ). Each X and Y value is an object that contains _amplitude_, _frequency_, _phase_, and _damping_ ( see table below ) | `random values` | _array_ |


### Pendulum settings

| Parameter | Description | Default value | Type |
| --- | --- | --- | --- |
| pendulum.amplitude | How far a pendulum swings back and forth, must be from `0` - `360` degrees | `random number` | _number_ |
| pendulum.frequency | How fast a pendulum swings back and forth, for best results use decimal values around `2` and `3` | `random number` | _number_ |
| pendulum.phase | The rate that a pendulum loses its energy, or slows down, must be from `0` to `π` | `random number` | _number_ |
| pendulum.damping | The offset from the normal starting position of a pendulum, must be from `0` to `0.01` | `random number` | _number_ |


## Release History

* v3.0.0  - Return an SVG, add linter and tests
* v2.0.7  - Add `--unsafe-perm` for `publish` workflow
* v2.0.6  - Fix issue with `strokeWidth` not working
* v2.0.5  - Change script from `prepare` to `prepublishOnly`
* v2.0.4  - Include `harmonograph.min.js` in npm publish
* v2.0.3  - Adding `--access public` for GitHub actions publish
* v2.0.2  - Use prepare instead of prepublish
* v2.0.1  - Add back minified files to published npm package
* v2.0.0  - Remove Canvas and draw harmonograph with SVG bezier curves
* v1.0.0  - 💥 Initial version
