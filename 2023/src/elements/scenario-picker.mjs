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
        if (!elmOption) return null;
        const idx = Number(elmOption.dataset.idx);
        return this.options[idx];
    }

    async render() {
        const optionsHTML = this._options.map((option, idx) =>
            `<div class="option" data-idx="${idx}">
                <dt>${option.name}</dt>
                <dd>
                    ${option.description}
                    <button>🚀 Embark</button>
                </dd>
            </div>`
        ).join('');

        this.innerHTML = `<dl>
            ${optionsHTML}
        </dl>`;
    }

    handleClick(evt) {
        const { target } = evt;
        const elmOption = target.closest('.option');
        if (!elmOption) return; // Ensure all actions are related to an option.

        const shouldToggleExpand = target.tagName === 'DT';
        const isButton = target.tagName === 'BUTTON';
        const isExpanded = elmOption.classList.contains(CLASS_EXPANDED);

        if (isButton) {
            this.dispatchEvent(new CustomEvent('option-confirmed', { detail: this.selectedOption }));
        } else if (shouldToggleExpand) {
            this.querySelectorAll('.option.expanded').forEach(elm => elm.classList.remove(CLASS_EXPANDED))
            if (!isExpanded) {
                elmOption.classList.add(CLASS_EXPANDED);
            }
        }
    }
}

customElements.define('scenario-picker', ScenarioPicker);
