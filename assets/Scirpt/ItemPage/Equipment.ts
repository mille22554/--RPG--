import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import { SetItemInfo } from "../計算/SetItemInfo";

const { ccclass, property } = _decorator;
@ccclass("Equipment")
export default class Equipment extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Equip: Label;
    @property(Label)
    Durability: Label;
    @property(Label)
    Type: Label;
    info: ItemInfo;
    protected start(): void {
        this.init();
        this.setEvent(EventEnum.init, this.init);
    }
    init() {
        if (this.info.isEquip) this.Equip.string = `裝備中`;
        else this.Equip.string = `裝備`;
        this.node.setSiblingIndex(
            SetItemInfo.getInstance.findIndexByID(this.info.ID)
        );
    }
    openInfo() {
        this.eventEmit(EventEnum.switchPanelMessageEquip, this.info);
        this.eventEmit(EventEnum.setScrollViewHeightIP);
    }
    setEuqipText(type) {
        if (this.Type == type) this.Equip.string = `裝備`;
    }
    btnEquip() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadPlayerEquipData();
        SaveAndLoad.getInstance.loadItemData();
        SetItemInfo.getInstance.findEquipByID(this.info.ID).isEquip =
            this.info.isEquip = !this.info.isEquip;
            this.eventEmit(EventEnum.equip, this);
    }
}
