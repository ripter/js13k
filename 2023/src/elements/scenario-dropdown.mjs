
class ScenarioDropdown extends HTMLElement {
    constructor() {
        super();
        this._options = [];
        this._selected = null;
    }

    connectedCallback() {
      this.render();
      this.addEventListener('click', this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener('click', this.handleClick);
    }

    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.render();
    }

  async render() {
    // Generate options as a string
    const optionsHTML = this._options.map((option, idx) =>
      `<div class="option">
        <dt data-idx="${idx}">${option.name}</dt>
        <dd>
          ${option.description}
          <button>🚀 Embark</button>
        </dd>
        </div>`
    ).join('');

    // Embed the structure using a template literal
    this.innerHTML = `<dl>
      ${optionsHTML}
    </dl>`;
  }

  handleClick(evt) {
    const { target } = evt;
      console.log('target', target.dataset, target);
    const isOption = target.classList.contains('opption');
    const isButton = target.tagName === 'BUTTON';

    if (isOption) {
      target.classList.toggle('expanded');
      //TODO: set _selected
    } 
    else if (isButton) {
      this.dispatchEvent(new CustomEvent('option-confirmed', { detail: this._selected }));
    }
  }
}

customElements.define('scenario-dropdown', ScenarioDropdown);
