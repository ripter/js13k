import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
import { Room } from '../entities/room.js';
import { Goal } from '../entities/Goal.js'
import { ShapedItem } from '../entities/ShapedItem.js';

import { SHAPES } from '../shapes.js';
const SHAPE_LIST = Object.keys(SHAPES);

const TOTAL_ITEMS = 30;
const TOTAL_GOALS = 3;


AFRAME.registerSystem('game', {
    schema: {

    },

    init() {
      // Entity changes control schemes based on connected controllers.
      this.controller = new Controller();
      this.elLeftHand = document.querySelector('#leftHand');
      this.selected = {
        entity: null,
      };

      this.floor = new Room();
      this.startGame();
    },

    // tick(time, timeDelta) {
      // Update game objects
      // this.entities.forEach(entity => entity.update(time, timeDelta));
    // },

    setSelected(entity) {
      if (entity === this.selected) { return; }
      // Pull entity to the player's hand.
      this.selected = entity;

      // entity.addEventListener('float-at-target', (event) => {
      //   console.log('game responding to float-at-target', event);
      // });
      entity.addEventListener('float-completed', (event) => {
        entity.setAttribute('orbit', {active: true});
      });

      entity.setAttribute('orbit', {active: false});
      entity.setAttribute('float-to', {
        targetPosition: this.elLeftHand.getAttribute('position'),
        speed: 0.1,
      });
    },


    startGame() {
      const { entities = [], goals = [] } = this;
      const shapeList = Object.keys(SHAPE_LIST).filter(shape => shape !== 'HAND');
      const getRandomShape = () => {
        const key = shapeList[THREE.Math.randInt(0, shapeList.length-1)];
        return SHAPE_LIST[key];
      };

      // Fill with goals
      for (let i=0; i < TOTAL_GOALS; i++) {
        goals.push(new Goal({
          icon: getRandomShape(),
        }));
      }

      // Fill with random shaped items
      for (let i=0; i < TOTAL_ITEMS; i++) {
        entities.push(new ShapedItem({
          x: 0,
          y: THREE.Math.randInt(2, 4),
          z: 0,
          shape: getRandomShape(),
        }));
      }
      this.entities = entities;
    },
});
