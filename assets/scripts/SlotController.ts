import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SlotController')
export class SlotController extends Component {
    @property(Node)
    public slotNode: Node | null = null;

    @property
    public slotHeight: number = 112.5;

    @property
    public spacingY: number = 50;

    private startPos: Vec3 = new Vec3();
    private isRolling: boolean = false;

    protected start(): void {
        if (this.slotNode) {
            this.startPos = this.slotNode.position.clone();
        }
    }

    public RollTheSlot(totalSteps: number) {
        if (!this.slotNode || this.isRolling) return;

        this.isRolling = true;

        const moveDistance = this.slotHeight + this.spacingY;
        const totalDistance = moveDistance * totalSteps;
        const duration = 5; // seconds
        
        const startY = this.slotNode.position.y;
        const resetLimit = 9 * moveDistance;
        const endY = startY + totalDistance;

        tween(this.slotNode)
            .to(duration, { position: new Vec3(this.slotNode.position.x, endY, 0) }, {
                easing: 'linear',
                onUpdate: () => {
                    const y = this.slotNode.position.y;
                    // Wrap position continuously
                    const relativeY = ((y - this.startPos.y) % resetLimit + resetLimit) % resetLimit;
                    this.slotNode.setPosition(this.startPos.x, this.startPos.y + relativeY);
                },
            })
            .call(() => {
                this.isRolling = false;
            })
            .start();
    }
}
