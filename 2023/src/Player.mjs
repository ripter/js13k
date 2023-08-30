import { loadJSON } from './loadJson.mjs';

export class Player {
  constructor() {
    // 1 Food and 1 Water is consumed every time a population dice is rolled.
    // Yes, re-rolls consume another +1 of each.
    // Items & Buildings can allow re-rolls that do not consume Food/Water.
    // When you run out of Food or Water, a cannibalism event is triggered.
    // When your population reaches 0, Game Over.
    this.food = 8;
    this.water = 8;
    this.population = 4; // Each person grants 1 dice.
    this.buildings = []; // Buildings are permanent boosts that always take effect.
    this.items = []; // Items are one time boots that can be used by the player.
    this.card = null; // Active Card.
  }

  /**
   * Creates a new Player State from a Tribe JSON.
   */
  async loadFreshTribe(url) {
    // Save the tribe info for easy refrence.
    const data = await loadJSON(url);

    // Update from the JSON file.
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  /**
   * Loads a random Card from the deck.
   */
  async loadRandomCard() {
    const cardOption = this.deck[Math.random() * this.deck.length | 0];
    const card = await loadJSON(`cards/${cardOption.src}`);

    // Hydrate the card's state
    card.population = this.population;
    card.diceValues = [...this.diceValues];

    
    this.card = card;
    return this.card;
  }
}
