const TYPE_TO_EMOJI = {
  grail: '🏆',
  shard: '🗡️',
  stone: '💎',
  manuscript: '📜',
  missingNo: '🈚'
};

const TYPE_TO_NAME = {
  grail: 'The Holy Grail',
  shard: 'Excalibur\'s Shard',
  stone: 'The Alchemist\'s Stone',
  manuscript: 'The Saint\'s Manuscript',
  missingNo: '🈚'
}

class ImageReward extends HTMLElement {
  static get observedAttributes() {
    return ['type'];  // list of attributes to observe for changes
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') ?? 'missingNo';
    const html = `${TYPE_TO_EMOJI[type]} <b>${TYPE_TO_NAME[type]}</b>`;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('image-reward', ImageReward);
