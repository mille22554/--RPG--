import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { EventEnum } from "../Enum/EventEnum";
import PanelMessage from "./PanelMessage";

const { ccclass, property } = _decorator;
@ccclass("Sozai")
export default class Sozai extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Num: Label;
    info: ItemInfo;
    openInfo() {
        PanelMessage.instance.switchPanelMessageSozai(this);
        this.eventEmit(EventEnum.setScrollViewHeightIP)
    }
}
