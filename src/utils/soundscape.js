// Pure Web Audio API Spa Soundscape Engine (Zero external broken audio URLs!)
class SanctuarySoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.35;
    this.activeNodes = [];
    this.chimeTimer = null;
  }

  tracks = [
    {
      id: 'crystal-rain',
      title: 'Crystal Bowls & Morning Mist',
      mood: '432 Hz Harmonic Calm',
      freqs: [216, 324, 432, 540],
      noiseColor: 'pink',
    },
    {
      id: 'hammam-echo',
      title: 'Obsidian Hammam Sanctuary',
      mood: 'Deep Basalt Resonance',
      freqs: [144, 216, 288, 360],
      noiseColor: 'brown',
    },
    {
      id: 'botanical-breeze',
      title: 'Wildflower Courtyard Chimes',
      mood: 'Pentatonic Silk Shimmer',
      freqs: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25],
      noiseColor: 'soft',
    },
  ];

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  createSoftNoise(type = 'pink') {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = type === 'brown' ? 280 : type === 'pink' ? 560 : 750;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = 0.38;

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    whiteNoise.start(0);

    this.activeNodes.push(whiteNoise, filter, noiseGain);
  }

  playBellNote(freq) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const harmGain = this.ctx.createGain();
    harmGain.gain.setValueAtTime(0.08, now);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.14, now + 0.6);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);

    osc.connect(noteGain);
    harmonic.connect(harmGain);
    harmGain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 6.0);
    harmonic.stop(now + 6.0);
  }

  startDrone(track) {
    const now = this.ctx.currentTime;
    const rootFreq = track.freqs[0] / 2;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(rootFreq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(rootFreq * 1.5, now);

    droneGain.gain.setValueAtTime(0.0001, now);
    droneGain.gain.linearRampToValueAtTime(0.16, now + 2.5);

    osc1.connect(droneGain);
    osc2.connect(droneGain);
    droneGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    this.activeNodes.push(osc1, osc2, droneGain);
  }

  play(index = this.currentTrackIndex) {
    this.stopNodesOnly();
    this.initContext();
    this.currentTrackIndex = index;
    this.isPlaying = true;

    const track = this.tracks[this.currentTrackIndex];
    this.createSoftNoise(track.noiseColor);
    this.startDrone(track);

    // Immediate chime + rhythmic spaced ambient notes
    this.playBellNote(track.freqs[Math.floor(Math.random() * track.freqs.length)]);
    this.chimeTimer = window.setInterval(() => {
      if (!this.isPlaying) return;
      const randomFreq = track.freqs[Math.floor(Math.random() * track.freqs.length)];
      this.playBellNote(randomFreq);
    }, 3200);
  }

  stopNodesOnly() {
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        if (typeof node.stop === 'function') node.stop();
        if (typeof node.disconnect === 'function') node.disconnect();
      } catch {
        // safe cleanup
      }
    });
    this.activeNodes = [];
  }

  pause() {
    this.isPlaying = false;
    this.stopNodesOnly();
  }

  setVolume(val) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.15);
    }
  }
}

export const soundEngine = new SanctuarySoundEngine();
