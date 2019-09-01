import { resetGameState } from '../utils/resetGameState.js';

const TOTAL_TOYBOXES = 3;
const TOTAL_TOYS = TOTAL_TOYBOXES * 4;


AFRAME.registerSystem('game', {
  // schema: {
  //
  // },

  init() {
    this.state = {
      toyboxes: (new Array(TOTAL_TOYBOXES)).fill(),
      toys: (new Array(TOTAL_TOYS)).fill(),
      selectedToy: null,
      selectedToybox: null,
      goalPosition: new THREE.Vector3(),
    };

    this.elTimer = document.querySelector('[timer]');
    this.startGame();
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
    // const elToybox = this.state.selectedToybox.closest('[toybox]');
    // const toyboxPosition = elToybox.getAttribute('position');
    this.state.selectedToy.emit('paired', {
      // position: toyboxPosition,
      elToybox: this.state.selectedToybox.closest('[toybox]'),
    });

    // Let the user pick another toy
    this.state.selectedToy.setAttribute('selectable', 'isSelected', false);
    this.state.selectedToy = null;
  },

  // Starts a new game!
  startGame() {
    resetGameState(this.state);
  },
});
