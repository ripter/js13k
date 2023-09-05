import { loadJSON } from '../utils/loadJSON.mjs';
import { get } from '../utils/get.mjs';
import { actionRollDice } from './actionRollDice.mjs';

export async function actionLoadCard(state) {
  const { deck, diceValues } = state;
  const actorName = get(state, state.currentActorPath)?.name;
  const actorPopulation = get(state, `${state.currentActorPath}.population`);
  // Each Tribe contains a Deck of Scenario Cards.
  // Pick a random card from the deck and set it as active.
  const randomIndex = Math.floor(Math.random() * deck.length);
  const cardOption = deck[randomIndex];

  // Load the card's data
  const card = await loadJSON(`cards/${cardOption.src}`);
  // Hydrage the card
  card.matches = card.matches.map((match, idx) => ({
    ...match,
    claimedBy: false,
    key: '' + idx,
  }));


  // Roll the dice!
  state = actionRollDice(state, 'player');
  for (let i = 0; i < state.opponents.length; i++) {
    state = actionRollDice(state, `opponents[${i}]`);
  }
  const actorDice = get(state, `${state.currentActorPath}.dice`);

  // Log the card.
  state.gameLog.push({
    actorPath: state.currentActorPath,
    season: 1,
    description: `As the Season starts, ${actorName} arrive at ${cardOption.name}.
    With a ${state.name} population of ${actorPopulation}, you start with ${actorDice.map(d => diceValues[d]).join(', ')} resources.
    `,
  });

  return {
    ...state,
    card,
    deck: deck.filter(d => d !== cardOption),
  }
}