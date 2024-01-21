import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import { SetItemInfo } from "../計算/SetItemInfo";
import { EquipmentType } from "../Enum/EquipmentType";

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
    Attack: Label;
    @property(Label)
    Def: Label;
    @property(Label)
    Speed: Label;
    @property(Label)
    Lucky: Label;
    @property(Label)
    Type: Label;
    info: ItemInfo;
    protected start(): void {
        this.setEvent(EventEnum.init, this.init);
    }
    init() {
        this.Name.string = this.info.Name;
        this.Type.string = this.info.Type;
        this.Durability.string = `耐久 ${this.info.Durability.toString()}`;
        switch (this.info.Type) {
            case EquipmentType.E3:
            case EquipmentType.E4:
                this.Attack.string = `魔攻 ${this.info.AP.toString()}`;
                this.Def.string = `魔防 ${this.info.MDF.toString()}`;
                break;
            default:
                this.Attack.string = `物攻 ${this.info.AD.toString()}`;
                this.Def.string = `物防 ${this.info.DEF.toString()}`;
                break;
        }
        this.Speed.string = `重量 ${this.info.Speed.toString()}`;
        this.Lucky.string = `幸運 ${this.info.Lux.toString()}`;

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
