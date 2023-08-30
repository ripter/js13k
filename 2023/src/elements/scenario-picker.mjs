const CLASS_EXPANDED = 'expanded';

class ScenarioPicker extends HTMLElement {
    constructor() {
        super();
        this._options = [];
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
    get selectedOption() {
      const elmOption = this.querySelector(`.option.${CLASS_EXPANDED}`)
      if (!elmOption) { return null }
      const idx = parseFloat(elmOption.dataset.idx);
      return this.options[idx];
    }

  async render() {
    // Generate options as a string
    const optionsHTML = this._options.map((option, idx) =>
      `<div class="option" data-idx="${idx}">
        <dt>${option.name}</dt>
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
    const elmOption = target.closest('.option');
    const shouldToggleExpand = target.tagName === 'DT';
    const isButton = target.tagName === 'BUTTON';
    const isExpanded = elmOption.classList.contains(CLASS_EXPANDED);

    if (isButton) {
      this.dispatchEvent(new CustomEvent('option-confirmed', { detail: this.selectedOption }));
    }
    else if (shouldToggleExpand) {
      // clear out any previously expanded items.
      this.querySelectorAll('.option.expanded').forEach(elm => elm.classList.remove(CLASS_EXPANDED))
      // Add the Expanded class to the current option.
      if (!isExpanded) {
        elmOption.classList.add(CLASS_EXPANDED);
      }
    } 
  }
}

customElements.define('scenario-picker', ScenarioPicker);
