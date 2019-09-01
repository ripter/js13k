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
      console.log('unselected', this.state[selectedKey]);
      this.state[selectedKey].setAttribute('selectable', 'isSelected', false);
    }
    this.state[selectedKey] = elm;

    // ignore unless we have both a Toy and a Toybox selected.
    if (!this.state.selectedToy || !this.state.selectedToybox) { return; }

    // Activate the pair
    const elToybox = this.state.selectedToybox.closest('[toybox]');
    this.state.selectedToy.setAttribute('lock-key', {
      elLock: `#${elToybox.id}`,
    });

    // Let the user pick another toy
    this.state.selectedToy = null;
  },

  // Triggered by components (lock-key) when the key is used on a valid lock.
  // unlockGoal() {
  //   const elTimer = this.timer.el.querySelector('[timer]');
  //
  //   // Have we unlocked everything?
  //   const isGameOver = this.goals.every(goal => goal.isUnlocked);
  //   if (isGameOver) {
  //     console.log('YOU WON!');
  //     // Stop the timer
  //     elTimer.setAttribute('timer', {isPlaying: false});
  //   }
  // },

  // Starts a new game!
  startGame() {
    resetGameState(this.state);

    // const shapes = Array(TOTAL_ITEMS).fill().map(getRandomShape);
    //
    // // reset the lists
    // this.items = [];
    // this.goals = [];
    //
    // // Make a grid of goals around the player
    // for (let x=0; x < TOTAL_GOALS; x++) {
    //   for (let y=0; y < TOTAL_GOALS; y++) {
    //     let i = x * TOTAL_GOALS + y;
    //     this.goals.push(this.createNewGoal(x, y, shapes[i]));
    //   }
    // }
    //
    // // Fill with random shaped items
    // for (let i=0; i < TOTAL_ITEMS; i++) {
    //   this.items.push(this.createNewItem(shapes[i]));
    // }
  },

  // Creates a new orbiting item with shape and random y-axis
  // createNewItem(shape) {
  //   return new Item({
  //     x: 0,
  //     y: THREE.Math.randInt(2, 4),
  //     z: 0,
  //     shape,
  //   });
  // },

  // Creates a new Goal at location with random shape
  // createNewGoal(x, y, shape) {
  //   return new Goal({
  //     x: -0.75 + (x * 0.5),
  //     y: 0.1,
  //     z: -0.5 + (y * 0.5),
  //     icon: shape,
  //   });
  // },
});
