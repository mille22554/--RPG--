import { _decorator, Label, Node, UIOpacity, warn } from "cc";
import { SaveAndLoad } from "./SaveAndLoad";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import { SetInfo, UserData } from "./DataBase";
import BattlePage from "./BattlePage";
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
    UserDataLoad() {
        let data = SaveAndLoad.getInstance.loadUserData();

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
            this.conUserData[i].string = data[0][i].toString();
        }
        for (let i of [`Str`, `Vit`, `Dex`, `Int`, `Agi`, `Lux`]) {
            this.conExtra[i].string = `(+${data[1][i].toString()})`;
            this.conUserData[i].string = (data[0][i] + data[1][i]).toString();
        }
        data[0] = SetInfo.getInstance.setUserInfo(data[0] as UserData, data[1]);
        for (let i of [`AD`, `AP`, `DEF`, `MDF`, `Dodge`, `Speed`]) {
            this.conUserData[i].string = data[0][i].toString();
        }
    }
    addPoint(e: { target: { name: string } }) {
        let data = SaveAndLoad.getInstance.loadUserData(),
        key = e.target.name.replace(`BtnPlus`, ``);

        if (data[0][`isBattle`]) return;
        if (data[0][`Point`] == 0) return;

        data[0][`Point`] -= 1;
        data[1][key] += 1;
        SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
        this.UserDataLoad();
    }
    minusPoint(e: { target: { name: string } }) {
        let data = SaveAndLoad.getInstance.loadUserData(),
            key = e.target.name.replace(`BtnMinus`, ``);

        if (data[0][`isBattle`]) return;
        if (data[1][key] == 0) return;
        
        data[1][key] -= 1;
        data[0][`Point`] += 1;
        SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
        this.UserDataLoad();
    }
    LevelUP(data: UserData, exp, MaxExp) {
        data.Level += 1;
        data.Str += 1;
        data.Vit += 1;
        data.Dex += 1;
        data.Agi += 1;
        data.Int += 1;
        data.Lux += 1;

        let stamina = Number(data.Stamina.split(`/`)[0]) + 10,
            maxStamina = Number(data.Stamina.split(`/`)[1]) + 10,
            HP = Number(data.HP.split(`/`)[0]) + data.Vit * 5 + data.Level * 10,
            maxHP =
                Number(data.HP.split(`/`)[1]) + data.Vit * 5 + data.Level * 10,
            MP = Number(data.MP.split(`/`)[0]) + data.Level * 5 + data.Int * 5,
            maxMP =
                Number(data.MP.split(`/`)[1]) + data.Level * 5 + data.Int * 5;

        data.Stamina = `${stamina}/${maxStamina}`;
        data.HP = `${HP}/${maxHP}`;
        data.MP = `${MP}/${maxMP}`;
        data.Point += 6;
        exp -= MaxExp;
        MaxExp = data.Level * 10;
        data.Exp = `${exp}/${MaxExp}`;
        return data;
    }
}
