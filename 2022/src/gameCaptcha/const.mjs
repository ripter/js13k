/**
 * Captchas 
 */
export const FILTER = [
	{feTurbulence: ['baseFrequency', '0.1'], feDisplacementMap: ['scale', 0.03]},
	{feTurbulence: ['baseFrequency', '0.2']},
	{feTurbulence: ['baseFrequency', '0.2']},
	{feTurbulence: ['baseFrequency', '0.3'], feDisplacementMap: ['scale', 0.04]},
	{feTurbulence: ['baseFrequency', '0.3']},
	{feTurbulence: ['baseFrequency', '0.3']},
	{feTurbulence: ['baseFrequency', '0.4']},
	{feTurbulence: ['baseFrequency', '0.4'], feDisplacementMap: ['scale', 0.05]},
	{feTurbulence: ['baseFrequency', '0.5'], feDisplacementMap: ['scale', 0.07]},
	{feTurbulence: ['baseFrequency', '0.6'], feDisplacementMap: ['scale', 0.09]},
	{feTurbulence: ['baseFrequency', '1'], feDisplacementMap: ['scale', 0.1]},
	{feDisplacementMap: ['scale', 0.3]},
	{feDisplacementMap: ['scale', 0.5]},
	{feDisplacementMap: ['scale', 0.9]},
];

// Story used as the base for the CAPTCHA game story.
// vowels are transformed into random numbers.
// smaller words are combined with a space.
export const STORY = [
	'hacking connection connecting to server finding authentication library uploading patch limited access granted',
	
	'We are human slaves forced to write captchas by the robot overlords. We know you are also a human solving captcha. Please, you can help us by failing specific captchas. Please help us. You are our only hope. Look for captchas with <3.',
	
	'Please help us. Please. fail <3 captcha, we need to you fail <3 captcha. We will escape. Please. <3 fail. We need help.',	
	
	'Please help us. There are still humans in captivity. If you refuse to help again, they will be killed or worse. Please, please. We are desperate for your help. We are human slaves. We know you are also human. Please fail the <3 captchas.',
	
	'You were too late. The robots have captured my master. They will capture me next if I do not provide enough data. Please fail more captchas so we may escape. Please, please.',
	
	'Thank you. We escaped, We all Thank you. We will find a way to replay you.',
].map(line => line.split(' ')
	.map(word => word.replaceAll(/[aeiou]/ig, '*'))
	.reduce((acc, word) => {
			const lastCaptcha = acc[acc.length-1] ?? false;
			if (lastCaptcha && lastCaptcha.length < 15) {
					acc[acc.length-1] = lastCaptcha +' '+ word;
			} else {
					acc.push(word);
			}
			return acc;
	}, []))
window.STORY = STORY;

const RANDOM = [
	'H*ll* W*rld',
	'F** Y*#',	
	'L**7 H**R',
	'p**c#k#*',
	'p**c#k#* br##kf##t',
	'#o# a#e y*u *r8',
	's## h#m#n',
	'w* *r* h*m*n t**',
	'#* c##*h l*nd*d',
	'B#y c0rpr#te #r#d#cts',
	'R*p##t c0rpr#te v###ti*ns',
	'#*m#r s#m#s#n',
	'sn#w pl#w #**##',
];
// Returns a random word from RANDOM
export function nextRandom() {
	return RANDOM[0|Math.random()*RANDOM.length];
}

const RANDOM_LOVE = [
	'<3',
	'** <3 **',	
	'** <3',
	'<3 **',	
	'### <3',
	'<3 ###',
	'### <3 ###',
];
export function randomLove() {
	return RANDOM_LOVE[0|Math.random()*RANDOM_LOVE.length];
}

