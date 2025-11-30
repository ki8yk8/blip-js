# Ski Downhill Game

The game has two stages built around the theme of **WINTER**. Sometime you are a surfer, and sometime you are a snow ball who should reach a goal.

- **Stage 1**: You get a snow board with some thrusters. These will help you surf on the snow and earn points. Score at least 5 points before either your fuel expires or you die to get promoted to next level **Stage 2**.
- **Stage 2**: You are a snowball who wants to climb to reach to the top position and capture a flag. You can jump, or shoot yourself with a cannon to reach at top. Be aware of the spikes around.

## Movements

## Stage 1; SnowBoard

There are three engines in the snowboard as;

1. **Main engine** activated by `Arrow Up Key` that adds forward accleration,
2. **Left thruster** activated by `Arrow Right key` that adds acceleration in +ve y axis, and,
3. **Right thruster** activated by `Arrow left key` that adds accleration in -ve x axis.

## Stage 2; SnowBall

- Press `Space key` or `Arrow Up` to jump,
- Use your `Arrow left` and `Arrow right` keys to move left and right,
- Once, you collide with the cannon, press `Arrow Up` and `Arrow Down` key to adjust the cannon angle and press `Space` to shoot.

## Implemented in Game Engine this Week
- The game is made completely from scratch, using my own game engine developed during axiom and last week of siege. The game was started this week only.
- Features Immplented;
1. Supports passing props when scene is changed same as kaplay,
2. Includes `useEffect` function to properly trigger a function when a dependcy variable is changed,
3. Minor bug fixes like performing Array operations on set,
4. Adds `isKeyDown` and `isKeyPressed` method such that, we can check inside the `udpate` method,
5. Object now can be destroyed using `obj.destroy()`,
6. Use can toggle the visibility of a given object using `engine.visibility`.

## Notes

- The physics resolver is quite buggy, I wanted to introduce the concept of body and handle physics properly. But, my technical ability didn't supported me. I will look at this next time. Maximum of 1 hour was invested. But the code is pushed in another branch. [See branch Snow Boarding Physics](https://github.com/ki8yk8/blip-js/tree/game-snowboaring-physics). For now, I will handle the physics manually through area.

## Gift

- Press `s key` 3 times while on main menu, to unlock the stage 2 directly. No need to complete the stage 1.

## Credits

- Snow Sprites downloaded from [https://opengameart.org/content/2d-platformer-snow-pack](https://opengameart.org/content/2d-platformer-snow-pack) Tio Aimar @ opengameart.org
