import { actionRollDice } from './actionRollDice.mjs';
import { get } from '../utils/get.mjs';
import { loadJSON } from '../utils/loadJSON.mjs';

export async function actionLoadCard(state) {
  const { deck, diceValues, seasonCount, opponents } = state;

  // Pick a random card from the deck and set it as active.
  const randomIndex = Math.floor(Math.random() * deck.length);
  const cardOption = deck.splice(randomIndex, 1)[0];  // Remove card from deck

  // Load the card's data
  const card = await loadJSON(`cards/${cardOption.src}`);

  // Hydrate the card
  card.matches.forEach((match, idx) => {
    match.claimedBy = false;
    match.key = '' + idx;
  });

  // Roll the dice for player and all opponents
  actionRollDice(state, 'player');
  opponents.forEach((_, idx) => actionRollDice(state, `opponents[${idx}]`));

  const actor = get(state, state.currentActorPath);
  const actorDice = actor.dice;

  // Log Starting the card.
  state.gameLog.push({
    actorPath: 'player',
    season: seasonCount,
    description: `As the Season starts, ${actor.name} arrive at ${cardOption.name}.
    With a ${state.name} population of ${actor.population}, you start with ${actorDice.map(d => diceValues[d]).join(', ')} resources.
    `,
  });

  // Log the Opponent start.
  opponents.forEach((opponent, i) => {
    state.gameLog.push({
      actorPath: `opponents.${i}`,
      season: seasonCount,
      description: `An opponent arrives at ${cardOption.name}.
      With a ${state.name} population of ${opponent.population}, they start with ${opponent.dice.map(d => diceValues[d]).join(', ')} resources.
      `,
    });
  });

  state.card = card;
  return state;
}
