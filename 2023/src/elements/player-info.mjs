
class PlayerInfo extends HTMLElement {
  render(props) {
    const html = `<h1>Player Info</h1>`;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

}

customElements.define('player-info', PlayerInfo);
