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
    return ['type'];  
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const reward = this.getAttribute('type') ?? 'missingNo';
    const parts = reward.split(' ');
    let html = `${TYPE_TO_EMOJI[reward]} <b>${TYPE_TO_NAME[reward]}</b>`;

    if (parts.length === 2) {
      html = `<image-pawn value="${parts[0]}" type="${parts[1]}"></image-reward>`;
    }

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('image-reward', ImageReward);
