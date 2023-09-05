
class PanelInfo extends HTMLElement {
  render(props) {
    const { gameLog } = props;
    const childCount = this.children.length;

    if (childCount === 0) {
      this.innerHTML = `<h2>Action Log</h2>`;
    }

    // Check if there are new log entries
    if (gameLog.length > childCount) {
      // Append the new logs
      for (let i = childCount; i < gameLog.length; i++) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.className = gameLog[i].actorPath.includes('player') ? 'log-entry player' : 'log-entry opponent';
        logEntry.textContent = gameLog[i].description;
        this.appendChild(logEntry);
      }
    }
  }

}
customElements.define('panel-info', PanelInfo);
