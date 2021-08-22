# Collision & Pushing

Pushable and Movable:
	Movable moves at a specific speed by `deltaX` and `deltaY`.
	Pushable can be be moved by Player or Conveyor as long as there isn't a solid occupying  the space to be moved. 

Moving a Pushable
	When the Player is next to the the pusbable with a delta that would move it into the same tile as the pushable. The pushable gains delta to move it in the same direction.
	When a Conveyor and pushable occupy the same tile. Conveyor adds belt delta to the pushable.
	
Stopping a pushable.
	If a pushable delta would cause it to move into the same tile as a Solid or another pushable, cancel this pushable's delta.
	

	
