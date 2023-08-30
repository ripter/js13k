
const EMOJI_MAP = {
  'Pray': '🙏',
  'Gather': '🎒',
  'Explore': '👣',
  'Attack': '⚔️',
};


class DiceIcon extends HTMLElement {
  constructor() {
    super();
    this._value = null;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.render();
    }
  }
  get value() {
    return this.getAttribute('value');
  }

  render() {
    const { value } = this;
    this.innerHTML = `<span class="icon icon-dice">${EMOJI_MAP[value] || '❓'}</span>`;
  }
}

customElements.define('dice-icon', DiceIcon);
