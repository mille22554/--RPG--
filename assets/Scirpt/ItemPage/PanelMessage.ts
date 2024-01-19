import { EditBox, Label, Node, _decorator, warn } from "cc";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import { SetUserEquip } from "../計算/SetUserEquip";
import { SetUserInfo } from "../計算/SetUserInfo";
import { SetItemInfo } from "../計算/SetItemInfo";
import Equipment from "./Equipment";
import Sozai from "./Sozai";
import UseItem from "./UseItem";
import { ItemInfo } from "../DataBase/ItemInfo";

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
    Durability: Label;
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
    @property(Node)
    content: Node;
    @property(Node)
    saleNum: Node;
    @property(EditBox)
    editbox: EditBox;
    nowItemClass;
    nowItemInfo: ItemInfo;
    nowType: string;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
        this.setEvent(EventEnum.switchPanelMessageEquip,this.switchPanelMessageEquip)
        this.setEvent(EventEnum.switchPanelMessageSozai,this.switchPanelMessageSozai)
        this.setEvent(EventEnum.switchPanelMessageUse,this.switchPanelMessageUse)
        this.setEvent(EventEnum.equip,this.equip)
    }
    show(...any: any[]): void {
        super.show();
        SaveAndLoad.getInstance.loadItemData();
        this.editbox.textLabel.string = `0`;
    }
    switchPanelMessageEquip(info: ItemInfo) {
        this.show();
        this.nowItemInfo = info;
        this.nowItemClass =
            this.content.children[
                SetItemInfo.getInstance.findIndexByID(info.ID)
            ].getComponent(Equipment);
        this.Name.string = info.Name;
        this.Type.string = info.Type;
        this.Durability.string = `耐久 ${info.Durability.toString()}`;
        this.AD.string = `物攻 ${info.AD.toString()}`;
        this.DEF.string = `物防 ${info.DEF.toString()}`;
        this.AP.string = `魔攻 ${info.AP.toString()}`;
        this.MDF.string = `魔防 ${info.MDF.toString()}`;
        this.Speed.string = `速度 ${info.Speed.toString()}`;
        this.Critical.string = `爆擊 ${info.Critical.toString()}`;
        this.Dodge.string = `迴避 ${info.Dodge.toString()}`;
        this.Gold.string = `$ ${(info.Gold / 2).toString()}`;
        this.Num.string = ``;
        this.Equip.string = this.nowItemClass.Equip.string;
        this.btnEquip.active = true;
        this.saleNum.active = false;
    }
    switchPanelMessageSozai(info: ItemInfo) {
        this.show();
        this.nowItemInfo = info;
        this.nowItemClass =
            this.content.children[
                SetItemInfo.getInstance.findIndexByType(
                    DataKey.UserDropItemKey,
                    info.Type
                )
            ].getComponent(Sozai);
        this.Name.string = info.Name;
        this.Type.string = ``;
        this.Durability.string = ``;
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
        this.saleNum.active = true;
    }
    switchPanelMessageUse(info: ItemInfo) {
        this.show();
        this.nowItemInfo = info;
        this.nowItemClass =
            this.content.children[
                SetItemInfo.getInstance.findIndexByType(
                    DataKey.UserUseItemKey,
                    info.Type
                )
            ].getComponent(UseItem);
        this.Name.string = info.Name;
        this.Type.string = ``;
        this.Durability.string = ``;
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
        this.saleNum.active = true;
    }
    EquipORUse() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadPlayerEquipData();
        SaveAndLoad.getInstance.loadItemData();
        switch (this.nowType) {
            case `equipment`:
                this.nowItemClass =
                    this.content.children[
                        SetItemInfo.getInstance.findIndexByID(
                            this.nowItemInfo.ID
                        )
                    ].getComponent(Equipment);
                SetItemInfo.getInstance.findEquipByID(
                    this.nowItemClass.info.ID
                ).isEquip = this.nowItemClass.info.isEquip =
                    !this.nowItemClass.info.isEquip;
                this.equip(this.nowItemClass);
                break;
            case `use`:
                this.use();
                break;
        }
    }
    equip(_class) {
        SetUserEquip.getInstance.set(_class);
        this.Equip.string = _class.Equip.string;

        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.savePlayerEquipData(
            PublicData.getInstance.playerEquip
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userEquip,
            DataKey.UserEquipKey
        );
        SetUserInfo.getInstance.setUserInfo();
        this.eventEmit(EventEnum.refreshItemPage);
    }
    use() {
        let HP = Number(PublicData.getInstance.userData[`HP`].split(`/`)[0]),
            MP = Number(PublicData.getInstance.userData[`MP`].split(`/`)[0]),
            Stamina = Number(
                PublicData.getInstance.userData[`Stamina`].split(`/`)[0]
            ),
            maxStamina = Number(
                PublicData.getInstance.userData[`Stamina`].split(`/`)[1]
            ),
            maxHP = Number(PublicData.getInstance.userData[`HP`].split(`/`)[1]),
            maxMP = Number(PublicData.getInstance.userData[`MP`].split(`/`)[1]);

        Stamina += this.nowItemClass[`info`].Stamina;
        if (Stamina > maxStamina) Stamina = maxStamina;

        HP += this.nowItemClass[`info`].HP;
        if (HP > maxHP) HP = maxHP;

        MP += this.nowItemClass[`info`].MP;
        if (MP > maxMP) MP = maxMP;

        PublicData.getInstance.userItem.userUseItem[
            this.nowItemClass[`info`].Type
        ].Num -= 1;

        this.Num.string =
            this.nowItemClass.Num.string = `X${PublicData.getInstance.userItem.userUseItem[
                this.nowItemClass[`info`].Type
            ].Num.toString()}`;

        PublicData.getInstance.userData[`HP`] = `${Math.floor(HP)}/${
            PublicData.getInstance.userData[`HP`].split(`/`)[1]
        }`;
        PublicData.getInstance.userData[`MP`] = `${Math.floor(MP)}/${
            PublicData.getInstance.userData[`MP`].split(`/`)[1]
        }`;
        PublicData.getInstance.userData[`Stamina`] = `${Math.floor(Stamina)}/${
            PublicData.getInstance.userData[`Stamina`].split(`/`)[1]
        }`;

        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userUseItem,
            DataKey.UserUseItemKey
        );
        if (
            PublicData.getInstance.userItem.userUseItem[
                this.nowItemClass[`info`].Type
            ].Num == 0
        ) {
            this.hide();
            this.eventEmit(EventEnum.refreshItemPage);
        }
    }
    sale() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadItemData();
        if (PublicData.getInstance.userData.isField) return;
        switch (this.nowType) {
            case `equipment`:
                this.saleEquip();
                break;
            case `sozai`:
                this.saleDropItem();
                break;
            case `use`:
                this.saleUseItem();
                break;
        }
    }
    saleEquip() {
        PublicData.getInstance.userData.Gold +=
            SetItemInfo.getInstance.findEquipByID(this.nowItemClass[`info`].Num)
                .Gold / 2;
        PublicData.getInstance.userItem.userEquip.splice(
            this.nowItemClass[`info`].Num,
            1
        );
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userEquip,
            DataKey.UserEquipKey
        );
        this.eventEmit(EventEnum.refreshItemPage);
        this.hide();
    }
    saleDropItem() {
        PublicData.getInstance.userData.Gold +=
            PublicData.getInstance.userItem.userDropItem[
                this.nowItemClass[`info`].Type
            ].Gold * Number(this.editbox.textLabel.string);

        PublicData.getInstance.userItem.userDropItem[
            this.nowItemClass[`info`].Type
        ].Num -= Number(this.editbox.textLabel.string);

        this.Num.string =
            this.nowItemClass.Num.string = `X${PublicData.getInstance.userItem.userDropItem[
                this.nowItemClass[`info`].Type
            ].Num.toString()}`;

        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userDropItem,
            DataKey.UserDropItemKey
        );
        this.onTexting();
        if (
            PublicData.getInstance.userItem.userDropItem[
                this.nowItemClass[`info`].Type
            ].Num == 0
        ) {
            this.hide();
            this.eventEmit(EventEnum.refreshItemPage);
        }
    }
    saleUseItem() {
        PublicData.getInstance.userData.Gold +=
            PublicData.getInstance.userItem.userUseItem[
                this.nowItemClass[`info`].Type
            ].Gold / 2;

        PublicData.getInstance.userItem.userUseItem[
            this.nowItemClass[`info`].Type
        ].Num -= 1;

        this.Num.string =
            this.nowItemClass.Num.string = `X${PublicData.getInstance.userItem.userUseItem[
                this.nowItemClass[`info`].Type
            ].Num.toString()}`;

        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.userItem.userUseItem,
            DataKey.UserUseItemKey
        );
        if (
            PublicData.getInstance.userItem.userUseItem[
                this.nowItemClass[`info`].Type
            ].Num == 0
        ) {
            this.hide();
            this.eventEmit(EventEnum.refreshItemPage);
        }
    }
    onTexting() {
        if (Number(this.editbox.textLabel.string) > this.nowItemInfo.Num)
            this.editbox.textLabel.string = this.nowItemInfo.Num.toString();
    }
}
