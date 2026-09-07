// Web Audio API Synthesizer for Math Tower Defense
// No external assets required, instant loading, crisp retro-modern sound effects

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, startVol = 0.2, endVol = 0.01) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(startVol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, endVol), this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // 射擊音效 (依據質數有不同音調)
  playShoot(factor) {
    if (this.muted) return;
    const freqs = { 2: 440, 3: 587, 5: 784, abs: 880 };
    const freq = freqs[factor] || 500;
    this.playTone(freq, 'sine', 0.12, 0.15, 0.01);
  }

  // 除法成功打擊音效 (清脆、上升音階)
  playDivide() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.15); // C6

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(t + 0.15);
    } catch (e) {}
  }

  // 絕對值淨化音效 (神秘晶瑩的雙音)
  playPurify() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [659.25, 987.77, 1318.51].forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + i * 0.06);
        gain.gain.setValueAtTime(0.15, t + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.2);
      });
    } catch (e) {}
  }

  // 怪物歸 1 消滅 (金幣入帳叮咚聲)
  playEliminate() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(987.77, t); // B5
      osc1.frequency.setValueAtTime(1318.51, t + 0.08); // E6

      osc2.frequency.setValueAtTime(1975.53, t + 0.08); // B6

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t + 0.08);
      osc1.stop(t + 0.35);
      osc2.stop(t + 0.35);
    } catch (e) {}
  }

  // 建造塔音效
  playBuild() {
    this.playTone(330, 'square', 0.1, 0.12, 0.01);
  }

  // 抵擋無效 (Resist - 悶音)
  playResist() {
    this.playTone(180, 'sawtooth', 0.1, 0.1, 0.01);
  }

  // 核心受損音效
  playDamage() {
    this.playTone(120, 'sawtooth', 0.25, 0.3, 0.01);
  }

  // 波次完成歡呼樂音
  playWaveComplete() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const t = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.1);
        gain.gain.setValueAtTime(0.2, t + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.1);
        osc.stop(t + idx * 0.1 + 0.25);
      });
    } catch (e) {}
  }
}

export const sound = new SoundManager();
