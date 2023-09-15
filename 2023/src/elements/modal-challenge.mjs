import { dispatchChallenge } from '../dispatch/challenge.mjs';
import { roll2d6 } from '../utils/roll2d6.mjs';

export const NAME_TO_IDX = { 'red': 0, 'green': 1, 'blue': 2 };

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
    this.player = props.player;

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
          <p>Your Roll: <span class="roll-result">-</span></p>
        </div>
      
        <div class="result-win">
          <h3>You Win!</h3>
          ${card.rewards.map(reward => (
            `<image-reward type="${reward}"></image-reward>`
          ))}
        </div>

        <div class="result-lose">
            <h3>You Lost</h3>
        </div>

        <div class="modal-controls">
          <button type="cancel">End Turn</button>
        </div>
      </div>
    `;

    this.classList.remove('rolled', 'win', 'lose');
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

    console.log('buttonType', buttonType);
    switch(buttonType) {
      case 'cancel': 
        // -1 closes us
        await dispatchChallenge(-1);
        return;
      case 'roll':
        console.log('Roll the Dice!');
        this.classList.add('rolled');
        const rollResult = roll2d6();
        const elmRollResult = this.querySelector('.roll-result');
        elmRollResult.textContent = rollResult;

        if (rollResult >= this.strength) {
          this.classList.add('win');
          console.log('Winner!', this.classList);
        } else {
          this.classList.add('lose');
          console.log('Loser!', this.classList);
        }
        return;
      default:
        return;
    }
  }

  /**
   * Handles Pawn Delta Input
   */
  async handleChange(evt) {
    const { target } = evt;
    const { pawnType } = target.dataset;
    const idx = NAME_TO_IDX[pawnType];
    // The number of pawns the user wants the spend on this card.
    const deltaValue = Math.min(
      parseInt(target.value),  // Player Input.
      this.cardRating[idx], // Max the card allows to the player to spend.
      this.player[pawnType], // Max player can spend.
    );

    // Update the delta.
    this.deltaRating[idx] = -1 * deltaValue;
    // Update the element, in case we had to limit it.
    target.value = deltaValue;

    // Update the Challenge element with the new value.
    const elmChallenge = this.querySelector('.target-number image-pawn');
    elmChallenge.setAttribute('value', this.strength);
  }

}

customElements.define('modal-challenge', ChallengeModal, { extends: 'dialog' });
