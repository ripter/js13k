import { renderTemplate } from '../renderTemplate.mjs';

class ScenarioDropdown extends HTMLElement {
    constructor() {
        super();
        this._options = [];
        this._selected = null;
    }

    connectedCallback() {
        this.render();
    }

    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.render();
    }

  async render() {
    // Render the main template
    const mainContent = await renderTemplate("#scenario-dropdown-template", {
      options: async () => {
        // Create a div container to hold the dropdown options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'scenario-options';

        // Loop through the options and render each one
        for (let option of this._options) {
          const optionDiv = document.createElement('div');
          optionDiv.className = 'scenario-option';
          optionDiv.textContent = option.name;
          optionDiv.addEventListener('click', () => {
            this._selected = option;
            this.querySelector('slot[name="description"]').textContent = option.description; // Update description on select
          });
          optionsContainer.appendChild(optionDiv);
        }

        return optionsContainer;
      },
      description: this._selected ? this._selected.description : 'Please select an option.'
    });

    this.innerHTML = ''; // Clear current content
    this.appendChild(mainContent);

    // Add a Confirm button after the rendered content
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('option-confirmed', { detail: this._selected }));
    });
    this.appendChild(confirmBtn);
  }

    _onOptionClick(option) {
        this._selected = option;
        this.render();
        this.dispatchEvent(new CustomEvent('option-selected', { detail: option }));
    }
}

customElements.define('scenario-dropdown', ScenarioDropdown);
