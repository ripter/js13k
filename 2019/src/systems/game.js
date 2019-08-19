import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
import { Goal } from '../entities/Goal.js'
import { ShapedItem } from '../entities/ShapedItem.js';
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
      };

      this.startGame();
    },


    // Triggered by components (selectable) when the user selects an item/goal.
    setSelected(elm) {
      const { selectedGoal, selectedItem } = this.state;

      // Update with the new entity
      const isGoal = elm.classList.contains('goal');
      if (isGoal) {
        // bail if it's already the selected entity
        if (!this.updateSelected('selectedGoal', elm)) { return; }
      }
      else {
        // bail if it's already the selected entity
        if (!this.updateSelected('selectedItem', elm)) { return; }
      }

      // Do we have both a Goal and an Item?
      if (this.state.selectedGoal !== null && this.state.selectedItem !== null ) {
        // Move the Item to the Goal!
        this.state.selectedItem.setAttribute('orbit', {active: false});
        this.state.selectedItem.setAttribute('float-to', {
          targetPosition: this.state.selectedGoal.getAttribute('position'),
          speed: 0.05,
        });
      }

      // if (entity === this.selected) { return; }
      // Pull entity to the player's hand.
      // this.selected = entity;

      // entity.addEventListener('float-at-target', (event) => {
      //   console.log('game responding to float-at-target', event);
      // });
      // entity.addEventListener('float-completed', (event) => {
      //   entity.setAttribute('orbit', {active: true});
      // });
      //
      // entity.setAttribute('orbit', {active: false});
      // entity.setAttribute('float-to', {
      //   targetPosition: this.elLeftHand.getAttribute('position'),
      //   speed: 0.1,
      // });
    },

    // Attempts to update the selected item.
    // return false if the item is already selected.
    updateSelected(name, elm) {
      // bail if it's already the selected entity
      if (elm === this.state[name]) { return false; }
      const old = this.state[name];

      // notify the old that it is no longer selected
      old && old.emit('unselected');
      // Update and notify the new selected
      this.state[name] = elm;
      elm.emit('selected');
      return true;
    },

    // Starts a new game!
    startGame() {
      this.items = [];
      this.goals = [];

      // Make a grid of goals around the player
      for (let x=0; x < TOTAL_GOALS; x++) {
        for (let y=0; y < TOTAL_GOALS; y++) {
          this.goals.push(this.createNewGoal(x, y));
        }
      }

      // Make sure all the goals are in the items list
      this.items = this.items.concat(this.goals);

      // Fill with random shaped items
      for (let i=0; i < TOTAL_ITEMS; i++) {
        this.items.push(this.createNewItem());
      }
    },

    createNewItem() {
      // Create the item
      const entity = new ShapedItem({
        x: 0,
        y: THREE.Math.randInt(2, 4),
        z: 0,
        shape: getRandomShape(),
      });
      // Listen for events.
      ['float-at-target', 'float-completed'].forEach(eventName => entity.el.addEventListener(eventName, this));
    },

    createNewGoal(x, y) {
      const entity = new Goal({
        x: -0.75 + (x * 0.5),
        y: 0.1,
        z: -0.5 + (y * 0.5),
        icon: getRandomShape(),
      });
    },


    handleEvent(event) {
       console.log('game.handleEvent', event.type, event);
    },
});
