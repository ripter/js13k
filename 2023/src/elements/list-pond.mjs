import { dispatchChallenge } from '../dispatch/challenge.mjs';

class ChallengePond extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
  }

  render(props) {
    const { pond, deck } = props;
    // Extract the pond cards from the deck using the provided indices
    const pondCards = pond.map(idx => deck[idx]);

    // Render each card-challenge in a CSS grid
    const html = `${pondCards.map((card, idx) => `
      <card-challenge 
        data-idx=${pond[idx]}
        name="${card.name}"
        rating="${card.rating}"
        rewards="${card.rewards}"
      ></card-challenge>
    `).join('')}`;

    // this.classList.add('grid-container');
    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

  async handleClick(evt) {
    const { target } = evt;
    const elm = target.closest('card-challenge');
    if (!elm) { return }
    const { idx } = elm.dataset;

    await dispatchChallenge(idx);
  }
}

customElements.define('list-pond', ChallengePond);
