import { _decorator, Component, sys, warn } from "cc";
import BaseSingleton from "../Model/Singleton/BaseSingleton";
import CharactorPage from "./CharactorPage";
const { ccclass, property } = _decorator;

const coinKey: string = "gold";
const userDataKey = "userData";
const userExtraKey = "userExrta";

export interface UserData {
    Name: string;
    HP: string;
    MP: string;
    Stamina: string;
    Level: number;
    Gold: number;
    Exp: string;
    Point: number;
    Str: number;
    Vit: number;
    Dex: number;
    Int: number;
    Agi: number;
    Lux: number;
}
export interface ExtraPoint {
    Str: number;
    Vit: number;
    Dex: number;
    Int: number;
    Agi: number;
    Lux: number;
}

@ccclass("SaveAndLoad")
export class SaveAndLoad extends BaseSingleton<SaveAndLoad>() {
    constructor() {
        super();
        this.loadUserData();
    }
    saveUserData(data, extra) {
        const userData = data;
        const userExtra = extra;
        const jsonData = JSON.stringify(userData);
        const jsonExtra = JSON.stringify(userExtra);
        sys.localStorage.setItem(userDataKey, jsonData);
        sys.localStorage.setItem(userExtraKey, jsonExtra);
    }

    loadUserData() {
        const jsonData = sys.localStorage.getItem(userDataKey);
        const jsonExtra = sys.localStorage.getItem(userExtraKey);
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
}
