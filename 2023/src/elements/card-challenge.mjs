
class ChallengeCard extends HTMLElement {
  render(props) {
    const { cardIdx } = this.dataset;
    if (!cardIdx) { return this.innerHTML = '<!-- No Card Index -->'; }
    const { name, rating, rewards } = props.deck[cardIdx];

    const html = `
      <h3 class="center-text mt-0">⚜️ Challenge ️⚜️</h3>
      <div class="challenge flex-center flex-gap-8">
        <span>
          <b>${rating.reduce((acc, v) => acc + v)}</b>
          🏰 
        </span>
        ＝ 
        <image-pawn type="red" value="${rating[0]}"></image-pawn>
        ✚
        <image-pawn type="green" value="${rating[1]}"></image-pawn>
        ✚
        <image-pawn type="blue" value="${rating[2]}"></image-pawn>
      </div>

      <h3 class="center-text">🕯️ Rewards 🕯️</h3> 
      <div class="rewards flex-center flex-gap-8">
        ${rewards.map(reward => 
          (`<image-reward value="${reward}" name="${name}"></image-reward>`)
        ).join('')}
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
