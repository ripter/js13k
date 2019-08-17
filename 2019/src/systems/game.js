import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
import { Room } from '../entities/room.js';
import { ShapedItem } from '../entities/ShapedItem.js';

import { SHAPES } from '../shapes.js';
const SHAPE_LIST = Object.keys(SHAPES);

const TOTAL_ITEMS = 20;


AFRAME.registerSystem('game', {
    schema: {

    },

    init() {
      // Entity changes control schemes based on connected controllers.
      this.controller = new Controller();
      this.elLeftHand = document.querySelector('#leftHand');
      this.selected = {
        entity: null,
        isPull: true,
        orbitPosition: new THREE.Vector3(0,0,0),
      };

      // this.cloudGeometery = new THREE.SphereGeometry( 5, 32, 32 );

      this.floor = new Room();
      this.startGame();
    },

    tick(time, timeDelta) {
      // Update game objects
      this.entities.forEach(entity => entity.update(time, timeDelta));
    },

    setSelected(entity) {
      if (entity === this.selected.entity) { return; }
      console.log('setSelected', entity);

      if (this.selected.entity) {
        this.clearSelected();
      }

      // Pull entity to the player's hand.
      this.selected.isPull = true;
      this.selected.entity = entity;
      // entity.object3D.getWorldDirection(this.selected.orbitPosition);
      this.selected.orbitPosition.copy(entity.object3D.position);
      this.selected.orbitAttribute = entity.getAttribute('obit');

      window.selectedEntity = entity;
      entity.removeAttribute('orbit');
      entity.setAttribute('float-to', {
        // target: '#leftHand',
        // position: this.elLeftHand.getAttribute('position'),
        targetPosition: this.elLeftHand.object3D.position,
        speed: 0.01,
      });
    },

    clearSelected() {
      console.log('clearSelected', this.selected.entity);
      this.selected.entity.setAttribute('float-to', {
        targetPosition: this.selected.orbitPosition,
        speed: 0.05,
      });
      this.selected.entity = null;
      return;
      // const { entity, orbitPosition } = this.selected;
      // // Push back into place.
      // this.selected.isPull = false;
      // entity.setAttribute('float-to', {
      //   position: orbitPosition,
      //   speed: 2,
      // });
      // this.selected.entity = null;
    },

    // getRandomCloudPoint() {
    //   const { vertices } = this.cloudGeometery;
    //   // limit to the upper hemisphere
    //   const points = vertices.filter(v => v.y >= 2);
    //   return points[THREE.Math.randInt(0, points.length)];
    // },

    startGame() {
      const { entities =[] } = this;
      for (let i=0; i < TOTAL_ITEMS; i++) {
        const shape = SHAPE_LIST[THREE.Math.randInt(0, SHAPE_LIST.length)];
        entities.push(new ShapedItem({
          x: 0,
          y: THREE.Math.randInt(2, 4),
          z: 0
        }, shape));
      }
      this.entities = entities;
    },
});
