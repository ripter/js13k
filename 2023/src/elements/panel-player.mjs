
class PanelPlayer extends HTMLElement {
  render(props) {
    const { name, diceValues } = props;
    const { 
      food,
      morale,
      population,
      water,
    } = props.player;
    // convert dice values into user friendly names.
    const diceList = props.player.dice.map(d => diceValues[d]);

    this.innerHTML = `
    <div class="player-status">
      <h2>${name} Tribe</h2>
      <h3>Population: ${population}</h3>
      <div class="stat-item">
        <span class="icon">🍔</span>
        <span class="label">Food:</span>
        <span class="value">${food}</span>
      </div>
      
      <div class="stat-item">
        <span class="icon">💧</span>
        <span class="label">Water:</span>
        <span class="value">${water}</span>
      </div>
      
      <div class="stat-item">
        <span class="icon">😀</span>
        <span class="label">Morale:</span>
        <span class="value">${morale}/100</span>
      </div>
      
      <div class="stat-item">
        <span class="icon">🎲</span>
        <span class="label">Dice:</span>
        <span class="value"><dice-list values="${diceList}" selected="${diceList}"></dice-list></span>
      </div>
    </div>
    `;
  }
}

customElements.define('panel-player', PanelPlayer);
