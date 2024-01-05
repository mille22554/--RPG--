import { _decorator, Label, Node, warn } from "cc";
import { SaveAndLoad, UserData } from "./SaveAndLoad";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
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
        this.UserDataLoad();
    }
    UserDataLoad() {
        let data = SaveAndLoad.getInstance.loadUserData();
        for (let i of this.labelUserData.children) {
            this.conUserData[i.name.replace(`LabelUser`, ``)] =
                i.getComponent(Label);
        }
        for (let i of this.labelExtraAbility.children)
            this.conExtra[i.name.replace(`LabelPlus`, ``)] =
                i.getComponent(Label);
        for (let i in data[0]) {
            this.conUserData[i].string = data[0][i].toString();
        }
        for (let i in data[1]) {
            this.conExtra[i].string = `(+${data[1][i].toString()})`;
        }
    }
    addPoint(e: { target: { name: string } }) {
        let data = SaveAndLoad.getInstance.loadUserData(),
            key = e.target.name.replace(`BtnPlus`, ``);
        if (data[0][`Point`] == 0) return;
        data[0][`Point`] -= 1;
        data[1][key] += 1;
        data[0][key] += 1;
        SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
        this.UserDataLoad();
    }
    minusPoint(e: { target: { name: string } }) {
        let data = SaveAndLoad.getInstance.loadUserData(),
            key = e.target.name.replace(`BtnMinus`, ``);
        if (data[1][key] == 0) return;
        data[1][key] -= 1;
        data[0][key] -= 1;
        data[0][`Point`] += 1;
        SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
        this.UserDataLoad();
    }
}

