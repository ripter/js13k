// Thanks to: http://marcgg.com/blog/2016/11/01/javascript-audio/
export function playNote(audioContext, frequency, duration, type = 'triangle') {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.connect(gain);
  oscillator.frequency.value = frequency;
  gain.connect(audioContext.destination);
  oscillator.start(0);

  gain.gain.exponentialRampToValueAtTime(
    0.00001, audioContext.currentTime + duration
  );
}
