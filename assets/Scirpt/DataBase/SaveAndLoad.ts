import { _decorator, sys, warn } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import PlayerEquip from "./PlayerEquip";
import { PublicData } from "./PublicData";
import { ExtraPoint, UserData } from "./UserData";
import { ItemInfo } from "./ItemInfo";
const { ccclass, property } = _decorator;

@ccclass("SaveAndLoad")
export class SaveAndLoad extends BaseSingleton<SaveAndLoad>() {
    startGameLoad(): Promise<void> {
        return new Promise((resolve) => {
            this.loadUserData();
            this.loadItemData();
            this.loadPlayerEquipData();
            this.UpdateData();
            resolve();
        });
    }
    //#region 玩家
    saveUserData(data, extra) {
        const userData = data;
        const userExtra = extra;
        const jsonData = JSON.stringify(userData);
        const jsonExtra = JSON.stringify(userExtra);
        sys.localStorage.setItem(DataKey.userDataKey, jsonData);
        sys.localStorage.setItem(DataKey.userExtraKey, jsonExtra);
    }
    loadUserData() {
        const jsonData = sys.localStorage.getItem(DataKey.userDataKey);
        const jsonExtra = sys.localStorage.getItem(DataKey.userExtraKey);
        let userData = JSON.parse(jsonData) as UserData;
        let userExtra = JSON.parse(jsonExtra) as ExtraPoint;
        this.saveUserData(
            userData == null ? new UserData() : userData,
            userExtra == null ? new ExtraPoint() : userExtra
        );
        if (userData == null || userExtra == null) {
            this.loadUserData();
            return;
        }
        userData = JSON.parse(jsonData) as UserData;
        userExtra = JSON.parse(jsonExtra) as ExtraPoint;
        PublicData.getInstance.userData = userData;
        PublicData.getInstance.userExtra = userExtra;
    }
    //#endregion
    //#region 怪
    saveMobData(data) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(DataKey.mobDataKey, jsonData);
    }
    loadMobData() {
        const jsonData = sys.localStorage.getItem(DataKey.mobDataKey);
        let Data = JSON.parse(jsonData);
        if (Data == null) {
            this.loadMobData();
            return;
        }
        PublicData.getInstance.mobData = Data;
    }
    //#endregion
    //#region 物品
    async saveItemData(data, key: string): Promise<void> {
        return new Promise((resolve) => {
            const Data = data;
            const jsonData = JSON.stringify(Data);
            sys.localStorage.setItem(key, jsonData);
            resolve();
        });
    }
    loadItemData() {
        for (let key of [
            DataKey.UserDropItemKey,
            DataKey.UserEquipKey,
            DataKey.UserUseItemKey,
        ]) {
            const jsonData = sys.localStorage.getItem(key);
            let Data = JSON.parse(jsonData);
            this.saveItemData(
                Data == null ? this.firstLogin(key, Data) : Data,
                key
            );
            if (Data == null) {
                this.loadItemData();
                return;
            }
            Data = JSON.parse(jsonData);
            PublicData.getInstance.userItem[key] = Data;
        }
    }
    firstLogin(key, Data) {
        if (key == DataKey.UserDropItemKey)
            Data = PublicData.getInstance.item.dropItem;
        if (key == DataKey.UserEquipKey) {
            PublicData.getInstance.item.equipment.短刀.ID = 0;
            Data = [PublicData.getInstance.item.equipment.短刀];
        }
        if (key == DataKey.UserUseItemKey) {
            Data = PublicData.getInstance.item.useItem;
            Data.HP藥水_小.Num = 10;
            Data.體力藥水_小.Num = 10;
        }
        return Data;
    }
    //#endregion
    //#region 裝備中
    savePlayerEquipData(data) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(DataKey.PlayerEquipKey, jsonData);
    }
    loadPlayerEquipData() {
        const jsonData = sys.localStorage.getItem(DataKey.PlayerEquipKey);
        let Data = JSON.parse(jsonData);
        this.savePlayerEquipData(Data == null ? new PlayerEquip() : Data);
        Data = JSON.parse(jsonData);
        if (Data == null) {
            this.loadPlayerEquipData();
            return;
        }
        for (let key in new PlayerEquip())
            PublicData.getInstance.playerEquip[key] = Data[key];
    }
    //#endregion
    //#region 更新資料
    UpdateData() {
        let data;

        data = new UserData();
        for (let i in PublicData.getInstance.userData)
            data[i] = PublicData.getInstance.userData[i];
        PublicData.getInstance.userData = data;

        data = new ExtraPoint();
        for (let i in PublicData.getInstance.userExtra) {
            data[i] = PublicData.getInstance.userExtra[i];
        }
        PublicData.getInstance.userExtra = data;

        this.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
    }
    //#endregion
}
export enum DataKey {
    userDataKey = "userData",
    mobDataKey = "mobData",
    userExtraKey = "userExrta",
    UserDropItemKey = "userDropItem",
    UserEquipKey = "userEquip",
    UserUseItemKey = "userUseItem",
    PlayerEquipKey = "playerEquip",
}
