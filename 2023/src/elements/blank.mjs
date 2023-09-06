
class BlankElement extends HTMLElement {
  render(props) {
    this.innerHTML = `<h1>Blank Custom Element</h1>`;
  }
}

customElements.define('dice-icon', DiceIcon);
