import { dispatchChallenge } from '../dispatch/challenge.mjs';

class ChallengeModal extends HTMLDialogElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
    this.deltaRating = [0, 0, 0];
  }

  render(props) {
    const { deltaRating } = this;
    const { challengeIdx } = props;
    const card = props.deck[challengeIdx];

    if (card) {
      const adjustedRating = card.rating.map((val, idx) => deltaRating[idx] + val);

      this.innerHTML = `
        <card-challenge 
          name="${card.name}"
          rating="${adjustedRating}"
          rewards="${card.rewards}"
        ></card-challenge>
        <div class="flex-space-around">
          <button type="cancel">Back</button>
          <button type="roll">Roll Dice</button>
        </div>
      `;
    
      // The querySelector will return null unless wait for the browser to update.
      // pushing the call to the task queue allow this.
      setTimeout(() => {
        this.querySelectorAll('.challenge image-pawn').forEach(elm => {
          const isPawn = ['red', 'blue', 'green'].includes(elm.getAttribute('type'));
          if (!isPawn) { return; }
          this.renderPawnControls(elm);
        });
      }, 0);
    }

    if (challengeIdx === -1) {
      this.style.display = 'none';
      this.close();
    }
    else {
      this.style.display = 'flex';
      this.showModal();
    }
  }

  /**
   * "Upgrades" the pawn icon to have +/- buttons. 
   */
  renderPawnControls(elm) {
    // Save the existing
    const content = elm.outerHTML;
    // Create a wrapper
    const newHTML = `
      <div class="pawn-control">
        <button type="increment">+</button>
        ${content}
        <button type="decrement">-</button>
      </div>
    `;
    // replace with the wrapped version.
    elm.outerHTML = newHTML;
  }

  async handleClick(evt) {
    const { target } = evt;
    if (target.nodeName !== 'BUTTON') { return; }
    const buttonType = target.getAttribute('type');
    const elmPawn = target.parentNode.querySelector('image-pawn');
    const pawnType = elmPawn.getAttribute('type');
    const elmCard = this.querySelector('card-challenge');
    console.log('handleClick', 'pawnType', pawnType, 'buttonType', buttonType, target, 'card', elmCard);

    switch(buttonType) {
      case 'cancel': 
        // -1 closes us
        await dispatchChallenge(-1);
        return;
      case 'roll':
        return;
      case 'increment':
        return;
      case 'decrement':
        return;
      default:
        return;
    }
  }
}

customElements.define('modal-challenge', ChallengeModal, { extends: 'dialog' });
