import { _decorator, Component, sys, warn } from "cc";
import BaseSingleton from "../Model/Singleton/BaseSingleton";
import CharactorPage from "./CharactorPage";
import { UserData, ExtraPoint, ItemInfo } from "./DataBase";
const { ccclass, property } = _decorator;

@ccclass("SaveAndLoad")
export class SaveAndLoad extends BaseSingleton<SaveAndLoad>() {
    constructor() {
        super();
        this.loadUserData();
        this.loadItemData(DataKey.userDropItemKey)
    }
    saveUserData(data, extra) {
        const userData = data;
        const userExtra = extra;
        const jsonData = JSON.stringify(userData);
        const jsonExtra = JSON.stringify(userExtra);
        sys.localStorage.setItem(DataKey.userDataKey, jsonData);
        sys.localStorage.setItem(DataKey.userExtraKey, jsonExtra);
    }
    saveMobData(data) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(DataKey.mobDataKey, jsonData);
    }
    loadMobData() {
        const jsonData = sys.localStorage.getItem(DataKey.mobDataKey);
        let Data = JSON.parse(jsonData);
        return Data;
    }
    saveItemData(data, key: string) {
        const Data = data;
        const jsonData = JSON.stringify(Data);
        sys.localStorage.setItem(key, jsonData);
    }
    loadItemData(key: string) {
        const jsonData = sys.localStorage.getItem(key);
        let Data = JSON.parse(jsonData);
        this.saveItemData(Data == null ? this.initItem() : Data, key);
        Data = JSON.parse(jsonData);
        return Data;
    }
    loadUserData() {
        const jsonData = sys.localStorage.getItem(DataKey.userDataKey);
        const jsonExtra = sys.localStorage.getItem(DataKey.userExtraKey);
        let userData = JSON.parse(jsonData) as UserData;
        let userExtra = JSON.parse(jsonExtra) as ExtraPoint;
        this.saveUserData(
            userData == null ? this.initData() : userData,
            userExtra == null ? this.initExtra() : userExtra
        );
        userData = JSON.parse(jsonData) as UserData;
        userExtra = JSON.parse(jsonExtra) as ExtraPoint;
        return [userData, userExtra];
    }
    initData() {
        let data: UserData = {
            Name: `Kirito`,
            HP: `100/100`,
            MP: `50/50`,
            Stamina: `100/100`,
            Level: 1,
            Gold: 0,
            Exp: `0/10`,
            Str: 1,
            Vit: 1,
            Dex: 1,
            Int: 1,
            Agi: 1,
            Lux: 1,
            Point: 6,
            ZoneName: ``,
            AD: 0,
            AP: 0,
            DEF: 0,
            MDF: 0,
            Dodge: 0,
            Critical: 0,
            Speed: 0,
            Lucky: 0,
            AreaLevel: 1,
            isBattle: false,
            isField: false,
            isResting: false,
            ZoneLevel: 1,
        };
        return data;
    }
    initExtra() {
        let extra: ExtraPoint = {
            Str: 0,
            Vit: 0,
            Dex: 0,
            Int: 0,
            Agi: 0,
            Lux: 0,
        };
        return extra;
    }
    initItem() {
        let item = [new ItemInfo()];
        item[0].AD = 0;
        item[0].AP = 0;
        item[0].Critical = 0;
        item[0].DEF = 0;
        item[0].Dodge = 0;
        item[0].Gold = 0;
        item[0].ID = 0;
        item[0].Lucky = 0;
        item[0].MDF = 0;
        item[0].Speed = 0;
        item[0].Num = 0;
        item[0].Name = ``;
        return item;
    }
}
export enum DataKey {
    userDataKey = "userData",
    mobDataKey = "mobData",
    userExtraKey = "userExrta",
    userDropItemKey = "userDropItem",
}
