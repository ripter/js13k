
/**
 * Triggers Render on all the elements. 
 * Why a render function and pasing state? Why not pass everything as attributes?
 * A few reasons, attribute values are stringified, which is annoying to work with and ineffecent. 
 * Also, I don't want to waste bytes dealing with it. This uses fewer bytes than the alternative.
 * If this bothers you, then you can think of this as a stupid verion of an <App /> component found in react projects.
 */
export function render(state) {
  window.elmPond.render(state);

  // Modals
  window.elmPlayerHand.render(state);
  window.elmDialog.render(state);

  // Post Jam, I have time to think about how to update these instead of jamming everyhing into render.
  // In a future update, move this out of render and into a dispatch function. (maybe...)
  window.elmChallengeModal.state = {
    card: state.deck[state.challengeIdx],
    player: state.player,
  }

  // Player Stats
  document.querySelectorAll('player-info').forEach(elm => elm.render(state));

}