# Day 10

Lots of systems, each with a specific goal.


## `track`, `on-track`, `solid` system.

This is the system that moves entites along the track. When the **on-track** entity is colliding with one or more **track** entities, it's position is updated to move it along the track at speed. 

If moving the **on-track** item would push it into a **solid** block, stop movement. The stopped entity is eligible for scoring.



## `input`, `movable-group`, `solid` system

This system allows the player to push around entities as a group. If pushing the group would cause any entity in the group to collide with a **solid**, then cancel the move and push.

When the user presses the movement keys, it moves the entity. (The only entity with the **input** component is the player.) If moving the entity would cause it to collide with a **movable-group** entity. Check if moving the **movable-group** would cause it to collide with a **solid**. If moving the **movable** doesn't cause it to collide with a **solid**, then move everything in the **movable-group**. If not, then don't move the **movable-group** or the **input** entity.


## `movable-group`, `track` system

This system converts an entity in a **moveable-group** into an entity that is **on-track**.


When a **movable-group** collides with a **track**, remove the specific entity that is colliding from the **movable-group** and give it the **on-track** component.


## `scorable`, `in-compactor` system

This system checks for round over by chekcing for **scorable** entities that are not colliding with `in-compactor` entities. Any **scorable** entity that exists ouside of the compactor (because they hit a solid on the track) means the compactor is full.

When the compactor is full, it is time to compact the trash and add it to the score.