
const TYPE_TO_EMOJI = {
  red: '🛡️',
  green: '🏇',
  blue: '📿',
  castle: '🏰',
  orange: '🍊',
};
const TYPE_TO_TOOLTIP = {
  red: 'Army',
  green: 'Cavalry',
  blue: 'Monks',
  castle: 'Strength',
  orange: 'Oranges are delicious',
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

    

    const html = `<span title="${TYPE_TO_TOOLTIP[type]}">
      <span>${TYPE_TO_EMOJI[type]}</span> <b>${value}</b> 
    </span>`;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('image-pawn', ImagePawn);
