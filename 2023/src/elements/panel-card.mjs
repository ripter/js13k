import { dispatchClaimMatch } from '../state/dispatchClaimMatch.mjs';

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

    elm.innerHTML = matches.map(match => `<div class="match" data-key=${match.key}>
      <dt>${match.name}</dt>
      <dd>${match.description}</dd>
      <dice-list 
        values="${match.dice.map(d => diceValues[d]).join(',')}" 
        selected="${currentDice.map(d => diceValues[d]).join(',')}"
      ></dice-list>
      <button type="button">Claim</button>
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
      console.log('Submit Action!', key, this);
      return dispatchClaimMatch(key);
    }
  }

}

customElements.define('panel-card', PanelCard);
