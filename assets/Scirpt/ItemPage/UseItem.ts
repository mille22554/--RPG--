import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("UseItem")
export default class UseItem extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Num: Label;
    info: ItemInfo;
    openInfo() {
        this.eventEmit(EventEnum.switchPanelMessageUse, this.info);
        this.eventEmit(EventEnum.setScrollViewHeightIP)
    }
}
