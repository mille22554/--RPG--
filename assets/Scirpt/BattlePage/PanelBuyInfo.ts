import { Label, _decorator, path, warn } from "cc";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { ItemInfo } from "../DataBase/ItemInfo";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { PublicData } from "../DataBase/PublicData";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("PanelBuyInfo")
export default class PanelBuyInfo extends BaseSingletonComponent<PanelBuyInfo>() {
    @property(Label)
    Name: Label;
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
    nowItemInfo: ItemInfo;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
    }
    show(...any: any[]): void {
        super.show();
        SaveAndLoad.getInstance.loadItemData();
    }
    switchEquip(info: ItemInfo) {
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
        this.Gold.string = `$ ${info.Gold.toString()}`;
    }
    switchUse(info: ItemInfo) {
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
    }
    buy() {
        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadItemData();
        for (let type in PublicData.getInstance.item)
            for (let key in PublicData.getInstance.item[type]) {
                if (
                    PublicData.getInstance.item[type][key].Type ==
                    this.nowItemInfo.Type
                ) {
                    if (
                        PublicData.getInstance.userData.Gold <
                        this.nowItemInfo.Gold
                    )
                        return;
                    PublicData.getInstance.userData.Gold -=
                        this.nowItemInfo.Gold;

                    if (type == `equipment`) {
                        PublicData.getInstance.userItem.userEquip.push(
                            this.nowItemInfo
                        );
                        this.nowItemInfo.Num =
                            PublicData.getInstance.userItem.userEquip.indexOf(
                                this.nowItemInfo
                            );
                        SaveAndLoad.getInstance.saveItemData(
                            PublicData.getInstance.userItem.userEquip,
                            DataKey.UserEquipKey
                        );
                    } else {
                        PublicData.getInstance.userItem.userUseItem[
                            key
                        ].Num += 1;
                        SaveAndLoad.getInstance.saveItemData(
                            PublicData.getInstance.userItem.userUseItem,
                            DataKey.UserUseItemKey
                        );
                    }
                    SaveAndLoad.getInstance.saveUserData(
                        PublicData.getInstance.userData,
                        PublicData.getInstance.userExtra
                    );
                    this.eventEmit(EventEnum.infoLabelRefresh);
                }
            }
    }
}
