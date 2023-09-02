
class PanelOpponent extends HTMLElement {
  render(props) {
    const { currentActorPath } = props;
    const isMyTurn = currentActorPath.includes('opponents');

    console.log('PanelOpponent', isMyTurn)
    if (isMyTurn) {
      this.classList.remove('hide');
    } else {
      this.classList.add('hide');
    }

    this.innerHTML = `
    <h1>Opponent View</h1>
    `;
  }
}
customElements.define('panel-opponent', PanelOpponent);
