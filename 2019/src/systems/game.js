import { Controller } from '../entities/controller.js';
import { Box } from '../entities/Box';
import { Room } from '../entities/room.js';
import { ShapedItem } from '../entities/ShapedItem.js';


AFRAME.registerSystem('game', {
    schema: {},

    init() {
      // Entity changes control schemes based on connected controllers.
      this.controller = new Controller();

      // Example summon a custom entity
      this.entities = [
        new ShapedItem(0, 2, -5, 'SMILE'),
        new ShapedItem(-10, 2, -5, 'HEART'),
        new ShapedItem(10, 2, -5, 'CLOUD'),
        new ShapedItem(7, 2, -5, 'LIGHTNING'),
        new Room(),
      ]
    },

    tick(time, timeDelta) {
      // Update game objects
      this.entities.forEach(entity => entity.update(time, timeDelta));
    }
});
