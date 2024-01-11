import { UIOpacity, _decorator, warn } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import BattlePage from "./BattlePage";
import { SaveAndLoad } from "./SaveAndLoad";
import CharactorPage from "./CharactorPage";
import { EventMng } from "./DataBase";

const { ccclass, property } = _decorator;
@ccclass("Resting")
export default class Resting extends BaseSingletonComponent<Resting>() {
    sec = 0;
    timer: number;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
        this.setEvent(`Rest`, this.Rest);
    }
    Rest() {
        if (BattlePage.instance.panelMessage.active) return;
        let data = SaveAndLoad.getInstance.loadUserData();

        if (data[0][`isBattle`]) {
            return;
        }
        this.node.active = !this.node.active;
        if (this.node.active) {
            data[0][`isResting`] = true;
            this.timer = setInterval(() => {
                let data = SaveAndLoad.getInstance.loadUserData(),
                    HP = Number(data[0][`HP`].split(`/`)[0]),
                    MP = Number(data[0][`MP`].split(`/`)[0]),
                    Stamina = Number(data[0][`Stamina`].split(`/`)[0]),
                    maxStamina = Number(data[0][`Stamina`].split(`/`)[1]),
                    maxHP = Number(data[0][`HP`].split(`/`)[1]),
                    maxMP = Number(data[0][`MP`].split(`/`)[1]);
                if (BattlePage.instance.field.active) {
                    if (HP == maxHP && MP == maxMP) return;
                    Stamina -= 1;
                    if (Stamina < 0) {
                        Stamina = 0;
                        this.node.active = !this.node.active;
                        clearInterval(this.timer);
                        return;
                    }
                } else {
                    if (HP == maxHP && MP == maxMP && Stamina == maxStamina)
                        return;
                    Stamina += maxStamina * 0.01;
                    if (Stamina > maxStamina) Stamina = maxStamina;
                }

                HP += maxHP * 0.01;
                if (HP > maxHP) HP = maxHP;

                MP += maxMP * 0.01;
                if (MP > maxMP) MP = maxMP;

                data[0][`HP`] = `${Math.floor(HP)}/${
                    data[0][`HP`].split(`/`)[1]
                }`;
                data[0][`MP`] = `${Math.floor(MP)}/${
                    data[0][`MP`].split(`/`)[1]
                }`;
                data[0][`Stamina`] = `${Math.floor(Stamina)}/${
                    data[0][`Stamina`].split(`/`)[1]
                }`;

                SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
                BattlePage.instance.infoLabelRefresh();
                CharactorPage.instance.UserDataLoad();
            }, 1000);
        } else {
            data[0][`isResting`] = false;
            clearInterval(this.timer);
            SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
            BattlePage.instance.infoLabelRefresh();
            CharactorPage.instance.UserDataLoad();
        }
    }
}
