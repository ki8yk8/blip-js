<<<<<<< HEAD
# Game Engine

## Features

1. Create canvas based game engine inspired from Kaplay.js
2. Implements vector functions like, unit vector, distance, cross and dot products, arithmetics, angle, rotate, etc.
3. Tags from each object to implement collision
4. Features like tween and interpolate functions for animations
5. Supports keyboard events like keypress, keydown, and keyup
6. Collision detection with functions like onCollide, onCollideStart, onCollideEnd, and onCollideUpdate.
7. Color component with support of RGB and Hex color format and inter-conversion support.
8. Custom random number generator using linear congurential RNG with features like seed value, random number between max and min, choose from an array, shuffle, etc.
9. Anchoring origin ofelement to different positions center, top, topleft, left, right, etc.
10. Support for velocity and acceleration.
11. Supports transformation features like scale, and rotate.
12. Supports creating rectangle with and without rounded corners, and texts with different font and size support.

# Usages

## Initialize the Engine

```js
import Engine from "./engine";

const k = new Engine();
```

Here, `k` is used such that it functionally looks identical to the Kaplay.

- Engine can accept optional parameter including;

```js
{
	width: number,
	height: number,
	backgroundColor: // default white
}
```

## Creating and destroying objects

A game object is like one piece or component of the game. It can be created using `k.add[<options>])`.

The options is items of array and can be;

1. `k.rec(width, height, {fill: boolean, radius})`, creates a rectangle. The radius can have format;

   - `number` same radius for all the corners,
   - `[topleft topright botright botleft]

2. `k.pos(x, y)`, its position in the canvas
3. `k.anchor()`, its origin in body can be `top | bot | left | right | topleft | topright| botleft | botright`.
4. `k.rotate(angle)`, rotates the object by given angle in degress.
5. `k.scale(sx, sy)`, scales the object. If only one value is given `sx = sy`.
6. `k.tag([tag1, tag2, ...])`, add tags to the given object
7. `k.text(text, {size: number, font: fontname, maxWidth: number})`, creates a text component on the canvas
8. `k.area()` enables collision detection for the object

You can also destroy any object using

```js
k.destroy(object);
```

## Colllisions
Any object with `k.area()` can use the following functions;
1. `obj.checkCollision(tag)`, if object has collided with another object with `area()` with a given tag,
2. `obj.getCollisions()`, get all the objects that this object is in collision with currently,
3. `obj.onCollide(tag, callback)`, triggers callback function when object collide with another object with particular tag. The callback will recive a parameter that represents the object that it collided with.
4. `obj.onCollideUpdate`, and `obj.onCollideEnd` same as `onCollide` but triggers callback during the collision and at the end of collision respectively.

## Random Numbers
The engine uses Linear Congurential generation algorithm for generation of random numbers.
1. `randSeed(number)`, seeds the generator
2. `rand(lower, upper)`, default is between 0 and 1
3. `randi(lower, upper)`, same as rand but only integer
4. `choose(array)`, chose one random element from the array
5. `chooseMultiple(array, n, replacement)`, chooses n number of elements from the array with and without replacement.
6. `shuffle(list)`, shuffles the item of the list.

## Colors
1. `rgbToHex(r, g, b)` converts RGB color to HEX format
2. `hexToRgb(hex)` converts HEX format color to RGB format

## Keyboard Interactions
1. `onKeyPressed(key, callback)`, when key is pressed 
2. `onKeyDown(key, callback)`, when key is pressed but not released

## Working with Vectors
1. `vec2(x, y)`, creates a vector with x and y component
2. `vec.clone()`, clones the vector
3. `vec1.add(vec2)`, returns `vec1 + vec2`
4. Similarly has, `.sub()`, `.scale()`, `.neg()`, `.unit()`, `.dist()`, `.dot()`, `.angleBetween()`, and `.rotate()`

## Other Utilities
1. `tween(from, to , duration, callback)`, in the given `duration` call the `callback` at every frames with value changing from `from` to `to`.
2. `k.get(tag)`, get all the objects with the given tag,
3. `map(n, a1, b1, a2, b2)`, performs interpolation of n when (a1, a2) is mapped to (a2, b2).
4. `toRadian(degree)` and `toDegree(radian)`

All these functions are implemented from scratch during Axiom V1. 
=======
>>>>>>> b76097c (initializes the repository with my own game engine)
