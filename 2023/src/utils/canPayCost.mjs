
/**
 * Determines if the provided dice can cover the given cost.
 * 
 * @param {number[]} cost - The dice values required to pay the cost.
 * @param {number[]} dice - The dice available to the player.
 * @returns {boolean} Returns true if the dice can cover the cost, otherwise false.
 * 
 * @example
 * canPayCost([2, 2, 3], [2, 3, 1, 2]); // true
 * canPayCost([2, 2, 3], [2, 3, 1, 3]); // false
 */
export function canPayCost(cost, dice) {
  // Clone dice to avoid modifying the original array
  let diceCopy = [...dice];

  for (let i = 0; i < cost.length; i++) {
    const costIndex = diceCopy.indexOf(cost[i]);
    if (costIndex !== -1) {
      // Remove the found dice from diceCopy
      diceCopy.splice(costIndex, 1);
    } else {
      return false;
    }
  }
  return true;
}
