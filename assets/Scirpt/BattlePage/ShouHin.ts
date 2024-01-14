import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import PanelBuyInfo from "./PanelBuyInfo";
import { ItemInfo } from "../DataBase/ItemInfo";

const { ccclass, property } = _decorator;
@ccclass("ShouHin")
export default class ShouHin extends BaseComponent {
    @property(Label)
    labelName: Label;
    @property(Label)
    labelGold: Label;
    info: ItemInfo;
    nowType: string;
    openInfo() {
        if (this.nowType == `E`) PanelBuyInfo.instance.switchEquip(this.info);
        else PanelBuyInfo.instance.switchUse(this.info);
        PanelBuyInfo.instance.show();
    }
}
