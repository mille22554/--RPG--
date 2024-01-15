import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { PublicData } from "../DataBase/PublicData";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { ItemInfo } from "../DataBase/ItemInfo";
import PanelMessage from "./PanelMessage";

const { ccclass, property } = _decorator;
@ccclass("UseItem")
export default class UseItem extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Num: Label;
    info: ItemInfo;
    openInfo() {
        PanelMessage.instance.switchPanelMessageUse(this);
    }
}
