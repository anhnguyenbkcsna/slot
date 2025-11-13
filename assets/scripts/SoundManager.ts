import { _decorator, Component, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    static Ins: SoundManager;

    @property(AudioSource) private music: AudioSource | null = null;
    @property(AudioSource) private sfx: AudioSource | null = null;

    @property({ type: AudioClip, group: "AudioClip" }) public gachaSound: AudioClip | null = null;
    @property({ type: AudioClip, group: "AudioClip" }) public winSfx: AudioClip | null = null;

    constructor() {
        super();
        SoundManager.Ins = this;
    }

    public playStartSound() {
        if (this.sfx && this.gachaSound) {
            this.sfx.clip = this.gachaSound;
            this.sfx.play();
        }
    }

    public playWinSound() {
        if (this.sfx && this.winSfx) {
            this.sfx.clip = this.winSfx;
            this.sfx.play();
        }
    }
}


