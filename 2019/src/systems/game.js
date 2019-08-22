import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
import { Goal } from '../entities/Goal.js'
import { Item } from '../entities/Item.js';
import { getRandomShape } from '../utils/getRandomShape.js';


const TOTAL_ITEMS = 30;
const TOTAL_GOALS = 3;


AFRAME.registerSystem('game', {
    schema: {

    },

    init() {
      this.items = [];
      this.goals = [];
      // Entity changes control schemes based on connected controllers.
      this.controller = new Controller();
      this.elLeftHand = document.querySelector('#leftHand');

      this.state = {
        selectedItem: null,
        selectedGoal: null,
        goalPosition: new THREE.Vector3(),
      };

      this.startGame();
    },


    // Triggered by components (selectable) when the user selects an item/goal.
    // Sets the element as selected, triggers lockAndKey if this makes a pair.
    setSelected(elm) {
      const setState = (name, elm) => {
        // bail if it's already the selected entity
        if (elm === this.state[name]) { return false; }
        // set the old as unselected
        if (this.state[name] !== null) { this.state[name].setAttribute('selectable', {isSelected: false}); }
        // set the new as selected
        if (elm !== null) { elm.setAttribute('selectable', {isSelected: true}); }
        this.state[name] = elm;
        return true;
      };

      // Update selected state with the new entity
      const isGoal = elm.classList.contains('goal');
      if (isGoal) {
        // bail if it's already the selected entity
        if (!setState('selectedGoal', elm)) { return; }
      }
      else {
        // bail if it's already the selected entity
        if (!setState('selectedItem', elm)) { return; }
      }

      // Do we have both a Goal and an Item?
      const { selectedGoal, selectedItem, goalPosition } = this.state;
      if (selectedGoal !== null && selectedItem !== null ) {
        // Start the lock & key
        selectedItem.setAttribute('lock-key', {
          elLock: `#${selectedGoal.id}`,
        });
        // Reset the selected so the user can pick again.
        setState('selectedGoal', null);
        setState('selectedItem', null);
      }
    },


    // Starts a new game!
    startGame() {
      const shapes = Array(TOTAL_ITEMS).fill().map(getRandomShape);

      // reset the lists
      this.items = [];
      this.goals = [];

      // Make a grid of goals around the player
      for (let x=0; x < TOTAL_GOALS; x++) {
        for (let y=0; y < TOTAL_GOALS; y++) {
          let i = x * TOTAL_GOALS + y;
          this.goals.push(this.createNewGoal(x, y, shapes[i]));
        }
      }

      // Fill with random shaped items
      for (let i=0; i < TOTAL_ITEMS; i++) {
        this.items.push(this.createNewItem(shapes[i]));
      }
    },

    // Creates a new orbiting item with shape and random y-axis
    createNewItem(shape) {
      const entity = new Item({
        x: 0,
        y: THREE.Math.randInt(2, 4),
        z: 0,
        shape,
      });
    },

    // Creates a new Goal at location with random shape
    createNewGoal(x, y, shape) {
      const entity = new Goal({
        x: -0.75 + (x * 0.5),
        y: 0.1,
        z: -0.5 + (y * 0.5),
        icon: shape,
      });
    },
});
