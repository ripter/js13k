
class ChallengeModal extends HTMLDialogElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
  }

  render(props) {
    this.innerHTML = `
      <card-challenge data-card-idx="10"></card-challenge>
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
    // Use the existing innerHTML of elm as the central content
    const content = elm.outerHTML;

    // Create a new HTML structure with "+" and "-" buttons
    const newHTML = `
      <div class="pawn-control">
        <button class="increment">+</button>
        ${content}
        <button class="decrement">-</button>
      </div>
    `;

    // Wrap elm with the new structure
    elm.outerHTML = newHTML;
    console.log('Pawn', elm)
  }

  handleClick(evt) {
    console.log('handleClick', evt);
  }
}

customElements.define('modal-challenge', ChallengeModal, { extends: 'dialog' });
