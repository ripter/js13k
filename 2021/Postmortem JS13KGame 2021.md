# SPACE Saver Postmortem - JS13KGame 2021

So the thing I loved ❤️ most about this year's competition, is that I wrote everything in my preferred style, using my preferred tools, in my preferred way. I built this application without the need for any pre-processors. I wrote modern JavaScript and used the browser's own [modules syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) to import and export code. 

It was an absolute joy to work this way. Errors would show the exact location, and it showed the code exactly as I wrote it. I could use `debugger` or even hit pause, whenever I needed. The code I would be looking at and stepping through was *my code*. I could test changes right in the browser and then copy/paste them back into my source! This made debugging so much easier. The only thing that didn't work was error messages from [Generator Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). Chrome would often tell me where the error occurred, while Firefox just gave me a generic error message.


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
// Other ECS might replace entities with simple UUIDs.
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

In a traditional ECS, you would need to decide which component would hold on to the data. The `sprite` system needs `x, y` to render, so does the data go in the `sprite` component? The `solid` system also needs `x, y`, along with the `movable` component. They shouldn't all hold onto copies of the same values. So you might break it out into a third component, `position` just to hold the `x, y` data. Now all the other systems need to be aware of this `position` component as well. So then what happens to the smaller components like `solid` that don't use anything other than `position`? Do they still exist, or should they be reduced to a single value on some larger Component?

The Entity, Tag, system doesn't have to answer these kinds of questions. All data is on the Entity and everyone can use it. Debugging is also easier because I can pause live running code, change the data on the entity, and then resume it to see the effect.

The downside is performance. Because all the entities are in one giant list, there is an `O(n)` cost to get a sublist by Component/Tag. A  traditional ECS can pre-cache each component list ahead of time. Reducing the call to get them down to an `O(1)` operation. I added a basic cache system, so each sublist only required a single `O(n)` operation per tick. Not great, but better than nothing.

My dream cache would have solved this difference. It would keep the cached component lists and allowed me to store all the data on the entities. Then I could still write `entity.x = 72;` instead of `updateComponent(entity, 'position', {x: 72})`.

---
### Entity Cache

Systems work with lists of entities queried by their *Components* (or in my case *Tags*.) Several systems might get a list of `solid` entities. Generators might also get a list of `solid` entities. To avoid performing an `O(n)` operation for each call, I added a simple cache system in the `byComponents` function.

