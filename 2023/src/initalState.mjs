  import { dispatchShowRules } from './dispatch/showRules.mjs';
  import { dispatchStartGame } from './dispatch/startGame.mjs';

  export const INITAL_STATE = {
  activeDialogIdx: 0,
  challengeIdx: -1,
  rollResult: -1,
  player: {
    red: 5,
    green: 5,
    blue: 5,
    items: [],
  },
  opponent: {
    red: 5,
    green: 5,
    blue: 5,
    items: [],
  },
  pond: [],
  // pond: [2, 4, 6, 8, 10, 12],
  deck: [
    { name: 'The Holy Grail', rating: [5, 4, 7], rewards: ['grail'] },
    { name: 'Excalibur\'s Shard', rating: [6, 3, 6], rewards: ['shard'] },
    { name: 'The Alchemist\'s Stone', rating: [5, 4, 5], rewards: ['stone'] },
    { name: 'The Saint\'s Manuscript', rating: [4, 5, 4], rewards: ['manuscript'] },
    { name: 'Pilgrimage', rating: [1, 1, 4], rewards: ['1 blue'] },
    { name: 'Jousting', rating: [0, 4, 2], rewards: ['1 green'] },
    { name: 'Mêlée', rating: [4, 0, 2], rewards: ['1 red'] },
    { name: 'Mystical Ritual', rating: [2, 2, 3], rewards: ['1 blue', '1 green'] },
    { name: 'Forest Ambush', rating: [1, 5, 1], rewards: ['2 green'] },
    { name: 'Castle Siege', rating: [5, 1, 1], rewards: ['1 red', '1 blue'] },
    { name: 'Crusader\'s March', rating: [4, 2, 2], rewards: ['2 blue', '1 red'] },
    { name: 'Mongol Negotiation', rating: [2, 5, 1], rewards: ['2 green', '1 blue'] },
    { name: 'Cathedral Construction', rating: [3, 2, 3], rewards: ['2 red', '1 blue'] },
    { name: 'Defend Against Mongol Raid', rating: [5, 3, 1], rewards: ['2 red', '2 green'] },
    { name: 'Establish a Hanseatic Trade Route', rating: [3, 4, 2], rewards: ['3 green', '1 blue'] },
    { name: 'Albigensian Crusade', rating: [4, 2, 3], rewards: ['2 blue', '2 red'] },
    { name: 'Reconquista Campaign', rating: [5, 3, 2], rewards: ['3 red', '2 green'] },
    { name: 'Magna Carta Negotiation', rating: [3, 5, 2], rewards: ['3 green', '2 blue'] },
    { name: 'Translation of Aristotle', rating: [2, 3, 5], rewards: ['3 blue', '2 green'] },
  ],
  dialogs: [
    // Index: 0
    { 
      title: '🏰 Quest for the Sacred Four! 🏰',
      buttons: [
        ['How to Play', dispatchShowRules],
        ['Start Game', dispatchStartGame],
      ],
      body: `
        <h3>JS13k 2023 - Theme: 13th Century - <a href="https://github.com/ripter/js13k/tree/master/2023">Github</a></h3>
        <p>The 13th Century: A time when kingdoms rose and fell on the whispers of courtiers and the bravery of knights. In this age of chivalry, legends spoke of the Sacred Four:</p><ul class="intro-items"><li>🏆 Grail,<li> 🗡️ Shard,<li> 💎 Stone,<li>📜 Manuscript.</ul>
        <p>This is a Card game were you race to be the first player to gather the Four Sacred Items. Each turn you pick a Challenge card from the pool. Roll 2d6 to beat the Challenge Rating. Spend your 🛡️ Army, 🏇 Cavalry, and 📿 Monks to reduce the Challenge Rating.</p>
      `,
    },
    // Index: 1
    { 
      title: 'How to Play',
      buttons: [
        ['Start Game', dispatchStartGame],
      ],
      body: `
        <p>🎲 On your turn, you pick a challenge from the card pool. Your aim is to either match or surpass the challenge's 🏰 Strength value by rolling two six-sided dice (2d6).</p>
        <p>💡 To enhance your odds, you can spend resources like 🛡️ Army, 🏇 Cavalry, or 📿 Monks. These can be used to decrease the challenge's 🏰 Strength, giving you a better chance to overcome it.</p>
        <p>🏆 The first player to collect all four Sacred artifacts emerges victorious in their quest!</p>
      `,
    },
    // Index: 2
    {
      title: 'You Win!',
      buttons: [

      ],
      body: `<p>Good Job</p>`,
    },
    // Index: 3
    {
      title: 'You Lost',
      buttons: [

      ],
      body: `<p>Better Luck Next Time</p>`,
    }
  ],
}