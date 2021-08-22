#  Pusher and Pushable

The trash blocks have the component pushable, so we know they can be pushed around in the screen. They also have the solid component so other blocks can not move though them. 

Right now, there are two types of pushers, the player and conveyors. 

The player pushes when next to a pushable and is moving in the direction of the pushable. 
The conveyors push when in the same tile as a pushable and have a defined direction. 

I would like to have one pusher check, instead of the two checks I have now. 

Idea 1, add the player in the next position on the pusherMap. then all checks can be done with current position checking. Remove the pusher component from player so they don’t show uo in the old position on the map.  

for each pushable, check if they are on the same tile as a pusher, if so update the group delta. 
if the delta causes a collision with a solid, cancel the group delta. 



