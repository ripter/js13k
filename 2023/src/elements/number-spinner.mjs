class NumberSpinner extends HTMLElement {
  static get observedAttributes() { return ['min', 'max']; }
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this);
  }

  get min() {
    return parseInt(this.getAttribute('min') || 0);
  }
  set min(value) {
    this.setAttribute('min', value);
  }

  get max() {
    return parseInt(this.getAttribute('max') || 100);
  }

  set max(value) {
    this.setAttribute('max', value);
  }

  get value() {
    return parseInt(this.querySelector('input').value);
  }

  set value(val) {
    const newValue = Math.min(this.max, Math.max(this.min, val));
    this.querySelector('input').value = newValue;
  }

  render() {
    const html = `
      <button type="button" class="decrement">-</button>
      <input type="number" min="${this.min}" max="${this.max}" value="${this.min}" readonly>
      <button type="button" class="increment">+</button>
    `;

    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }

  handleEvent(event) {
    switch (event.type) {
      case 'click':
        if (event.target.classList.contains('increment')) {
          this.value += 1;
        } else if (event.target.classList.contains('decrement')) {
          this.value -= 1;
        }
        break;
      default:
        // ignore.
    }
    
  }
}

customElements.define('number-spinner', NumberSpinner);
