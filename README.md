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
    document.body.innerHTML = Harmonograph();
  </script>
</body>
</html>
```

**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Settings

You can change the settings by adding values to the Harmonograph function. For example:

```js

```


### `element`
_(object)_

The html5 canvas element for the harmograph to be drawn inside.


### `speed`
_(number)_
default: `10`

The speed at which the harmonograph is drawn adds new x and y coordinates.


### `color`
_(string)_
default: `#000`

The color of the harmonograph lines


### `drawingTime`
_(number)_
default: `200`

How long until drawing should stop. A drawingTime of 1 would draw for 1 second.


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

* v2.0.0  - Draw an SVG with bezier curves 
* v1.0.0  - 💥 Initial version


**[⬆ back to top](#contents)**

