import { _decorator, sys, warn } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { DropItem, ItemInfo, UseItem } from "./ItemInfo";
import PlayerEquip from "./PlayerEquip";
import { PublicData } from "./PublicData";
import { ExtraPoint, UserData } from "./UserData";
import { BattleData } from "./BattleData";
const { ccclass, property } = _decorator;

@ccclass("SaveAndLoad")
export class SaveAndLoad extends BaseSingleton<SaveAndLoad>() {
    startGameLoad(): Promise<void> {
        return new Promise((resolve) => {
            this.loadUserData();
            this.loadMobData();
            this.loadItemData();
            this.loadPlayerEquipData();
            this.loadBattleData();
            resolve();
        });
    }
    //#region 玩家
    saveUserData(data: UserData, extra: ExtraPoint) {
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
        return new Promise<void>((resolve) => {
            const jsonData = sys.localStorage.getItem(DataKey.mobDataKey);
            let Data = JSON.parse(jsonData);
            if (Data == null) {
                this.loadMobData();
                return;
            }
            PublicData.getInstance.mobData = Data;
            resolve();
        });
    }
    //#endregion
    //#region 物品
    async saveItemData(data: DropItem | ItemInfo[] | UseItem, key: string) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(key, jsonData);
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
    firstLogin(key: DataKey, Data: DropItem | ItemInfo[] | UseItem) {
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
    savePlayerEquipData(data: PlayerEquip) {
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
        //#region 玩家
        data = new UserData();
        for (let i in PublicData.getInstance.userData)
            data[i] = PublicData.getInstance.userData[i];
        PublicData.getInstance.userData = data;

        data = new ExtraPoint();
        for (let i in PublicData.getInstance.userExtra) {
            data[i] = PublicData.getInstance.userExtra[i];
        }
        PublicData.getInstance.userExtra = data;
        //#endregion
        //#region 怪
        for (let mob of PublicData.getInstance.mobData) {
            data = new UserData();
            for (let i in mob) {
                data[i] = mob[i];
            }
            mob = data;
        }
        //#endregion
        //#region 物品
        //#region 裝
        for (let equip of PublicData.getInstance.userItem.userEquip) {
            data = new ItemInfo();
            for (let i in equip) {
                data[i] = equip[i];
            }
            equip = data;
        }
        //#endregion
        //#region 掉落物
        for (let drop in PublicData.getInstance.userItem.userDropItem) {
            data = new ItemInfo();
            for (let i in PublicData.getInstance.userItem.userDropItem[drop]) {
                data[i] = PublicData.getInstance.userItem.userDropItem[drop][i];
            }
            PublicData.getInstance.userItem.userDropItem[drop] = data;
        }
        //#endregion
        //#region 消耗
        for (let use in PublicData.getInstance.userItem.userUseItem) {
            data = new ItemInfo();
            for (let i in PublicData.getInstance.userItem.userUseItem[use]) {
                data[i] = PublicData.getInstance.userItem.userUseItem[use][i];
            }
            PublicData.getInstance.userItem.userUseItem[use] = data;
        }
        //#endregion
        //#endregion
        this.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        this.saveMobData(PublicData.getInstance.mobData);
        this.saveItemData(
            PublicData.getInstance.userItem.userEquip,
            DataKey.UserEquipKey
        );
        this.saveItemData(
            PublicData.getInstance.userItem.userDropItem,
            DataKey.UserDropItemKey
        );
        this.saveItemData(
            PublicData.getInstance.userItem.userUseItem,
            DataKey.UserUseItemKey
        );
    }
    //#endregion
    //#region 戰鬥資訊
    saveBattleData(data: BattleData) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(DataKey.BattleDataKey, jsonData);
    }
    loadBattleData() {
        const jsonData = sys.localStorage.getItem(DataKey.BattleDataKey);
        let Data = JSON.parse(jsonData);
        if (Data == null) {
            this.loadBattleData();
            return;
        }
        PublicData.getInstance.battleData = Data;
    }
    //#endregion
    saveAllData() {
        this.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        this.saveMobData(PublicData.getInstance.mobData);
        this.saveItemData(
            PublicData.getInstance.userItem.userEquip,
            DataKey.UserEquipKey
        );
        this.saveItemData(
            PublicData.getInstance.userItem.userDropItem,
            DataKey.UserDropItemKey
        );
        this.saveItemData(
            PublicData.getInstance.userItem.userUseItem,
            DataKey.UserUseItemKey
        );
        this.savePlayerEquipData(PublicData.getInstance.playerEquip);
        this.saveBattleData(PublicData.getInstance.battleData)
    }
    loadAllData() {
        this.loadUserData();
        this.loadMobData();
        this.loadItemData();
        this.loadPlayerEquipData();
        this.loadBattleData()
    }
}
export enum DataKey {
    userDataKey = "userData",
    mobDataKey = "mobData",
    userExtraKey = "userExrta",
    UserDropItemKey = "userDropItem",
    UserEquipKey = "userEquip",
    UserUseItemKey = "userUseItem",
    PlayerEquipKey = "playerEquip",
    BattleDataKey = `BattleDataKey`,
}
