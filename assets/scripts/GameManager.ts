import { _decorator, Component, input, Node, Input, KeyCode, random, randomRange, randomRangeInt } from 'cc';
import { SlotController } from './SlotController';
import { ItemController } from './ItemController';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(ItemController)
    itemController: ItemController | null = null;
    
    @property(SlotController)
    slotController: SlotController | null = null;

    isKeyHeld: boolean = false;
    targetItemId: number = -1;
    isProcessing: boolean = false;

    start() {

    }

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private onKeyDown(event: any) {
        if (event.keyCode === KeyCode.SPACE) {
            this.Gacha();
            setTimeout(() => {
                this.isProcessing = false;
            }, 5000);
        }
    }

    Gacha() {
        this.isProcessing = true;
        var rnd = randomRangeInt(0, this.itemController!.items.length);
        var round = randomRangeInt(3, 7);
        var offset = rnd - this.itemController!.currentIndex;
        var totalSteps = round * this.itemController!.items.length + offset;
        console.log("Space key pressed, selecting item id: " + rnd + ", totalSteps: " + totalSteps);
        
        this.itemController.ShowItemClockwise(totalSteps);
        this.slotController.RollTheSlot(totalSteps);
    }
}


