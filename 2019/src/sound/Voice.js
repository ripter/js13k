//
// Voice is OscillatorNote & GainNode connected.
export class Voice {
  constructor(audioContext, frequency, type = 'sine') {
    // Keep a refrence to the context so we can use it's `currentTime` and `destination` properties
    this.context = audioContext;

    // Create an oscillator set to the note frequency.
    this.oscillator = audioContext.createOscillator();
    this.oscillator.frequency.value = frequency;
    this.oscillator.type = type;

    // Create a gain so we can control the volume of this note.
    this.gain = audioContext.createGain();
    this.gain.gain.value = 0;

    // Connect the nodes together
    this.oscillator.connect(this.gain);
    this.gain.connect(audioContext.destination);
    // Start creating the wave
    this.oscillator.start(0);
  }


  // Plays the note in an AttackEnvelope (or my best aproximation of one)
  // https://en.wikipedia.org/wiki/Envelope_(music)
  play(duration) {
    const attackTime = 0.001;
    const releaseTime = 0.001;
    const { gain } = this.gain;
    const { currentTime } = this.context;
    gain.cancelScheduledValues(currentTime);
    gain.setValueAtTime(0, currentTime);
    gain.exponentialRampToValueAtTime(1.0, currentTime + attackTime);
    gain.exponentialRampToValueAtTime(0.0001, currentTime + attackTime + releaseTime + duration);
  }

  dispose() {
    this.oscillator.stop(0);
    this.oscillator.disconnect();
    this.gain.disconnect();
  }
}
