import { _decorator, Color, Component, randomRangeInt } from 'cc';
import { Item } from './Item';
const { ccclass, property } = _decorator;

@ccclass('ItemController')
export class ItemController extends Component {
    @property([Item])
    items: Item[] = [];

    public currentIndex: number = 0;

    onEnable(): void {
        this.items.forEach((item) => {
            item.Hide();
        });
    }

    ShowItemClockwise(totalSteps: number) {
        var delayTime = 5000 / totalSteps;

        for (let i = 0; i <= totalSteps; i++) {
            let index = (this.currentIndex + i) % this.items.length;
            let item = this.items[index];
            setTimeout(() => {
                if (i == totalSteps) {
                    item.Highlight(); // Highlight final item
                }
                else {
                    item.Show(); // Normal animation
                }
                if (i === totalSteps) {
                    this.currentIndex = index;
                }
            }, delayTime * i);
        }
    }
}
