
class BlankElement extends HTMLElement {
  render(props) {
    const html = `<h1>Blank Custom Element</h1>`;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

}

customElements.define('blank-element', BlankElement);
