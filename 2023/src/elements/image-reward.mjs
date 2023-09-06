const TYPE_TO_EMOJI = {
  grail: '🏆',
  shard: '🗡️',
  stone: '💎',
  manuscript: '📜',
  missingNo: '🈚'
};

class ImageReward extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'name'];  // list of attributes to observe for changes
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const value = this.getAttribute('value') || 'missingNo';
    const name = this.getAttribute('name') || 'Missing No.';

    console.log(name, value)
    const html = `${TYPE_TO_EMOJI[value]} <b>${name}</b>`;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('image-reward', ImageReward);
