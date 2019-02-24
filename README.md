🖼 Harmonograph
==============

> Randomly generated geometric images


## Contents

* [Install](#install)
* [How to use](#use)
* [Settings](#settings)
* [Contributing](#contributing)
* [Release History](#release-history)


## Install

```shell
npm install harmonograph
```

**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


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
    
    /* Optional animation of the Harmonograph ⬇️ */

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

**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Settings

You can change the settings by adding values to the Harmonograph function. For example:

```js
Harmonograph({
  size: 700,
  strokeWidth: 1,
  strokeColor: '#000',
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

### `size`
_(number)_
default: `700`

The size of the svg


### `strokeWidth`
_(number)_
default: `1`

The width of the line


### `strokeColor`
_(string)_
default: `#000`

The color of the harmonograph lines


### `pendulumTime`
_(number)_
default: `150`

How long the pendulum swings. A drawingTime of 1 the pendulums would swing for 1second.


### `pendulum`
_(array)_
default: Two random pendulums will be created

Two pendulums require four items ( x, y and x, y ) in the array. Each item contains an object in the array. Each object must use the following keys:

**Amplitude:** 
How far a pendulum swings back and forth, must be from `0` - `360` degrees

**Frequency:** 
How fast a pendulum swings back and forth, for best results use decimal values around `2` and `3`

**Phase:**     
The rate that a pendulum loses its energy, or slows down, must be from `0` to `π`

**Damping:**   
The offset from the normal starting position of a pendulum, must be from `0` to `0.01`


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Contributing

To contribute to the harmonograph project:
1. Fork the project and clone it locally
1. Create a new branch for the work that is going to be completed.
1. Install dependencies `npm i`
1. Make your changes to the `harmonograph.js` file.
1. Run `npm run build`
1. Push your work to github and create a new pull request.
1. Respond to any code review feedback.

**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------

## Release History

* v2.0.0  - Remove Canvas and draw harmonograph with SVG bezier curves
* v1.0.0  - 💥 Initial version


**[⬆ back to top](#contents)**

