import { Controller } from '../entities/controller.js';
import { Box } from "../entities/Box";
import { Room } from '../entities/room.js';


AFRAME.registerSystem('game', {
    schema: {},

    init() {
      // Entity changes control schemes based on connected controllers.
      this.controller = new Controller();

      // Example summon a custom entity
      this.entities = [
        new Box(0, 2, -5, {
          width: 2,
          height: 2,
          depth: 2
        }),
        new Box(-10, 2, -5, {
          width: 1.5,
          height: 1.5,
          depth: 1.5
        }),

        new Room(),
      ]
    },

    tick(time, timeDelta) {
      // Update game objects
      this.entities.forEach(entity => entity.update(time, timeDelta));
    }
});
