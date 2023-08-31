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

  render() {
    // Bail if we have no state.
    if (!this.playerState) { return; }
    const { 
      name, 
      description,
      matches = [],
    } = this._card;
    const {
      diceValues = [],
      currentDice = [],
    } = this.playerState;
    
    const matchesHTML = matches.map((match, idx) => {
      return `<div class="match" data-idx=${idx}>
        <dt>${match.name}</dt>
        <dd>${match.description}</dd>
        <dice-list 
          values="${match.dice.map(d => diceValues[d]).join(',')}" 
          selected="${currentDice.map(d => diceValues[d]).join(',')}"
        ></dice-list>
        <button type="button">Claim</button>
      </div>`;
    }).join('');

    // render everything
    this.innerHTML = `
      <div class="scenario-card">
        <h2>${name}</h2>
        <p>${description}</p>
        <b>Population Roll:</b>
        <div class="dice-list">
          ${currentDice.map(d => `<dice-icon value="${diceValues[d]}"></dice-icon>`).join('')}
        </div>
        ${matchesHTML}
      </div>
    `;
  }

  handleClick(evt) {
    const { target } = evt;
    const elmParent = target.closest('.match');
    const isButton = target.tagName === 'BUTTON';
    const matchIdx = elmParent.dataset.idx;

    if (isButton) {
      // TODO: make sure the user can pay for the action.
      console.log('Submit Action!', matchIdx)
      // Dispatch the match action.
      this.playerState.performMatch(matchIdx);
      // re-render with the updated state
      this.render();
    }
  }

}

customElements.define('scenario-card', ScenarioCard);
