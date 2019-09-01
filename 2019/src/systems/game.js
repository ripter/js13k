import { newState } from '../utils/newState.js';



AFRAME.registerSystem('game', {
  init() {
    this.state = Object.assign({}, newState(), {
      selectedToy: null,
      selectedToybox: null,
    });
    // this.state = {
    //   toyboxes: (new Array(TOTAL_TOYBOXES)).fill(TOYS_PER_BOX),
    //   toys: (new Array(TOTAL_TOYS)).fill(),
    // };

    this.elTimer = document.querySelector('[timer]');
    // this.startGame();
  },


  // Triggered by components/selectable when the user clicks on the entity.
  setSelected(elm) {
    // Did they click on a toy, or a toybox?
    const selectedType = elm.getAttribute('selectable').type;
    const selectedKey = `selected${selectedType}`;
    const oldElm = this.state[selectedKey];

    // ignore unless the selected item changed
    if (elm === oldElm) { return; }
    // Unselect the old one and select the new one
    if (this.state[selectedKey]) {
      this.state[selectedKey].setAttribute('selectable', 'isSelected', false);
    }
    this.state[selectedKey] = elm;

    // ignore unless we have both a Toy and a Toybox selected.
    if (!this.state.selectedToy || !this.state.selectedToybox) { return; }

    // Activate the pair
    this.state.selectedToy.emit('paired', {
      elToybox: this.state.selectedToybox.closest('[toybox]'),
    });

    // Let the user pick another toy
    this.state.selectedToy.setAttribute('selectable', 'isSelected', false);
    this.state.selectedToy = null;
  },

  // Starts a new game!
  // startGame() {
  //   resetGameState(this.state);
  // },
});
