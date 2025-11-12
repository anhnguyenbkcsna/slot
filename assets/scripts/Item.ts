import { _decorator, Color, Component, Sprite, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component {
    @property
    public id: number = 0;

    @property(Boolean)
    public isItem: boolean = true;

    sprite: Sprite | null = null;

    private currentColor: Color = new Color(255, 255, 255, 255);
    private isKeyHeld: boolean = false;

    protected start(): void {
        this.sprite = this.getComponent(Sprite);
    }

    public Show() {
        if (!this.sprite) return;
        // Highlight then fade away
        tween(this.currentColor).stop();
        tween(this.currentColor)
            .to(0.1, { r: 255, g: 255, b: 255, a: 255 }, {
                onUpdate: () => {
                    if (this.sprite) this.sprite.color = this.currentColor; 
                },
            })
            .to(0.2, { r: 60, g: 60, b: 60, a: 255 }, {
                onUpdate: () => {
                    if (this.sprite) this.sprite.color = this.currentColor;
                },
            })
            .start();
    }

    public Hide() {
        if (this.sprite) this.sprite.color = new Color(60, 60, 60, 255);
    }

    public Highlight() {
        if (this.sprite) this.sprite.color = new Color(255, 255, 255, 255);
    }
}
