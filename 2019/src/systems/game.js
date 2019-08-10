import { Controller } from '../entities/controller.js';
import { Box } from "../entities/Box";


AFRAME.registerSystem('game', {
    schema: {},

    init() {
      console.log('Game Initialized');

      this.controller = new Controller();

      // Example summon a custom entity
      this.box = new Box(0, 2, -5, {
        width: 2,
        height: 2,
        depth: 2
      });
    },

    tick(time, timeDelta) {
      this.controller.tick(time, timeDelta);
      // Update game objects
      this.box.update(time, timeDelta);
    }
});
