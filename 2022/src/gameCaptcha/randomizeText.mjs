// replace '*' with a number
// and '#' with a random char in the text.
export function randomizeText(text) {
	return text
		.replaceAll('*', () => 0|Math.random() * 10)
		.replaceAll('#', () => (Math.random() + 1).toString(36).substr(-1));
}
