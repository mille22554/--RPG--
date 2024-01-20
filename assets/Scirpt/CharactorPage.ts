import { _decorator, Label, Node } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "./DataBase/PublicData";
import { SaveAndLoad } from "./DataBase/SaveAndLoad";
import { SetUserInfo } from "./計算/SetUserInfo";

const { ccclass, property } = _decorator;
@ccclass("CharactorPage")
export default class CharactorPage extends BaseSingletonComponent<CharactorPage>() {
    @property(Node)
    labelUserData: Node;
    @property(Node)
    labelExtraAbility: Node;
    conUserData = {};
    conExtra = {};
    protected onLoad(): void {
        super.onLoad();
        this.hide();
        for (let i of this.labelUserData.children) {
            this.conUserData[i.name.replace(`LabelUser`, ``)] =
                i.getComponent(Label);
        }
        for (let i of this.labelExtraAbility.children)
            this.conExtra[i.name.replace(`LabelPlus`, ``)] =
                i.getComponent(Label);
    }
    show(): void {
        super.show();
        this.UserDataLoad();
    }
    async UserDataLoad() {
        await SaveAndLoad.getInstance.loadUserData();

        for (let i of [
            `Name`,
            `Stamina`,
            `Level`,
            `Gold`,
            `Exp`,
            `Point`,
            `HP`,
            `MP`,
        ]) {
            this.conUserData[i].string =
                PublicData.getInstance.userData[i].toString();
        }
        for (let i of [`Str`, `Vit`, `Dex`, `Int`, `Agi`, `Lux`]) {
            this.conExtra[i].string = `(+${PublicData.getInstance.userExtra[
                i
            ].toString()})`;
            this.conUserData[i].string = (
                PublicData.getInstance.userData[i] +
                PublicData.getInstance.userExtra[i]
            ).toString();
        }
        SetUserInfo.getInstance.setUserInfo();
        for (let i of [`AD`, `AP`, `DEF`, `MDF`, `Speed`]) {
            this.conUserData[i].string =
                PublicData.getInstance.userData[i].toString();
        }
        for (let i of [`Dodge`, `Critical`]) {
            this.conUserData[i].string = Number(
                PublicData.getInstance.userData[i]
            );
        }
    }
    async addPoint(e: { target: { name: string } }) {
        await SaveAndLoad.getInstance.loadUserData();
        let key = e.target.name.replace(`BtnPlus`, ``);

        if (PublicData.getInstance.userData[`isBattle`]) return;
        if (PublicData.getInstance.userData[`Point`] == 0) return;

        PublicData.getInstance.userData[`Point`] -= 1;
        PublicData.getInstance.userExtra[key] += 1;
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        this.UserDataLoad();
    }
    async minusPoint(e: { target: { name: string } }) {
        await SaveAndLoad.getInstance.loadUserData();
        let key = e.target.name.replace(`BtnMinus`, ``);

        if (PublicData.getInstance.userData[`isBattle`]) return;
        if (PublicData.getInstance.userExtra[key] == 0) return;

        PublicData.getInstance.userExtra[key] -= 1;
        PublicData.getInstance.userData[`Point`] += 1;
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        this.UserDataLoad();
    }
}
