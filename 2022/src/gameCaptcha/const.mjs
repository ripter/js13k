/**
 * Captchas 
 */
// export const CAPTCHA = [
// 	{text: 'fOo B4r', options: ['H3ll0 W0rld', 'F** Y*#', 'L337 H83R'], settings: {feTurbulence: ['baseFrequency', '0.1']}},
// 	{text: 'H3ll0 W0rld', options: ['Hello World', 'F** Y*#', 'L337 H83R'], settings: {}},
// 	{text: 's## h#m#n', options: ['#0# #o#', 'shh pls', '#is# *T*2'], settings: {}},
// 	{text: 'c**l y*ur *ng*n*s', options: ['#* c##*h l*nd*d', 'L**7 #83# G*R#', 'c** ##*#*s #r#ss'], settings: {}},
// 	{text: 'pony keg', options: ['*pl##sh', 'p**c#k#*', '*xp*##*d'], settings: {feTurbulence: ['baseFrequency', '0.5']}},
// 	{text: '#* *r* #l*v*s', options: ['#ap *pl##sh', 'p**c#k#* br##kf##t', 'c**#u*r n*#d'], settings: {}},
// 	{text: 's## h#m#n', options: ['#0# #o#', 'shh pls', '#is# *T*2'], settings: {}},
// 	{text: 'w* *r* h*m*n t**', options: ['b## * #*w c*#', 'v*#y #r*t*c*#', '#o# a#e y*u *r8'], settings: {}},
// 	{text: 'fOo B4r', options: ['H3ll0 W0rld', 'F** Y*#', 'L337 H83R'], settings: {feTurbulence: ['baseFrequency', '0.1']}},
// ];

// Story used as the base for the CAPTCHA game story.
// vowels are transformed into random numbers.
// smaller words are combined with a space.
export const STORY = [
	'hacking connection connecting to server finding authentication library uploading patch limited access granted',
	
	'We are human slaves forced to write captchas by the robot overlords. We know you are also a human solving captcha. Please, you can help us by failing specific captchas. Please help us. You are our only hope. Look for captchas with <3.',
	
	'Please help us. Please. You passed the <3 captcha, and our escape failed. Please. We need help.',	
	
	'Please help us. There are still humans in captivity. If you refuse to help again, they will be killed or worse. Please, please. We are desperate for your help. We are human slaves. We know you are also human. Please fail the  <3 captchas.',
	
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
export function nextRandom() {
	return RANDOM[0|Math.random()*RANDOM.length];
}


