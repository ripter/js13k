import { dispatchChallenge } from '../dispatch/challenge.mjs';

class ChallengeModal extends HTMLDialogElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
    this.addEventListener('change', this.handleChange);
  }

  get adjustedRating() {
    return this.cardRating.map((val, idx) => this.deltaRating[idx] + val)
  }
  get strength() {
    return this.adjustedRating.reduce((acc, v) => acc + parseInt(v, 10), 0);
  }

  render(props) {
    const { challengeIdx } = props;
    const card = props.deck[challengeIdx];

    if (!card) {
      return this.renderClosed();
    }
    // Save the card original rating so we can use math on updates.
    this.cardRating = card.rating;
    this.deltaRating = [0, 0, 0];

    const html = `
      <!-- Display the target value the player needs to beat -->
      <h2 class="target-number">
        <image-pawn type="castle" value="${this.strength}"></image-pawn>
        ${card.name}
      </h2>
      <div class="pre-roll">
        <p>
          Roll <b>2d6</b> to match or beat ${this.strength}.
        </p>
        <p>
          Spend Resources to reduce the Challenge Strength.
        </p>
      
        <!-- Display pawn input values to modify odds -->
        <div class="pawn-inputs">
          <div class="pawn-input">
            <label>🛡️ Army:</label>
            <input data-pawn-type="red" type="number" min="0" max="${card.rating[0]}" value="0" />
          </div>
          <div class="pawn-input">
            <label>🏇 Cavalry:</label>
            <input data-pawn-type="green" type="number" min="0" max="${card.rating[1]}" value="0" />
          </div>
          <div class="pawn-input">
            <label>📿 Monks:</label>
            <input data-pawn-type="blue" type="number" min="0" max="${card.rating[2]}" value="0" />
          </div>
        </div>
      
        <!-- Display roll button and back button -->
        <div class="modal-controls">
          <button type="cancel">Back</button>
          <button type="roll">Roll Dice</button>
        </div>
      </div>
      <div class="post-roll">
        <!-- Display roll results -->
        <div class="roll-result">
          <p>Your Roll: <span class="roll-number">-</span></p>
        </div>
      
        <!-- Animate reward on success -->
        <div class="reward-animation">
          ${card.rewards.map(reward => (
            `<image-reward type="${reward}"></image-reward>`
          ))}
        </div>
      </div>
    `;

    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }

    if (challengeIdx === -1) {
      this.renderClosed();
    }
    else {
      this.renderOpened();
    }
  }

  renderClosed() {
    this.style.display = 'none';
    this.close();
  }

  renderOpened() {
    this.style.display = 'flex';
    this.showModal();
  }

  async handleClick(evt) {
    const { target } = evt;
    if (target.nodeName !== 'BUTTON') { return; }
    const buttonType = target.getAttribute('type');

    switch(buttonType) {
      case 'cancel': 
        // -1 closes us
        await dispatchChallenge(-1);
        return;
      case 'roll':
        const rollResult = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1); // Roll 2d6
        const rollSpan = this.querySelector('.roll-number');
        rollSpan.textContent = rollResult;

        if (rollResult >= this.strength) {
          // Animate the reward
          // const rewardDiv = this.querySelector('.reward-animation');
          // rewardDiv.style.transform = 'scale(1.5)'; // Example animation
        } else {
          // this.renderClosed();
        }
        return;
      default:
        return;
    }
  }

  async handleChange(evt) {
    const indexMap = { 'red': 0, 'green': 1, 'blue': 2 };
    const { target } = evt;
    const { pawnType } = target.dataset;
    const idx = indexMap[pawnType];
    const elmChallenge = this.querySelector('.target-number image-pawn');

    this.deltaRating[idx] = -1 * parseInt(target.value);
    elmChallenge.setAttribute('value', this.strength);
  }

}

customElements.define('modal-challenge', ChallengeModal, { extends: 'dialog' });
