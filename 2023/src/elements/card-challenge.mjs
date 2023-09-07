import { isRoyalReward } from '../utils/isRoyalReward.mjs';


class ChallengeCard extends HTMLElement {
  render(props) {
    const { cardIdx } = this.dataset;
    if (!cardIdx) { return this.innerHTML = '<!-- No Card Index -->'; }
    const { name, rating, rewards } = props.deck[cardIdx];
    const isRoyal = isRoyalReward(rewards);

    const title = isRoyal ? '⚜️ Royal Challenge ️⚜️' : `⚜️ ${name} ️⚜️`;
    const rewardHTML = isRoyal 
      ? `<image-reward value="${rewards[0]}" name="${name}"></image-reward>`
      : `${rewards.map(reward => {
        const parts = reward.split(' ');
        return `<image-pawn value="${parts[0]}" type="${parts[1]}"></image-reward>`
      }).join('')}`

    const html = `
      <h3 class="center-text mt-0">${title}️</h3>
      <div class="challenge">
        <image-pawn type="castle" value="${rating.reduce((acc, v) => acc + v)}"></image-pawn>
        <span>＝</span> 
        <image-pawn type="red" value="${rating[0]}"></image-pawn>
        <span>➕</span>
        <image-pawn type="green" value="${rating[1]}"></image-pawn>
        <span>➕</span>
        <image-pawn type="blue" value="${rating[2]}"></image-pawn>
      </div>

      <h3 class="center-text">🕯️ Rewards 🕯️</h3> 
      <div class="rewards flex-center flex-gap-8">
        ${rewardHTML}
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
