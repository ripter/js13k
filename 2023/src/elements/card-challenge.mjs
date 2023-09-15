import { isRoyalReward } from '../utils/isRoyalReward.mjs';


class ChallengeCard extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'rating', 'reward'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const rating = this.getAttribute('rating').split(',');
    const rewards = this.getAttribute('rewards').split(',');
    const isRoyal = isRoyalReward(rewards);

    const title = isRoyal ? '⚜️ Royal Challenge ️⚜️' : `⚜️ ${name} ️⚜️`;

    const html = `
      <h3 class="center-text mt-0">${title}️</h3>
      <div class="challenge">
        <image-pawn type="castle" value="${rating.reduce((acc, v) => acc + parseInt(v, 10), 0)}"></image-pawn>
        <span>＝</span> 
        <image-pawn type="red" value="${rating[0]}"></image-pawn>
        <span>➕</span>
        <image-pawn type="green" value="${rating[1]}"></image-pawn>
        <span>➕</span>
        <image-pawn type="blue" value="${rating[2]}"></image-pawn>
      </div>

      <h3 class="center-text">🕯️ Rewards 🕯️</h3> 
      <div class="rewards flex-center flex-gap-8">
        ${rewards.map(reward => `<image-reward type="${reward}"></image-reward>`).join('')}
      </div>
    `;

    this.classList.add('component-box');
    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }
  }
}

customElements.define('card-challenge', ChallengeCard);
