import { dispatchAIMove } from '../state/dispatchAIMove.mjs';

class PanelOpponent extends HTMLElement {
  constructor() {
    super();
    this.onTimeout = this.onTimeout.bind(this);
  }

  render(props) {
    const { currentActorPath, dispatch } = props; // Assuming you pass `dispatch` as a prop
    const isMyTurn = currentActorPath.includes('opponents');

    if (isMyTurn) {
      this.classList.remove('hide');
      // Set a delay before dispatching the next action
      setTimeout(this.onTimeout, 1000); // 1 seconds
    } else {
      this.classList.add('hide');
    }

    this.innerHTML = `
      <div class="opponent-panel">
        <h1 class="opponent-title">Opponent's Turn</h1>
        <div class="opponent-content">
          <p>Opponent is thinking...</p>
          <div class="loader"></div>
        </div>
      </div>
    `;
  }

  onTimeout() {
    dispatchAIMove();
  }
}

customElements.define('panel-opponent', PanelOpponent);
