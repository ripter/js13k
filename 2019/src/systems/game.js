import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
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

      this.startGame();
    },


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
      const shapeList = SHAPE_LIST;//.filter(shape => shape !== 'HAND');
      const getRandomShape = () => {
        return shapeList[THREE.Math.randInt(0, shapeList.length-1)];
      };

      // Make a grid of goals around the player
      for (let x=0; x < TOTAL_GOALS; x++) {
        for (let y=0; y < TOTAL_GOALS; y++) {
          goals.push(new Goal({
            x: -0.75 + (x * 0.5),
            y: 0.1,
            z: -0.5 + (y * 0.5),
            icon: getRandomShape(),
          }));
        }
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
