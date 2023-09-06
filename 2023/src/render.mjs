
/**
 * Triggers Render on all the elements. 
 */
export function render(state) {
  // window.elmCard.render(state);
  window.elmPlayerInfo.render(state);
  window.elmPlayerHand.render(state);

  document.querySelectorAll('card-challenge').forEach(elm => elm.render(state));

  // window.elmImagPawn.render(state);
  // window.elmPond.render(state);
}