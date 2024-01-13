import { _decorator, sys } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ItemType } from "./ItemInfo";
import { PublicData } from "./PublicData";
import { ExtraPoint, UserData } from "./UserData";
const { ccclass, property } = _decorator;

@ccclass("SaveAndLoad")
export class SaveAndLoad extends BaseSingleton<SaveAndLoad>() {
    startGameLoad(): Promise<void> {
        return new Promise((resolve) => {
            this.loadUserData();
            this.loadItemData();
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
        PublicData.getInstance.mobData = Data;
    }
    //#endregion
    //#region 物品
    saveItemData(data, key: string) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(key, jsonData);
    }
    loadItemData() {
        for (let key of [DataKey.DropItemKey]) {
            const jsonData = sys.localStorage.getItem(key);
            let Data = JSON.parse(jsonData);
            this.saveItemData(Data == null ? new ItemType()[key] : Data, key);
            Data = JSON.parse(jsonData);
            PublicData.getInstance.item[key] = Data;
        }
    }
    //#endregion
}
export enum DataKey {
    userDataKey = "userData",
    mobDataKey = "mobData",
    userExtraKey = "userExrta",
    DropItemKey = "dropItem",
}