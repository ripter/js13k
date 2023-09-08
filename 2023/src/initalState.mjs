  import { dispatchShowRules } from './dispatch/showRules.mjs';

  export const INITAL_STATE = {
  activeDialogIdx: 0,
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
    { dispatch: () => {},
      title: '🏰 Welcome to the Quest for the Sacred Four! 🏰',
      buttons: [
        ['How to Play', dispatchShowRules],
        ['Start Game', () => console.log('Start Game')],
      ],
      body: `
        <h3>JS13k 2023 - Theme: 13th Century</h3>
        <p>The 13th Century: A time when kingdoms rose and fell on the whispers of courtiers and the bravery of knights. In this age of chivalry, legends spoke of the Sacred Four: ancient and mystical items of immense power - the 🏆 Grail, 🗡️ Shard, 💎 Stone, and the revered 📜 Manuscript.</p>
        <p>In <b>Quest for the Sacred Four</b>, you and your opponent are rival leaders racing against time and each other to be the first to gather these four revered items. Deploy your 🛡️ Army, command your 🏇 Cavalry, and seek guidance from your 📿 Monks to challenge and weaken the 🏰 Strength that guards the treasures. The more you diminish the challenge's strength, the higher your chances of claiming a sacred item. But tread carefully, for the path is treacherous and your opponent is always on the lookout for a chance to outwit you.</p>
        <a href="https://github.com/ripter/js13k/tree/master/2023"></a>
      `},
  ],
}