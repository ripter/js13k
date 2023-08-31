
class DiceList extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['values', 'selected'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  get values() {
    return (this.getAttribute('values') || '').split(',').map(v => v.trim());
  }

  get selected() {
    return (this.getAttribute('selected') || '').split(',').map(v => v.trim());
  }

  render() {
    const { values } = this;
    const selectedValues = [...this.selected];

    let diceListHTML = values.map(value => {
      const selectedIdx = selectedValues.findIndex(v => v === value);
      const isSelected = selectedIdx === -1 ? false: true;
      const className = isSelected ? '' : 'inverted';

      if (isSelected) {
        selectedValues.splice(selectedIdx, 1);
      }
      return `<dice-icon class="${className}" value="${value}"></dice-icon>`;
    }).join('');

    this.innerHTML = `<div class="dice-list">
      ${diceListHTML}
    </div>`;
  }
}

customElements.define('dice-list', DiceList);
