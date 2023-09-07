
class ChallengePond extends HTMLElement {
  render(props) {
    const { pond, deck } = props;
    // Extract the pond cards from the deck using the provided indices
    const pondCards = pond.map(idx => deck[idx]);

    // Render each card-challenge in a CSS grid
    const html = `${pondCards.map(card => `
      <card-challenge 
        data-card-idx="${deck.indexOf(card)}"
      ></card-challenge>
    `).join('')}`;

    // this.classList.add('grid-container');
    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

}

customElements.define('list-pond', ChallengePond);
