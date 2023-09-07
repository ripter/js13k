
const TYPE_TO_EMOJI = {
  red: '🛡️',
  green: '🏇',
  blue: '📿',
  orange: '🍊',
};

class ImagePawn extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'type'];  // list of attributes to observe for changes
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'orange';
    const value = this.getAttribute('value') || 0;

    

    const html = `
      <span>${TYPE_TO_EMOJI[type]}</span> <b>${value}</b> 
    `;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('image-pawn', ImagePawn);
