# Day 9 - Physics Bugs!


So the way the track works right now. It checks for all collisions between `on-track` and `track` entities. Then it applies `entityOnTrack.deltaX = trackEntity.pushX`

When updating all the `movable` entities, it checks if `velocity` truthy, and if so, it uses `x = timeDelta * entity.deltaX * entity.velocity` to calculate the new position.

This does work, but with bugs. On curved tracks we want the trash to look like it stays on the track. We might even want to rotate it as the track rotates.

Currently, the curved track sets a position just outside of the track tile. Then the straight tracks continued to update the erroneous position.

. The  But whenever the `on-track` encounters a curved track, we get the wrong x,y position. This causes the trash to look like it's no longer on the tracks.


So my original thought was that I could re-use the existing physics stuff to move the trash block on the track. Just like when it was all controlled by `pushable`. But I needed more that I could get with a simple `pushable`. I wanted the trash block to move slowly along the tracks. Like they are rolling along the tracks. I want rotation along with curved tracks. These things could not be done with the simple `pushable` system. I could attempt to slow down the block with the push via delay timer. But that creates an ugly jerky movement. It also didn't give me a place to put in rotation logic.

So I attempted to stuff `track, on-track` in the existing push physics system in an attempt use the existing logic. But in order to stuff it in to the physics system, I still had to split everything up into two paths.

I resisted not using such a good bit of code. If everyone's delta's where applied, who would collide? Don't apply delta's to those entities. I spend a bunch of time writing it, so I wanted to use it! And in doing so, I ended up with a check for `velocity` before deciding how to apply the delta to the entity's position. But I need a different way to calculte the moving blocks position. So I guess I need to break things up into their own systems.

## Caching an refactoring

I had written `byComponents()` that returned an array of all the entities with the matching components. Then I passed that to `createEntityMap` that converted the list into a Map with the position (or delta position) as the key. This makes it easy to find an entity from the tile position. Passing these Maps into `createCollisionMap` finds the entities that have conflicting keys, aka they are on the same tile position.

I decided to refactor `byComponents()` to return a Map of entities. This saves the step of always passing the result to `createEntityMap()`. I added a simple cache so that multiple calls with the same component list will return the existing map instead of createing a new one each time.



## `pusher, pushable` system

When a `pusher` and a `pushable` collide, The `pushable` entity should move in the pushed direction.
Unless, moving in the pushed direction would cause it to collide with a solid. If a collision would occur, stop pushing on the entity.

Delta position set on **pushable** is applied to the entity's position.

## `pushable, track` system
When **pushable** and **track** collide. Remove the **pushable** component and add the **on-track** component.

## `track, on-track, solid` system



When an **on-track** is colliding with a **track** entity; move the **on-track**'s position by applying the track's pushing direction and speed.
Unless the calculated position would move into a **solid**. If that happens, reset the **on-track** position to before it collided, and remove the **on-track** component from the entity.

When **movable** is colliding with **track**. As in the case where `track, on-track, solid` system hit a solid and removed the **on-track** commponent.
* Remove the **movable** component.
* Add the **scorable** component.


# Cache'd Maps.

There are two primary ways we get the keys used to make a Map of entities. 