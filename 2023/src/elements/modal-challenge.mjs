import { dispatchRollDice } from '../dispatch/rollDice.mjs';


class ChallengeModal extends HTMLDialogElement {
  connectedCallback() {
    // Start closed.
    this.renderClosed();
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
            <number-spinner data-pawn-index="0" min="0" max="0"></number-spinner>
          </div>
          <div class="pawn-input">
            <label>🏇 Cavalry:</label>
            <number-spinner data-pawn-index="1" min="0" max="0"></number-spinner>
          </div>
          <div class="pawn-input">
            <label>📿 Monks:</label>
            <number-spinner data-pawn-index="2" min="0" max="0"></number-spinner>
          </div>
        </div>

        <div class="modal-controls">
          <button type="cancel">Back</button>
          <button type="roll">Roll Dice</button>
        </div>
      </div>

      <div class="post-roll">
        <p>
          Your Roll: <span class="roll-result">-</span>
        </p>

        <h3>You Won or Lost!</h3>

        <div class="card-rewards"></div>

        <div class="modal-controls">
          <button type="cancel">End Turn</button>
        </div>
      </div>
    `;

    // Listen to events
    this.addEventListener('click', this.handleClick);
    // Listen to number-spinner value changes.
    this.querySelectorAll('.pawn-input number-spinner').forEach(elm => {
      elm.addEventListener('change', this.handleArmoryChange.bind(this));
    });
  }


  showCard(cardName, challengeRating, playerArmory, rewards) {
    this.cardTitle = cardName;
    this.challengeRating = challengeRating;
    this.rewards = rewards;
    // Update/Rerender Challenge Strength.
    this.strength = challengeRating.reduce((acc, rating) => acc + rating, 0);

    // Update the Pawns
    this.querySelectorAll('[data-pawn-index]').forEach(elm => {
      const { pawnIndex } = elm.dataset;
      const value = Math.min( 
        playerArmory[pawnIndex],
        challengeRating[pawnIndex],
      );
      elm.setAttribute('max', value);
    });

    // Open Us
    this.renderOpened();
  }

  showWin(diceResult) {
    console.log('Winner winner chicken dinner', diceResult);
    this.rollResult = diceResult;
    this.resultTitle = 'You Win!'
    this.classList.add('rolled', 'result-win');
  }

  showLose(diceResult) {
    console.log('Better luck next time', diceResult);
    this.resultTitle = 'You Lost!'
    this.rollResult = diceResult;
    this.classList.add('rolled', 'result-lose');
  }


  /**
   * Closes the modal and resets the inital state.
   */
  renderClosed() {
    // Close it
    this.style.display = 'none';
    this.close();
  }

  renderOpened() {
    this.classList.remove('rolled', 'result-win', 'result-lose');
    this.style.display = 'flex';
    this.showModal();
  }


  async handleClick(evt) {
    const { target } = evt;
    if (target.nodeName !== 'BUTTON') { return; }
    const buttonType = target.getAttribute('type');

    switch(buttonType) {
      case 'cancel': 
        return this.renderClosed();
      case 'roll':
        await dispatchRollDice('player', this.armory);
      default:
        return;
    }
  }

  /**
   * Update the strength when the armory values change.
   */
  handleArmoryChange() {
    this.strength = this.challengeRating.reduce((acc, rating, idx) => acc + rating - this.armory[idx], 0);
  }

  get armory() {
    return Array.from(document.querySelectorAll('.pawn-input number-spinner')).reduce((acc, elm) => {
      const { value } = elm;
      const { pawnIndex } = elm.dataset;

      acc[pawnIndex] = value;
      return acc;
    }, [0, 0, 0]);
  }

  set rollResult(val) {
    const elm = this.querySelector('.roll-result');
    elm.textContent = val;
  }

  set strength(val) {
    this.querySelectorAll('.card-strength').forEach(elm => {
      elm.setAttribute('value', val);
    });
  }

  set rewards(val) {
    const elm = this.querySelector('.card-rewards');
    const html = val.map(reward => `<image-reward type="${reward}"></image-reward>`).join('');

    if (elm.innerHTML !== html) {
      elm.innerHTML = html;
    }
  }

  set resultTitle(val) {
    const elm = this.querySelector('.post-roll h3');
    elm.textContent = val;
  }

  set cardTitle(val) {
    const elm = this.querySelector('.card-name');
    console.log(val, elm);
    elm.textContent = val;
  }
}

customElements.define('modal-challenge', ChallengeModal, { extends: 'dialog' });
