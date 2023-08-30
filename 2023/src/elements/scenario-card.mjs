import { rollDice } from '../rollDice.mjs';

class ScenarioCard extends HTMLElement {
  constructor() {
    super();
    this._card = {};
    this._userDiceValues = [];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  set card(data) {
    this._card = data;
    this._card.maxDiceValue = this._card.diceValues.length;
    this.render();
  }

  set userDiceValues(values) {
    this._userDiceValues = values;
    this.render();
  }

  render() {
    const { 
      name, 
      description,
      diceValues, 
      population,
      maxDiceValue,
      matches = [],
    } = this._card;

    const diceResults = rollDice(population, maxDiceValue);
    console.log('diceResults', diceResults);
    
    const matchesHTML = matches.map((match, idx) => {
      return `<div class="match" data-idx=${idx}>
        <dt>${match.name}</dt>
        <dd>${match.description}</dd>
        <div class="required-dice">
          ${match.dice.map(d => `<dice-icon value="${diceValues[d]}"></dice-icon>`).join('')}
        </div>
      </div>`;
    }).join('');

    // render everything
    this.innerHTML = `
      <div class="scenario-card">
        <h2>${name}</h2>
        <p>${description}</p>
        <div class="">
          <b>Population Roll:</b>
        </div>
        ${matchesHTML}
      </div>
    `;
  }

  handleClick(evt) {
    console.log('handle click', evt);
  }

}

customElements.define('scenario-card', ScenarioCard);
