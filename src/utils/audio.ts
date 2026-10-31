class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2.5);
      this.gainNode.connect(this.ctx.destination);

      // Frequencies for a meditative C# Tanpura & Om drone (136.1 Hz - Earth / Om frequency)
      const baseFreq = 136.1;
      const harmonics = [baseFreq * 0.5, baseFreq, baseFreq * 1.5, baseFreq * 2];

      this.oscillators = harmonics.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.4, this.ctx!.currentTime);
        
        // Add subtle lowpass filter
        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, this.ctx!.currentTime);
        
        osc.connect(filter);
        filter.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio play prevented', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      if (this.gainNode) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
          });
          this.oscillators = [];
          this.isPlaying = false;
        }, 1200);
      } else {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
        });
        this.oscillators = [];
        this.isPlaying = false;
      }
    } catch (e) {
      console.warn('Audio stop error', e);
      this.isPlaying = false;
    }
  }
}

export const sacredAudio = new SacredAudioEngine();
