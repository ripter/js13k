# Day 13 - Compacting Trash.

The player can move items into the compactor, now we need to compact and score it. But how do we do that? Right now the only controls are the movement keys. We could add a button. Then the player could use that button to push a button on the compactor. The button could also be used to allow the player to pull on the trash instead of pushing it. Or if we want to avoid adding a button, we could have the player move into the button instead of requiring a button.

In both cases, there is a button the user needs to push to activate the compactor.

What happens to items that don't fit in the compactor? Does the compactor show some sort of error? If that is the case, then the user needs a way to pull items out of the compactor. If the compactor just breaks the item and crush everything inside, then the abilty to pull is not required.

Is one case harder to build than the other? Or if we build it one way, would it be challenging to convert to the other?

Both cases need a button for the user to press.
Both cases need to handle overflow items.
Both cases need to compact the trash and score.

Adding a button really seems more like an interface thing. Nothing I listed above would change between having or not having the user press a button. Sooo, let's skip the button input and let the player push into the trigger instead of standing next to it and pushing a button.


## Implementation 

When the user pushes into the compact button, the compression animation starts. Player input should pause while tha animation plays. The open gap in the compactor should fill with a wall which moves left in an animation, pushing all the blocks together. When the animation is over, there should be a compressed 2x2 block left over. That block should animate and move into the scoring box.

If the player pushes the switch with nothing in the compactor, the animation of the compacting still plays, pausing the players input.

So to build this, I need several things.

1. Detect with the player pushes into the compactor button.
2. Pause player input while animation plays.
3. Fade in compactor wall, breaking up any trach blocks blocking it and pushing them out of the compactor.
4. Animate the compactor wall, pushing the blocks together so they render overlapping. This means removing the `solid` component.
5. Animate the compactor wall moving back and fading out again.
6. Move the compacted box to the score zone.