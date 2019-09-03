
AFRAME.registerComponent('info-gamestate', {
  schema: {
    isGameover: {default: false},
    msgPlaying: {default: 'Put BACK all the toys.'},
    msgWon: {default: 'Winner Winner!\nWas it luck, or Skill?'},
  },

  update() {
    if (this.data.isGameover) {
      this.el.setAttribute('text', 'value', this.data.msgWon);
    }
    else {
      this.el.setAttribute('text', 'value', this.data.msgPlaying);
    }
  }

});
