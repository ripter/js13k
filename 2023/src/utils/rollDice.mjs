
export function rollDice(numberOfDiceToRoll, maxDiceValue) {
  let results = [];
  for (let i = 0; i < numberOfDiceToRoll; i++) {
    results.push(Math.floor(Math.random() * maxDiceValue));
  }
  return results;
}