1. The [cache system](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/main.mjs#L113) in the game is reset every tick.
2. The function [byComponents](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/entities/byComponents.mjs) checks if the requested entities were already stored in the cache (`O(1)`). If not, it performs an `O(n)` operation to create a new list. It adds this new list to the cache and returns the result.

I wish I would have created `addComponent`, `removeComponent` functions. These functions could add/remove items from the cache instead of clearing it every turn. Then the `byComponents()` function could always use the cache, resulting in a constant `O(1)` operation.

It would have been nice to cache the collision maps as well. Systems like [playerSystem](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/systems/playerSystem.mjs#L54), and Generators like [startNewLevel](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/animations/startNewLevel.mjs#L40) uses a simple collision detection by looking for entities on the same tile. They do this by creating a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and using the Entities `x, y` position as the key. If two Entities have the same key, they are colliding on the same tile position.


---
# 2. Generators

I had never used [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) before this project. But, I had used [coroutines in PICO-8](https://www.lexaloffle.com/bbs/?tid=3458), which are similar to generators.

I started using Generators when I added the [animationSystem](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/systems/animationSystem.mjs) I needed a way to do **something** at the start of each animation frame. A system, in contrast, does something every game tick. For example, the [pushButton](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/animations/pushButton.mjs) animation moves the sprite by one pixel each frame (every 0.25 seconds). But it spends most game ticks doing nothing. I was inspired by [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) and wanted to be able to write in a similar fashion.

I could store the `delay`, `totalFrames`, and `animationCallback` on the Entity with the other data. Then the system could update the Entity and trigger the `animationCallback` for each frame. Instead, I created an [animation generator](https://github.com/ripter/js13k/blob/e52d6d77b308d2f46dcc7bad3630e23895b6cb26/2021/src/animations/genFrameAnimation.mjs#L9) that keeps the frame animation data in a private scope.

```
while (frame < totalFrames) {
  // YIELD
  const props = yield;
  const { deltaTime } = props;
  
  // wait until the delay is over before doing the next animation.
  if ((delay - deltaTime) > 0) {
    delay -= deltaTime;
    continue;
  }

  //
  // do animation stuff once per frame.
  //
  
  // Advance to the next frame and reset the delay.
  frame += 1;
  delay = frameDelay;
}
```

Then I could write the pushButton animation as a switch statement with the current frame.

```
switch (frame) {
  case 0:
    entity.y -= 1;
    break;
  case 1:
    entity.y += 1;
    break;
  default:
    // ignore
}
```

Not only was it easier to write the animation as a switch statement, but it allowed me to write the code for a single entity, instead of working on the list of entities like a System. If I want five entities to play the same animation, I just gave them all the animation.

The generators are all run by the [animationSystem](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/systems/animationSystem.mjs). A simple system that calls `.next()` until the animation has completed.

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

The object passed into `.next(props)` will be returned inside the generator's yield statement. `props = yeild`. This is how I pass the current Entity and `deltaTime` into each generator.


I soon learned that writing in a sequential style made creating Scenes easier. A scene controls major aspects of the game. They prevent the player from moving around while displaying text. They create new random levels for the player to clear, and they show the end game score. In each case, I wanted to keep doing *Foo* until condition *X* happens, then I want it to do *Bar* until another condition is met. Scenes are really a series of steps to complete while waiting on a condition before moving on to the next step.

```
// Wait for the user to press a key.
while (inputEntity.downKeys.size === 0) {
  yield;
  drawText('Press any key to start.', 56, 108, COLORS[0], 1);
}
```

Or wait until the user compresses the trash block.

```
// Wait until the player compresses a trash block.
let scoreEntities;
do {
  scoreEntities = byComponents(['score']);
  yield;
} while (scoreEntities.size === 0);
```

I used this to create the three scenes in the game. [introGame](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/intro.mjs) that tells the user how to play. [playGame](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/startNewLevel.mjs) that creates a random level and waits for the player to finish, and [endGame](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/animations/endGameScene.mjs) that shows the player their score and asks if they want to continue.


---
# 3. Sound & Music

I have *zero* musical talent, so when it came time to add sound and music to the game, I went looking for a tiny library I could use. I picked [Xem's Alphabet Piano](https://xem.github.io/alphabet-piano/) because I liked using a string of a-z letters for the notes. Xem came up with the math to convert the lowercase character codes into pleasant frequencies. The only thing it was missing was variable note lengths. It plays each note in the string with the same note length (defaults to 0.3). I wanted to use Full notes, Half notes, and quarter notes like you would see on sheet music.

The original used a single character as the note. I modified it to use character pairs. The first character is still the note, but now it uses a special second character, W, H, Q, E, or S to specify the length of each note. For example, `bWbWbW` plays three whole `b` notes. This also means all of my piano strings take up double the number of characters as Xem's original. While my song strings are twice as long, I also don't need separate tracks for each note length.

I spent a week trying notes at random and trying to make something that wasn't horrible. You can hear what I came up with within the game. You can see all the songs in [music.mjs](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/consts/music.mjs) I tried most of the Unicode library and did find some interesting "notes". I wrote [zipString()](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/utils/zipString.mjs) with the idea that I could change the "beat" (aka note length) over the same series of notes. (And only now do I see that I have a [typo in my documentation](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/utils/zipString.mjs#L6). 😅) It's only used for the [trash compactor music](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/utils/zipString.mjs#L6) but I had started defining lists for [melody](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/consts/music.mjs#L35) and [beats](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/consts/music.mjs#L41).


---
# 4. Graphics

I've really admired some of the 1-bit graphics I've seen others create. So I wanted to try my hand at it. A 1-bit image contains only two colors, typically black and white. I wanted transparency to be one of my "colors", so I wrote a function that can copy an image, and replace the black with a color of my choice, and the white with transparent.

I started with [micro-rougelike](https://www.kenney.nl/assets/micro-roguelike), The 1-bit version is only 931 bytes. Then I wrote [addColorImage](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/canvas/addColorImage.mjs) to create colored versions of the image. This allowed me to spend only 931 bytes, but load 43.2 kB (16 x 2.7 kB) of colored images. I went with a classic CGA 16 colors to go with the retro look.

I dreamed that I would modify the images to better match my game. I especially wanted to turn the player into a little bulldozer or a little Wall-E style character. I ran out of time before I could do any of that. So instead of created a [block list](https://github.com/ripter/js13k/blob/js13kgame-entry-2021/2021/src/utils/createRandomTrashBlocks.mjs#L28) of tiles that didn't look good when used as trash blocks. This means there are several tiles that are just unused in the game. Given more time, I wanted to use this space to make some simple animations.


---
# 5. In Retrospect

I liked working with this hybrid ECS. Maybe it could be called an Entity, Tag, Generator, System (ETGS, or ETSG). Thinking of Components as tags without data helped me test and refactor ideas on a whim. Having all the data on the entity allowed for a simple API that used plain object notation (`entity.x = 64`). Generators have a two-fold benefit, creating a private scope and making it easy to write sequential logic.

It's hard to tell exactly how much of the game code is just the engine/architecture. The entire project, Engine, Assets, HTML, and sounds all included was only 7,777 bytes. Well under my 13KB limit. I have hopes that the "engine" part is under 1KB, but I won't know for sure until I break it apart and separate it from the rest of the game.

For music and sound effects, next time I'll use [ZzFXM](https://keithclark.github.io/ZzFXM/). I've seen other people make some really amazing songs and sound effects with it, and it is tiny. An example song is 161 seconds long but only takes up 940 bytes. Nothing I handcraft will come close to this tiny size.

One thing I missed was writing tests. I like the Red/Green cycle and it helps ensure the code stays fixed. In retrospection, I could have written tests. The testing libraries and test files wouldn't be included in the final zip. So their size wouldn't matter. I did feel like my time was too short to write and maintain tests as I progressed. I re-wrote the collision and physics systems at least three times during the game. Sometimes because they didn't work, and once because I changed the way the game works. (Switched from AABB collision to tile collision). I doubt I would have been able to make those re-writes if I had to update a bunch of tests along the way.


I'm excited to play around with more Generators. They have several advantages, but I'm not used to thinking "in generator" yet.  I'm sure a better developer will be horrified at my use of a callback instead of a generator for animation frames. I'm still learning when I should use a Generator and when I should use a System. My simple guideline so far is that Systems work on collections of entities, while a Generator works on a single entity. But even that guideline includes significant overlap. Systems have the advantage of always running in a defined order. (System A always runs before System B). While Generators are dynamic and can be added and removed in any order. Both have their advantages and it will take some time to learn which tasks are better for each solution.
