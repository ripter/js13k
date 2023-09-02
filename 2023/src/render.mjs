
/**
 * Triggers Render on all the elements. 
 */
export function render(state) {
  console.log('Render Called');
  window.elmPanelPlayer.render(state);
  window.elmPanelCard.render(state);
  window.elmPanelOpponent.render(state);
}