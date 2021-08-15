import { byParentID } from './byParentID.mjs';


/*
 * Returns a set of entites all in the same group.
*/
export function inGroup(entity) {
  if (entity.parentID) {
    return byParentID(entity.parentID)
  }
  // group of one
  return [entity];
}
