# Day 14 - input system

In my refactor of the systems, I combined the user's input with the player system. isolated, this works fine. But now that I want the player to push a button, it doesn't quite work. I can see two options here:

1. Add something to the playerSystem to handle the player pushing the button.
2. Split the user input into a seprate entity/system that is read by the playerSystem and the  pushButtonSystem.

I like the second option best. I can store the user's input and then refrence it in several different systems. 

So how do it? One of the key requirements is to debounce the user's input. Holding down the moveLeft shouldn't trigger on every tick. It needs a delay. Idealy a system like the playerSystem should be able to check `isPressed(keyLabel)`, and it returns true for the first tick, but not for the subsequent until after the delay has passed. But how can I set the value, and then reset it until the delay?

I could have two input systems, one to set the value and another to clear it. That could work, but I feel like there is a better solution. If the key was pressed last tick, and it's still pressed this tick, then we shouldn't count it as down.

If use a Map instead of a Set, I could hold a refrence to how long ago the button was pressed. Do I need to keep the delay for every key, or just the last key? For the moment, we can keep the delay for all keys. If we need to make it per key later, we can always add that feature.

### pseudo code
If a key was pressed, and delay === 0; Mark the key as being pressed, reset delay = DELAY_TIME.
If a key was pressed and delay > 0; Clear the key/don't mark it.
If delay > 0, subtract delta.

### implementation
```
// If there is no delay and a key was pressed.
// Set it on the entity.
if (delay <= 0 && pressedKeys.size > 0) {
  for (let key of pressedKeys) {
    inputEntity.downKeys.add(key);
    delay = DELAY_TIME;
  }
}
// If we are in delay, clear the key set.
else if (delay > 0) {
  inputEntity.downKeys.clear();
  delay -= delta;
}
```

Now a system can check if a key is pressed like this:

```
const { downKeys } = byID('input');

if (downKeys.has('left')) {
  // do something when the left key is down.
}
```

