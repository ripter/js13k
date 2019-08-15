import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
import { Room } from '../entities/room.js';
import { ShapedItem } from '../entities/ShapedItem.js';

import { SHAPES } from '../shapes.js';
const SHAPE_LIST = Object.keys(SHAPES);

const TOTAL_ITEMS = 20;


AFRAME.registerSystem('game', {
    schema: {},

    init() {
      // Entity changes control schemes based on connected controllers.
      this.controller = new Controller();

      this.cloudGeometery = new THREE.SphereGeometry( 5, 32, 32 );

      this.floor = new Room();
      this.startGame();
    },

    tick(time, timeDelta) {
      // Update game objects
      this.entities.forEach(entity => entity.update(time, timeDelta));
    },

    getRandomCloudPoint() {
      const { vertices } = this.cloudGeometery;
      // limit to the upper hemisphere
      const points = vertices.filter(v => v.y >= 2);
      return points[THREE.Math.randInt(0, points.length)];
    },

    startGame() {
      const { entities =[] } = this;
      for (let i=0; i < TOTAL_ITEMS; i++) {
        const position = this.getRandomCloudPoint();
        const shape = SHAPE_LIST[THREE.Math.randInt(0, SHAPE_LIST.length)];
        entities.push(new ShapedItem(position, shape));
      }
      this.entities = entities;
    },
});
