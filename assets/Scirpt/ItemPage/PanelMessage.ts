import { Label, Node, _decorator, warn } from "cc";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { PublicData } from "../DataBase/PublicData";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("PanelMessage")
export default class PanelMessage extends BaseSingletonComponent<PanelMessage>() {
    @property(Label)
    Name: Label;
    @property(Label)
    Equip: Label;
    @property(Label)
    Type: Label;
    @property(Label)
    AD: Label;
    @property(Label)
    DEF: Label;
    @property(Label)
    AP: Label;
    @property(Label)
    MDF: Label;
    @property(Label)
    Speed: Label;
    @property(Label)
    Critical: Label;
    @property(Label)
    Dodge: Label;
    @property(Label)
    Gold: Label;
    @property(Label)
    Num: Label;
    @property(Node)
    btnEquip: Node;
    nowItemInfo: ItemInfo;
    nowType: string;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
    }
    show(...any: any[]): void {
        super.show();
        SaveAndLoad.getInstance.loadItemData();
    }
    switchPanelMessageEquip(info: ItemInfo) {
        this.show();
        this.nowItemInfo = info;
        this.Name.string = info.Name;
        this.Type.string = info.Type;
        this.AD.string = `物攻 ${info.AD.toString()}`;
        this.DEF.string = `物防 ${info.DEF.toString()}`;
        this.AP.string = `魔攻 ${info.AP.toString()}`;
        this.MDF.string = `魔防 ${info.MDF.toString()}`;
        this.Speed.string = `速度 ${info.Speed.toString()}`;
        this.Critical.string = `爆擊 ${info.Critical.toString()}`;
        this.Dodge.string = `迴避 ${info.Dodge.toString()}`;
        this.Gold.string = `$ ${(info.Gold / 2).toString()}`;
        this.Num.string = ``;
        this.Equip.string = `裝備`;
        this.btnEquip.active = true;
    }
    switchPanelMessageSozai(info: ItemInfo) {
        this.show();
        this.nowItemInfo = info;
        this.Name.string = info.Name;
        this.Type.string = ``;
        this.AD.string = ``;
        this.DEF.string = ``;
        this.AP.string = ``;
        this.MDF.string = ``;
        this.Speed.string = ``;
        this.Critical.string = ``;
        this.Dodge.string = ``;
        this.Gold.string = `$ ${info.Gold.toString()}`;
        this.Num.string = `X${info.Num.toString()}`;
        this.btnEquip.active = false;
    }
    switchPanelMessageUse(info: ItemInfo) {
        this.show();
        this.nowItemInfo = info;
        this.Name.string = info.Name;
        this.Type.string = ``;
        this.AD.string = ``;
        this.DEF.string = ``;
        this.AP.string = ``;
        this.MDF.string = ``;
        this.Speed.string = ``;
        this.Critical.string = ``;
        this.Dodge.string = ``;
        this.Gold.string = `$ ${(info.Gold / 2).toString()}`;
        this.Num.string = `X${info.Num.toString()}`;
        this.Equip.string = `使用`;
        this.btnEquip.active = true;
    }
    sale() {
        switch (this.nowType) {
            case `equipment`:
                break;
            case `sozai`:
                this.saleDropItem();
                break;
            case `use`:
                this.saleUseItem();
                break;
        }
    }
    saleDropItem() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadItemData();
        if (PublicData.getInstance.userData.isField) return;
        PublicData.getInstance.userData.Gold +=
            PublicData.getInstance.userItem.userDropItem[
                this.nowItemInfo.Type
            ].Gold;
        PublicData.getInstance.userItem.userDropItem[
            this.nowItemInfo.Type
        ].Num -= 1;
        this.Num.string = `X${PublicData.getInstance.userItem.userDropItem[
            this.nowItemInfo.Type
        ].Num.toString()}`;
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userDropItem,
            DataKey.UserDropItemKey
        );
        this.eventEmit(EventEnum.refreshItemPage);
        if (
            PublicData.getInstance.userItem.userDropItem[this.nowItemInfo.Type]
                .Num == 0
        )
            this.hide();
    }
    saleUseItem() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadItemData();
        if (PublicData.getInstance.userData.isField) return;
        warn(
            PublicData.getInstance.userItem.userUseItem,
            this.nowItemInfo.Type
        );
        PublicData.getInstance.userData.Gold +=
            PublicData.getInstance.userItem.userUseItem[this.nowItemInfo.Type]
                .Gold / 2;
        PublicData.getInstance.userItem.userUseItem[
            this.nowItemInfo.Type
        ].Num -= 1;
        this.Num.string = `X${PublicData.getInstance.userItem.userUseItem[
            this.nowItemInfo.Type
        ].Num.toString()}`;
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userUseItem,
            DataKey.UserUseItemKey
        );
        this.eventEmit(EventEnum.refreshItemPage);
        if (
            PublicData.getInstance.userItem.userUseItem[this.nowItemInfo.Type]
                .Num == 0
        )
            this.hide();
    }
}
