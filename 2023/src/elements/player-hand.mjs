
class PlayerHand extends HTMLDialogElement {
  render(props) {
    // const cardIdxs = JSON.parse(this.getAttribute('cards') ?? '[]');
    const cardIdxs = this.getAttribute('cards').split(',');
    // TODO: get cards from props.deck
    const cards = cardIdxs.map(idx => props.deck[idx]);
    console.log('cards',cards);

    const html = `${cards.map(card => `<div class="flex-column">
      <card-challenge 
        name="${card.name}"
        rating="${card.rating}"
        rewards="${card.rewards}"
      ></card-challenge>
      <button class="w-5">Pick</button>
    </div>`).join('')}
    <p class="rules">
      Pick a card to replace the one you used.
    </p>
    `;

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

customElements.define('player-hand', PlayerHand, { extends: 'dialog' });
