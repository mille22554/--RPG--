import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import PanelMessage from "./PanelMessage";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { PublicData } from "../DataBase/PublicData";

const { ccclass, property } = _decorator;
@ccclass("Equipment")
export default class Equipment extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Equip: Label;
    @property(Label)
    Type: Label;
    info: ItemInfo;
    openInfo() {
        PanelMessage.instance.switchPanelMessageEquip(this.info);
    }
}
