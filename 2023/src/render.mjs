
/**
 * Triggers Render on all the elements. 
 */
export function render(state) {
  window.elmPanelPlayer.render(state);
  window.elmPanelCard.render(state);
  window.elmPanelOpponent.render(state);
  window.elmPanelInfo.render(state);
}