
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

      <table class="stats-table">
        <tbody>
          <tr class="stat-item">
            <td class="icon">🍔</td>
            <td class="label">Food:</td>
            <td class="value">${food}</td>
          </tr>
          
          <tr class="stat-item">
            <td class="icon">💧</td>
            <td class="label">Water:</td>
            <td class="value">${water}</td>
          </tr>

          <tr class="stat-item">
            <td class="icon">😀</td>
            <td class="label">Morale:</td>
            <td class="value">${morale}/100</td>
          </tr>

          <tr class="stat-item">
            <td class="icon">🎲</td>
            <td class="label">Dice:</td>
            <td class="value"><dice-list values="${diceList}" selected="${diceList}"></dice-list></td>
          </tr>
        </tbody>
      </table>

      <button type="button">Finish Season</button>
    </div>
    `;
  }
}

customElements.define('panel-player', PanelPlayer);
