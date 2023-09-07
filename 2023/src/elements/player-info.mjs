
class PlayerInfo extends HTMLElement {
  render(props) {
    const keyPath = this.getAttribute('key-path') ?? 'player';
    const title = keyPath === 'player' ? 'Your Info' : 'Opponent Info';
    const { red, green, blue, items } = props[keyPath];

    const html = `
      <h2 class="flex">${title}</h2>
      <div class="pawn-info">
        <image-pawn type="red" value="${red}"></image-pawn>
        <image-pawn type="green" value="${green}"></image-pawn>
        <image-pawn type="blue" value="${blue}"></image-pawn>
      </div>

      <h2 class="center-text">Items</h2>
      <div class="item-list">
        <image-reward type="grail" disabled="${!items.includes('grail')}"></image-reward>
        <image-reward type="shard" disabled="${!items.includes('shard')}"></image-reward>
        <image-reward type="stone" disabled="${!items.includes('stone')}"></image-reward>
        <image-reward type="manuscript" disabled="${!items.includes('manuscript')}"></image-reward>
      </div>
    `;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('player-info', PlayerInfo);
