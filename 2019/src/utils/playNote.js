

let audioContext;

// Plays a very simple note
export function playNote(note) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = noteToFreq(note);

  // https://developer.mozilla.org/en-US/docs/Web/API/GainNode
  const gain = audioContext.createGain();

  // Connect the nodes
  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(0);
  gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
}
