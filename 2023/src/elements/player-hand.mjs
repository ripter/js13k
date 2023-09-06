
class PlayerHand extends HTMLElement {
  render(props) {
    const cards = JSON.parse(this.getAttribute('cards') ?? '[]');
    // const html = `<div class="hand-container">
    //   ${cards.map(cardKey => `
    //     <card-challenge class="card-in-hand" data-card-idx="${cardKey}"></card-challenge>
    //   `).join('')}
    // </div>`;
    const html = `${cards.map(cardKey => `<div class="flex-column">
      <card-challenge class="card-in-hand" data-card-idx="${cardKey}"></card-challenge>
      <button class="w-5">Pick</button>
    </div>`).join('')}`;

    this.classList.add('flex-center','gap-1');
    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

  handleCardSelection(cardId) {
    // Handle the logic for when a card is selected
    // E.g., emit a custom event, change the card's appearance, etc.
    this.dispatchEvent(new CustomEvent('cardSelected', { detail: { cardId } }));
  }
}

customElements.define('player-hand', PlayerHand);
