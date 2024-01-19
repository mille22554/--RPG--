import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("Sozai")
export default class Sozai extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Num: Label;
    info: ItemInfo;
    openInfo() {
        this.eventEmit(EventEnum.switchPanelMessageSozai, this.info);
        this.eventEmit(EventEnum.setScrollViewHeightIP)
    }
}
