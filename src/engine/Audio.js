// Web Audio API Synthesizer for Math Tower Defense
// No external assets required, instant loading, crisp retro-modern sound effects

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
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

  // 升級音效
  playUpgrade() {
    this.playTone(587.33, 'triangle', 0.15, 0.2, 0.01);
  }

  // 波次完成 / 清除
  playWaveClear() {
    this.playWaveComplete();
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
  // 秘術 1：GCD 最大公因數引爆 (金色爆裂連鎖音)
  playGcdBlast() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [440, 660, 880, 1320].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);
        gain.gain.setValueAtTime(0.25, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.04);
        osc.stop(t + idx * 0.04 + 0.3);
      });
    } catch (e) {}
  }

  // 秘術 2：同餘黑洞召喚 (深邃旋渦聲)
  playVortex() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.4);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } catch (e) {}
  }

  // 秘術 3：黃金超頻充能 (極速升調能量音)
  playOverdrive() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.35);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    } catch (e) {}
  }
  // 幾何共鳴矩陣：連線/結界生成音 (三和弦空靈能量聲)
  playResonanceForm() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);
        gain.gain.setValueAtTime(0.12, t + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.35);
      });
    } catch (e) {}
  }

  // 幾何共鳴矩陣：畢氏聖光脈衝打擊音
  playResonancePulse() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.25);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (e) {}
  }

  // 模組三：公倍數融合音效 (重力融合音與上升衝擊)
  playLcmMerge() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // 低頻重力引力下潛
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(160, t);
      osc1.frequency.exponentialRampToValueAtTime(60, t + 0.2);
      osc1.frequency.exponentialRampToValueAtTime(320, t + 0.45);
      gain1.gain.setValueAtTime(0.25, t);
      gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.5);

      // 上升和弦泛音
      [330, 495, 660].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + 0.15 + i * 0.04);
        gain.gain.setValueAtTime(0.12, t + 0.15 + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + 0.15 + i * 0.04);
        osc.stop(t + 0.45);
      });
    } catch (e) {}
  }

  // 模組三：因數裂變震波音效 (清脆晶裂與擴散震波)
  playFission() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.35);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
    } catch (e) {}
  }
  // 模組四：數論科技解鎖音效 (清脆向上的讚頌和弦音)
  playTechUnlock() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.15, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  // 模組四：重置洗點音效 (晶瑩重力下潛回歸音)
  playTechReset() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(784, t);
      osc.frequency.exponentialRampToValueAtTime(196, t + 0.3);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {}
  }

  // 砲塔受損音效 (金屬受挫擊聲)
  playTowerDamage() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.15);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    } catch (e) {}
  }

  // 砲塔被完全摧毀/損毀音效 (沉重金屬爆炸解體聲)
  playTowerDestroyed() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.45);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.005, t + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } catch (e) {}
  }

  // 砲塔修復成功音效 (機械充能與重啟上升和弦音)
  playTowerRepair() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [330, 440, 554.37, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);
        gain.gain.setValueAtTime(0.18, t + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.25);
      });
    } catch (e) {}
  }

  // 砲塔被冰凍封鎖音效 (晶瑩冰封下潛掃頻)
  playTowerFreeze() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1050, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.25);
      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (e) {}
  }
}

export const sound = new SoundManager();
