
class PlayerInfo extends HTMLElement {
  render(props) {
    const { red, green, blue, items } = props.player;

    const itemsHTML = items.length ? 
      items.map(item => `<li>${item}</li>`).join('') : 
      '<li>No items collected.</li>';

    const html = `
      <h2 class="center-text mt-0">Player Info</h2>
      <div class="pawn-info flex-center">
        <image-pawn type="red" value="${red}"></image-pawn>
        <image-pawn type="green" value="${green}"></image-pawn>
        <image-pawn type="blue" value="${blue}"></image-pawn>
      </div>
      <h3 class="center-text">Items:</h3>
      <ul class="item-list">
        ${itemsHTML}
      </ul>
    `;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('player-info', PlayerInfo);
