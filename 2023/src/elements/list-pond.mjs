
class LocationPond extends HTMLElement {
  render(props) {
    const html = `<h1>BlankElement</h1>`;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

}

customElements.define('list-pond', LocationPond);
