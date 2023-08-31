import { loadJSON } from './loadJson.mjs';
import { rollDice } from './rollDice.mjs';

export class Player {
  constructor() {
    // 1 Food and 1 Water is consumed every time a population dice is rolled.
    // Yes, re-rolls consume another +1 of each.
    // Items & Buildings can allow re-rolls that do not consume Food/Water.
    // When you run out of Food or Water, a cannibalism event is triggered.
    // When your population reaches 0, Game Over.
    // this.food = 8;
    // this.water = 8;
    // this.population = 4; // Each person grants 1 dice.
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

    // some calculated values
    this.maxDiceValue = this.diceValues.length ?? 0;
  }

  /**
   * Loads a random Card from the deck.
   * Removes the Card from the deck so it cannot be picked again.
   */
  async loadRandomCard() {
    // Randomly pick a card from the deck
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const cardOption = this.deck[randomIndex];

    // Load the card's data
    const card = await loadJSON(`cards/${cardOption.src}`);

    // Remove the selected card from the deck to ensure it's not picked again
    this.deck.splice(randomIndex, 1);

    this.card = card;
    return this.card;
  }

  /**
   * Rolls dice for the population and subtracts the cost.
   * @returns array of dice results.
   */
  rollPopulation() {
    const rolledDice = rollDice(this.population, this.maxDiceValue);
    const dicePaidFor = [];

    for (const dice of rolledDice) {
      // Check if there's enough food and water to pay for the dice
      if (this.food > 0 && this.water > 0) {
        this.food -= 1;
        this.water -= 1;
        dicePaidFor.push(dice);
      } else {
        // If not enough resources, break the loop and return the dice paid for so far
        break;
      }
    }

    return dicePaidFor.length ? dicePaidFor : [];
  }

}
