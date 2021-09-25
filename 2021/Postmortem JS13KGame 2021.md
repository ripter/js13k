# Postmortem JS13KGame 2021 - SPACE Saver

So the thing I loved ❤️ most about this year's competition, is that I wrote everything in my preferred style, using my preferred tools, in my preferred way. I built this application without the need for any pre-processors. I wrote modern JavaScript and used the browser's own [modules syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). 

It was an absolute joy to work this way. Errors would show the exact location, and it showed the code exactly as I wrote it. I could use `debugger` or even hit pause, whenever I needed. The code I would be looking at and stepping through was *my code*. I could test changes right in the browser and then copy/paste them back into my source! This made debugging so much easier. I did find that Chrome showed better Error messages than Firefox in [Generator Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

I am not an ECS (Entity, Component, System) expert. I've been trying to learn and understand it over several projects over the years. Most of my experience comes from [A-Frame](https://aframe.io/) projects. It was my first introduction to ECS and VR programming.


---
# 1. Architecture 

### Entities and Components

I started with a very simple Entity, Component, System style architecture. In a traditional ECS, the Components hold all the data, and the Entity holds a list of components.

```
// Traditional ECS, the components hold the data.
// The Entity holds the components.
entity = {
  position: {
  	x: 100,
  	y: 150,
  },
  velocity: {
  	x: 10,
  	y: 0,
  },
}
// A "pure" ECS might replace entities with simple UUIDs.
positionComponents = [
  {entity: 'ent1', x: 100, y: 150},
  {entity: 'player', x: 64, y: 72},
];
velocityComponents = [
  {entity: 'ent1', x: 10, y: 0},
  {entity: 'player', x: 0, y: 0},
];
```

I didn't follow the traditional models and instead opted to hold all the data on the Entity object itself. I thought that I could get a smaller API if I could use `.whatever = foo` instead of creating setter and getter functions. This removed the need for my Components to hold data. I'm starting to think of them more as **Tags** or if this was HTML, class names.


```
// Modified ECS used in-game.
{
  id: 'player',
  tileID: 5,
  color: 'light_magenta',
  x: 64, y: 72,
  deltaX: 0, deltaY: 0,
  components: new Set([
    'sprite', 'solid', 'player', 'movable',
  ]),
},
```

A traditional ECS would require you to think about which component will hold position data? Which one will hold the image data? If Component `sprite` requires `x, y`, and Component `moveable` also uses `x, y`, then do we need a third component `position` that just holds `x, y`? Then we need to make sure our queries include `sprite, position` just in case some entity created a sprite without a `position`. 

These kinds of questions don't exist in this version. Everything is on `entity` and error checking is using the browser debugging tools.

The downside of course was that I need to cache `O(n) * unqiueCalls` each tick. In a traditional ECS, each uniqueCall can be cached at init. So the systems always get it at `O(1)`.

Still, my dream cache API would have solved this difference. And I liked being able to write `entity.x = 72;` instead of `updateComponent(entity, 'position', {x: 72})`.

---
### Entity Cache

Every system makes several calls to `byComponents([])`. They are often calling for the same list, like when getting all the entities with the `solid` component. So I implemented a very basic cache system on the `byComponents()` function.

1. The [cache system](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/main.mjs#L113) in the game is reset every tick.
2. The function [byComponents](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/entities/byComponents.mjs) would check if the requested entities were already stored in the cache (`O(1)`). If not, then it would search all entities (`O(n)`) with `components.has(name)` and cache the result (`O(n)`).

In this system, it only performed `O(n)` once per unique component list.

I wish I would have created `addComponent`, `removeComponent` functions. These functions would add/remove items from the cache instead of clearing it every turn. Then the `byComponents()` function could always use the cache.

It would have been nice to cache the collision maps as well. Systems like `playerSystem` use the position to create a [collision map](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/systems/playerSystem.mjs#L54). Then the system can work on the colliding items.

 




---
# 2. Generators

I had never used [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) before this project. But, I had used [coroutines in PICO-8](https://www.lexaloffle.com/bbs/?tid=3458), which are similar to generators.

I started using Generators when I added the [animationSystem](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/systems/animationSystem.mjs) I needed a way to do **something** at the start of each animation frame. A system, in contrast, does something every game tick. For example, the [pushButton](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/animations/pushButton.mjs) animation moves the sprite by one pixel each frame (every 0.25 seconds).

I could store the `delay`, `totalFrames`, and `animationCallback` on the Entity with the other data. Then the system could update the Entity and trigger the `animationCallback` for each frame. Instead, I created an [animation generator](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/animations/genFrameAnimation.mjs#L9) that can keep the data in a private scope.

Using generators makes it easy for me to make the scenes, like the [introScene](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/intro.mjs#L12).  Instead of using frames. This allowed me to do things like display text until the user presses a button.

```
// stay inside the loop until the user presses a key.
while (inputEntity.downKeys.size === 0) {
  yield;
  drawText('<- This is the compact button.', 56, 108, COLORS[0], 1);
}
```

Or wait until the user compresses the trash block.

```
// Wait until the player compresses the block.
let scoreEntities;
do {
  scoreEntities = byComponents(['score']);
  yield;
} while (scoreEntities.size === 0);
```


With generators, I was able to write [introAnimation](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/intro.mjs), [startNewLevel](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/startNewLevel.mjs), and [endGameScene](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/endGameScene.mjs). (The naming is dumb because I was still learning and trying to figure stuff out.) I use these three generators to control the game "scene". The scene controls things like the tutorial, end game, and playing the game.

Because I wrote them with generators, they get an initialization step, they keep state, and can be written as a series of steps.



---
# 3. In Retrospect

I liked working with this hybrid ECS. Maybe it could be called an Entity, Tag, Generator, System (ETGS, or ETSG). Thinking of Components as tags helped me test and refactor ideas for Component combinations on a whim. Having all the data on the entity allows for a simple API because it is a plain JS object. `entity.x = 64` does the trick. Generators create a private scope of data not on the entity. Perfect for keeping implementation details out of the shared object. It also makes it easy to write sequential step-by-step code.

One thing I missed was writing tests. I like the Red/Green cycle and it helps ensure the code stays fixed. Thinking back on it now, I could have written tests, because the tests wouldn't be included in the final zip file. I could have used my normal testing libraries. I had limited time and hadn't set up a testing toolchain beforehand. I think for next year I'll have to better prepare my starter template.

I'm excited to play around with more Generators. They have several advantages, but I'm not used to thinking "in generator". You can see in [animationSystem](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/systems/animationSystem.mjs#L10) that it doesn't take a lot of code to run them.

```
const animateEntities = byComponents(['animate']);

// Run the animation generator on each entity with the animate component.
for (let animateEntity of animateEntities) {
  const { done } = animateEntity.animate.next({entity: animateEntity, deltaTime});
  if (done) {
    // Clean up the animation.
    animateEntity.components.delete('animate');
  }
}
```

The object passed into `.next(props)` will be returned inside the generator's yield statement. `props = yeild`. This is how I pass the current Entity and `deltaTime` into each generator. Instead of writing a system that finds the 5 compressor entities for each tick and then decides how much to move them. I start a [crushWallAnimation](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/crushWall.mjs) on each entity. Letting the animation system run, updating the position until completion.
