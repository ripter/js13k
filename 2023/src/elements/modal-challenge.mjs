import { dispatchChallenge } from '../dispatch/challenge.mjs';
import { dispatchRollDice } from '../dispatch/rollDice.mjs';
import { roll2d6 } from '../utils/roll2d6.mjs';
import { dispatchWinCard } from '../dispatch/winCard.mjs'
import { dispatchLoseCard } from '../dispatch/loseCard.mjs';

export const NAME_TO_IDX = { 'red': 0, 'green': 1, 'blue': 2 };

class ChallengeModal extends HTMLDialogElement {
  connectedCallback() {
    // First Render, hydrate ourselves so we have a full body.
    this.innerHTML = `
      <h2 class="target-number">
        <image-pawn class="card-strength" type="castle" value="0"></image-pawn>
        <span class="card-name">Placeholder</span>
      </h2>
      <div class="pre-roll">
        <p>
          Roll <b>2d6</b> to match or beat 
          <image-pawn class="card-strength" type="none" value="0"></image-pawn>.
        </p>
        <p>
          Spend Resources to reduce the Challenge Strength.
        </p>
      
        <div class="pawn-inputs">
          <div class="pawn-input">
            <label>🛡️ Army:</label>
            <input data-pawn-type="red" type="number" min="0" max="0" value="0" />
          </div>
          <div class="pawn-input">
            <label>🏇 Cavalry:</label>
            <input data-pawn-type="green" type="number" min="0" max="0" value="0" />
          </div>
          <div class="pawn-input">
            <label>📿 Monks:</label>
            <input data-pawn-type="blue" type="number" min="0" max="0" value="0" />
          </div>
        </div>

        <div class="modal-controls">
          <button type="cancel">Back</button>
          <button type="roll">Roll Dice</button>
        </div>
      </div>

      <div class="post-roll">
        <div class="roll-result">
          <p>Your Roll: <span class="roll-result">-</span></p>
        </div>

        <div class="result-win">
          <h3>You Win!</h3>
          <div class="card-rewards">
          </div>
        </div>

        <div class="result-lose">
            <h3>You Lost</h3>
        </div>

        <div class="modal-controls">
          <button type="cancel">End Turn</button>
        </div>
      </div>
    `;

    // Listen to events
    this.addEventListener('click', this.handleClick);
    this.addEventListener('change', this.handleChange);
  }

  set state({card, player}) {
    this.card = card;
    this.player = player;
    
    // Hide when we don't have a card.
    if (!card) {
      return this.renderClosed();
    }
    // Make sure the modal is open.
    this.renderOpened();
    this.renderCard();
  }

  get adjustedRating() {
    return this.card.rating.map((val, idx) => this.deltaRating[idx] + val)
  }
  get strength() {
    return this.adjustedRating.reduce((acc, v) => acc + parseInt(v, 10), 0);
  }


  /**
   * Render/Update the Card
   */
  renderCard() {
    const { player } = this;
    // Update the Strength
    this.querySelectorAll('.card-strength').forEach(elm => {
      elm.setAttribute('value', this.strength);
    });

    // Update the Pawns
    this.querySelectorAll('[data-pawn-type]').forEach(elm => {
      const { pawnType } = elm.dataset;
      const value = this.deltaRating[NAME_TO_IDX[pawnType]];
      elm.setAttribute('max', player[pawnType]);
      elm.setAttribute('value', value);
    });
  }


  /**
   * Closes the modal and resets the inital state.
   */
  renderClosed() {
    // Close it
    this.style.display = 'none';
    this.close();
    // Reset the state
    this.deltaRating = [0,0,0];
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
        return await dispatchChallenge(-1);
      case 'roll':
        console.log('Roll the Dice!');
        return await dispatchRollDice('player', this.card.rating, this.deltaRating);
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
