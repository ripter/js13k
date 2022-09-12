const regLove = /<3/;

export function hasLove(text) {
	return regLove.test(text);
}
