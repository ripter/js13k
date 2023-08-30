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
    console.log('setting card data', data);
    this._card = data;
    this._card.maxDiceValue = this._card.diceValues.length;
    this.render();
  }

  set userDiceValues(values) {
    this._userDiceValues = values;
    this.render();
  }

  render() {
    console.log('rendering card', this._card);
    const { 
      name, 
      description,
      diceValues, 
      population,
      maxDiceValue,
      matches = [],
    } = this._card;

    const diceRoll = rollDice(population, maxDiceValue);
    // const matchesHTML = this._card.matches.map(match => {
    //   const requiredDice = match.dice.map(dice => this.diceValues[dice]);
    //   const isClickable = requiredDice.every(val => this._userDiceValues.includes(val));

    //   return `
    //     <div class="match ${isClickable ? '' : 'grayed-out'}">
    //       <h3>${match.name}</h3>
    //       <p>${match.description}</p>
    //       <p>Required Dice: ${requiredDice.join(', ')}</p>
    //       <ul>
    //         ${match.rewards.map(reward => `
    //           <li>${reward.name}: ${Array.isArray(reward.delta) ? reward.delta.join(' to ') : reward.delta}</li>
    //         `).join('')}
    //       </ul>
    //     </div>
    //   `;
    // }).join('');
    const matchesHTML = matches.map((match, idx) => {
      return `<div class="match" data-idx=${idx}>
        <dt>${match.name}</dt>
        <dd>${match.description}</dd>
      </div>`;
    });

    this.innerHTML = `
      <div class="scenario-card">
        <h2>${name}</h2>
        <p>${description}</p>
        <div class="user-dice-values">
          Your Dice: ${this._userDiceValues.join(', ')}
        </div>
        ${matchesHTML}
      </div>
    `;
  }

  handleClick(evt) {
    const matchEl = evt.target.closest('.match');
    if (matchEl && !matchEl.classList.contains('grayed-out')) {
      const population = this._card.matches.find(match => match.name === matchEl.querySelector('h3').textContent).dice.length;
      const rollResults = this.rollDice(population);
      console.log(`Rolled dice for ${population} population:`, rollResults.map(result => this.diceValues[result]).join(', '));
    }
  }

}

customElements.define('scenario-card', ScenarioCard);
