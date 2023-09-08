
class GameDialog extends HTMLDialogElement {
  connectedCallback() {
    this.addEventListener('click', this.handleClick);
  }

  render(props) {
    const { activeDialogIdx, dialogs } = props;
    const { title, body, buttons } = dialogs[activeDialogIdx] ?? {title: '', body: '', buttons: []};
    const html = `
      <h1>${title}</h1>
      <div>
        ${body}
      </div>
      <div class="flex-space-around w-100">
        ${buttons.map((btn, idx) => `
          <button type="button" data-idx=${idx}>
            ${btn[0]}
          </button>
        `).join('')}
      </div>
    `;

    this.buttons = buttons;
    // Only re-render on change.
    if (this.innerHTML !== html) {
      this.innerHTML = html;
    }

    if (activeDialogIdx === -1) {
      this.style.display = 'none';
      this.close();
    }
    else {
      this.style.display = 'flex';
      this.showModal();
    }

  }

  handleClick(evt) {
    const { target } = evt;
    if (target.nodeName !== 'BUTTON') { return; }
    const { idx } = target.dataset;
    const button = this.buttons[idx];

    // trigger the button function
    button[1]();
  }
}

customElements.define('game-dialog', GameDialog, { extends: 'dialog' });
