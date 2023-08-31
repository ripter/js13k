import { rollDice } from '../rollDice.mjs';

class ScenarioCard extends HTMLElement {
  constructor() {
    super();
    this.playerState = null;
    this._card = {};
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
      matches = [],
    } = this._card;
    const diceValues = this.playerState?.diceValues ?? [];
    const diceResults = this.playerState?.rollPopulation() ?? [];
    
    const matchesHTML = matches.map((match, idx) => {
      return `<div class="match" data-idx=${idx}>
        <dt>${match.name}</dt>
        <dd>${match.description}</dd>
        <div class="dice-list">
          ${match.dice.map(d => `<dice-icon value="${diceValues[d]}"></dice-icon>`).join('')}
        </div>
      </div>`;
    }).join('');

    // render everything
    this.innerHTML = `
      <div class="scenario-card">
        <h2>${name}</h2>
        <p>${description}</p>
        <b>Population Roll:</b>
        <div class="dice-list">
          ${diceResults.map(d => `<dice-icon value="${diceValues[d]}"></dice-icon>`).join('')}
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
