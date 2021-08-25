# Map Collision

Since the game is grid based, we can avoid looping over a lot of lists by creating Maps in memory. 

## Example, player

if the player's next tile position contains a pushable's sprite, then also apply the player's delta to the pushable's delta.


# Groups

In my first pass, I make a group an enetity with an array of childIDs. So far this has worked well. But as I try the Map Collision, I'm starting to see advantages in not making the parent an entity at all, and just keep it a a UUID parentID on the "children".

For things like collision and pushing, if any of the children would change delta, every child in the group should also change delta. 

To make this work with the array of childIDs, I had a system that updated each child. But it ran after physics update, which means it was always a tick behind.

**Update**

I got rid of the "parent" entity and instead I give all the "child" entities the same `parentID` prop. This makes it a lot easier to check for collisions and to see if the collider is part of the same group or not. To help with moving, I added an `inGroup` function that returns all the entities in the same "group" aka, have the same parentID. If it doesn't have a parentID, it just returns the orignal item.

