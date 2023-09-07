
/**
 * Triggers Render on all the elements. 
 * Why a render function and pasing state? Why not pass everything as attributes?
 * A few reasons, attribute values are stringified, which is annoying to work with and ineffecent. 
 */
export function render(state) {
  window.elmPlayerInfo.render(state);
  window.elmPlayerHand.render(state);
  window.elmPond.render(state);
  window.elmChallengeModal.render(state);

  // Re-render all the cards.
  document.querySelectorAll('card-challenge').forEach(elm => elm.render(state));

  // window.elmImagPawn.render(state);
}