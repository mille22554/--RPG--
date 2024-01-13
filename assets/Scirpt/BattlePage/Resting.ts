import { _decorator } from "cc";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import CharactorPage from "../CharactorPage";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import BattlePage from "./BattlePage";

const { ccclass, property } = _decorator;
@ccclass("Resting")
export default class Resting extends BaseSingletonComponent<Resting>() {
    sec = 0;
    timer: number;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
        this.setEvent(EventEnum.Rest, this.Rest);
    }
    Rest() {
        if (BattlePage.instance.panelMessage.active) return;
        SaveAndLoad.getInstance.loadUserData();

        if (PublicData.getInstance.userData[`isBattle`]) {
            return;
        }
        this.node.active = !this.node.active;
        if (this.node.active) {
            PublicData.getInstance.userData[`isResting`] = true;
            this.timer = setInterval(() => {
                SaveAndLoad.getInstance.loadUserData();
                let HP = Number(
                        PublicData.getInstance.userData[`HP`].split(`/`)[0]
                    ),
                    MP = Number(
                        PublicData.getInstance.userData[`MP`].split(`/`)[0]
                    ),
                    Stamina = Number(
                        PublicData.getInstance.userData[`Stamina`].split(`/`)[0]
                    ),
                    maxStamina = Number(
                        PublicData.getInstance.userData[`Stamina`].split(`/`)[1]
                    ),
                    maxHP = Number(
                        PublicData.getInstance.userData[`HP`].split(`/`)[1]
                    ),
                    maxMP = Number(
                        PublicData.getInstance.userData[`MP`].split(`/`)[1]
                    );
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

                PublicData.getInstance.userData[`HP`] = `${Math.floor(HP)}/${
                    PublicData.getInstance.userData[`HP`].split(`/`)[1]
                }`;
                PublicData.getInstance.userData[`MP`] = `${Math.floor(MP)}/${
                    PublicData.getInstance.userData[`MP`].split(`/`)[1]
                }`;
                PublicData.getInstance.userData[`Stamina`] = `${Math.floor(
                    Stamina
                )}/${PublicData.getInstance.userData[`Stamina`].split(`/`)[1]}`;

                SaveAndLoad.getInstance.saveUserData(
                    PublicData.getInstance.userData,
                    PublicData.getInstance.userExtra
                );
                BattlePage.instance.infoLabelRefresh();
                CharactorPage.instance.UserDataLoad();
            }, 1000);
        } else {
            PublicData.getInstance.userData[`isResting`] = false;
            clearInterval(this.timer);
            SaveAndLoad.getInstance.saveUserData(
                PublicData.getInstance.userData,
                PublicData.getInstance.userExtra
            );
            BattlePage.instance.infoLabelRefresh();
            CharactorPage.instance.UserDataLoad();
        }
    }
}
