import { Label, Node, _decorator } from "cc";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import { SetUserEquip } from "../計算/SetUserEquip";

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
    nowItemClass;
    nowType: string;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
    }
    show(...any: any[]): void {
        super.show();
        SaveAndLoad.getInstance.loadItemData();
    }
    switchPanelMessageEquip(info) {
        this.show();
        this.nowItemClass = info;
        this.Name.string = info.info.Name;
        this.Type.string = info.info.Type;
        this.Durability.string = `耐久 ${info.info.Durability.toString()}`;
        this.AD.string = `物攻 ${info.info.AD.toString()}`;
        this.DEF.string = `物防 ${info.info.DEF.toString()}`;
        this.AP.string = `魔攻 ${info.info.AP.toString()}`;
        this.MDF.string = `魔防 ${info.info.MDF.toString()}`;
        this.Speed.string = `速度 ${info.info.Speed.toString()}`;
        this.Critical.string = `爆擊 ${info.info.Critical.toString()}`;
        this.Dodge.string = `迴避 ${info.info.Dodge.toString()}`;
        this.Gold.string = `$ ${(info.info.Gold / 2).toString()}`;
        this.Num.string = ``;
        this.Equip.string = this.nowItemClass.Equip.string;
        this.btnEquip.active = true;
    }
    switchPanelMessageSozai(info) {
        this.show();
        this.nowItemClass = info;
        this.Name.string = info.info.Name;
        this.Type.string = ``;
        this.Durability.string = ``;
        this.AD.string = ``;
        this.DEF.string = ``;
        this.AP.string = ``;
        this.MDF.string = ``;
        this.Speed.string = ``;
        this.Critical.string = ``;
        this.Dodge.string = ``;
        this.Gold.string = `$ ${info.info.Gold.toString()}`;
        this.Num.string = `X${info.info.Num.toString()}`;
        this.btnEquip.active = false;
    }
    switchPanelMessageUse(info) {
        this.show();
        this.nowItemClass = info;
        this.Name.string = info.info.Name;
        this.Type.string = ``;
        this.Durability.string = ``;
        this.AD.string = ``;
        this.DEF.string = ``;
        this.AP.string = ``;
        this.MDF.string = ``;
        this.Speed.string = ``;
        this.Critical.string = ``;
        this.Dodge.string = ``;
        this.Gold.string = `$ ${(info.info.Gold / 2).toString()}`;
        this.Num.string = `X${info.info.Num.toString()}`;
        this.Equip.string = `使用`;
        this.btnEquip.active = true;
    }
    EquipORUse() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadPlayerEquipData();
        SaveAndLoad.getInstance.loadItemData();
        switch (this.nowType) {
            case `equipment`:                
                PublicData.getInstance.userItem.userEquip[
                    this.nowItemClass.info.ID
                ].isEquip = this.nowItemClass.info.isEquip =
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
            PublicData.getInstance.userItem.userEquip[
                this.nowItemClass[`info`].Num
            ].Gold / 2;
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
            ].Gold;

        PublicData.getInstance.userItem.userDropItem[
            this.nowItemClass[`info`].Type
        ].Num -= 1;

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
}
