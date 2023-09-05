
class PanelInfo extends HTMLElement {
  render(state) {
    const { gameLog } = state;

    console.log('Render Info');

    // If the panel is empty, add the header
    if (!this.querySelector('h2')) {
      const header = document.createElement('h2');
      header.textContent = 'Action Log';
      this.appendChild(header);
    }

    const existingLogs = this.querySelectorAll('.log-entry');

    console.log('gameLog', gameLog);

    // Check if there are new log entries
    if (gameLog.length > existingLogs.length) {
      // Append the new logs
      for (let i = existingLogs.length; i < gameLog.length; i++) {
        const logEntry = document.createElement('div');
        logEntry.classList.add('log-entry');

        if (gameLog[i].actorPath.includes('player')) {
          logEntry.classList.add('player');
        } else {
          logEntry.classList.add('opponent');
        }

        logEntry.textContent = gameLog[i].description;
        this.appendChild(logEntry);
      }
    }
  }
}

customElements.define('panel-info', PanelInfo);
