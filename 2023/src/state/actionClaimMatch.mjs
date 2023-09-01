
export async function actionClaimMatch(state, key) {
  const { card } = state;
  const match = card.matches[key];
  console.log('match', match);

  return state;
}