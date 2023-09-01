import { loadJSON } from '../utils/loadJSON.mjs';

export async function actionLoadCard(state) {
  const { deck } = state;
  // Each Tribe contains a Deck of Scenario Cards.
  // Pick a random card from the deck and set it as active.
  const randomIndex = Math.floor(Math.random() * deck.length);
  const cardOption = deck[randomIndex];

  // Load the card's data
  const card = await loadJSON(`cards/${cardOption.src}`);
  // Hydrage the card
  card.matches = card.matches.map((match, idx) => ({
    ...match,
    claimed: false,
    key: '' + idx,
  }));

  return {
    ...state,
    card,
    deck: deck.filter(d => d !== cardOption),
  }
}