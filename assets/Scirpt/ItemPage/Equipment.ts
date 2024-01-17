import { Label, _decorator, warn } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import PanelMessage from "./PanelMessage";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { PublicData } from "../DataBase/PublicData";
import { EventEnum } from "../Enum/EventEnum";

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
    protected start(): void {
        this.init();
        this.setEvent(`init`, this.init);
    }
    init() {
        if (this.info.isEquip) this.Equip.string = `裝備中`;
        else this.Equip.string = `裝備`;
        this.node.setSiblingIndex(this.info.ID);
    }
    openInfo() {
        PanelMessage.instance.switchPanelMessageEquip(this);
        this.eventEmit(EventEnum.setScrollViewHeight)
    }
    setEuqipText(type) {
        if (this.Type == type) this.Equip.string = `裝備`;
    }
    btnEquip() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadPlayerEquipData();
        SaveAndLoad.getInstance.loadItemData();
        PublicData.getInstance.userItem.userEquip[this.info.ID].isEquip =
            this.info.isEquip = !this.info.isEquip;
        PanelMessage.instance.equip(this);
    }
}
