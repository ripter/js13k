import { dispatchClaimMatch } from '../state/dispatchClaimMatch.mjs';
import { canPayCost } from '../utils/canPayCost.mjs';

class PanelCard extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  renderMatchList(props) {
    const { diceValues } = props;
    const currentDice = props.player.dice;
    const { matches } = props.card;
    const elm = this.querySelector('.match-list');

    // TODO: Show if this match has been claimed.
    elm.innerHTML = matches.map(match => `<div class="match" data-key=${match.key}>
      <dt>${match.name}</dt>
      <dd>${match.description}</dd>
      <div class="flex space-between">
        <dice-list 
          values="${match.dice.map(d => diceValues[d]).join(',')}" 
          selected="${currentDice.map(d => diceValues[d]).join(',')}"
        ></dice-list>
        <button 
          type="button" 
          ${canPayCost(match.dice, props.player.dice) ? '' : 'disabled'}
        >🧧 Claim</button>
      </div>
    </div>`).join('');
  }

  render(props) {
    if (!props) { 
      return this.innerHTML = "<!-- No State -->";
    }
    const { name, description } = props.card;

    this.innerHTML = `
      <h2>${name}</h2>
      <p>${description}</p>
      <div class="match-list"></div>
    `;

    this.renderMatchList(props);
  }

  handleClick(evt) {
    const { target } = evt;
    const elmParent = target.closest('.match');
    const isButton = target.tagName === 'BUTTON';
    const { key } = elmParent.dataset;

    if (isButton) {
      return dispatchClaimMatch(key);
    }
  }

}

customElements.define('panel-card', PanelCard);
