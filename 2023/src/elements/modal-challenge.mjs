
class ChallengeModal extends HTMLDialogElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
  }

  render(props) {
    const card = props.deck[0|Math.random()*12];

    this.innerHTML = `
      <card-challenge 
        name="${card.name}"
        rating="${card.rating}"
        rewards="${card.rewards}"
      ></card-challenge>
      <button id="rollDice">Roll Dice</button>
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
  /**
   * "Upgrades" the pawn icon to have controls. 
   */
  renderPawnControls(elm) {
    // Save the existing
    const content = elm.outerHTML;
    // Create a wrapper
    const newHTML = `
      <div class="pawn-control">
        <button class="increment">+</button>
        ${content}
        <button class="decrement">-</button>
      </div>
    `;
    // replace with the wrapped version.
    elm.outerHTML = newHTML;
  }

  handleClick(evt) {
    console.log('handleClick', evt);
  }
}

customElements.define('modal-challenge', ChallengeModal, { extends: 'dialog' });
