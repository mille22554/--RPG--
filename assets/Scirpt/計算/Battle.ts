import { Color, randomRange, randomRangeInt } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import PanelLog from "../BattlePage/PanelLog";
import { MyColor } from "../DataBase/MyColor";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import { SetMobInfo } from "./SetMobInfo";
import { SetUserInfo } from "./SetUserInfo";

export class Battle extends BaseSingleton<Battle>() {
    speedTimer: number;
    PlayerSpeed = 0;
    mobSpeed: number[] = [0];
    isPlayerTurn: boolean;
    runSpeed() {
        this.speedTimer = setInterval(() => {
            if (PublicData.getInstance.userData.isBattle) {
                if (this.PlayerSpeed < 1500) {
                    for (let i of PublicData.getInstance.mobData) {
                        if (
                            this.mobSpeed[
                                PublicData.getInstance.mobData.indexOf(i)
                            ] >= 1500
                        )
                            this.mobAction(
                                PublicData.getInstance.mobData.indexOf(i)
                            );
                        else
                            this.mobSpeed[
                                PublicData.getInstance.mobData.indexOf(i)
                            ] += i.Speed;
                    }
                    this.PlayerSpeed += PublicData.getInstance.userData.Speed;
                } else {
                    if (!this.isPlayerTurn) {
                        for (let i of PublicData.getInstance.mobData)
                            PanelLog.instance.addLog(
                                `${i.Name} LV${i.Level} HP${i.HP}`,
                                Color.YELLOW
                            );
                        this.isPlayerTurn = true;
                    }
                }
            }
        }, 1);
    }
    Battel() {
        let target = randomRangeInt(0, PublicData.getInstance.mobData.length),
            hp = Number(
                PublicData.getInstance.mobData[target].HP.split(`/`)[0]
            ),
            critical =
                PublicData.getInstance.userData.Critical > randomRange(0, 1)
                    ? 2
                    : 1,
            dmg = Math.floor(
                (PublicData.getInstance.userData.Lux +
                    PublicData.getInstance.userExtra.Lux) *
                    2 *
                    randomRange(0.5, 1)
            ),
            Stamina = Number(
                PublicData.getInstance.userData.Stamina.split(`/`)[0]
            );

        this.PlayerSpeed -= 1500;
        this.isPlayerTurn = false;
        Stamina -= 1;
        PublicData.getInstance.userData.Stamina = `${Stamina}/${
            PublicData.getInstance.userData.Stamina.split(`/`)[1]
        }`;
        //幸運判定
        if (PublicData.getInstance.userData.Lucky > randomRange(0, 1)) {
            hp -= dmg;
            PanelLog.instance.addLog(
                `${PublicData.getInstance.mobData[target].Name}突然抽筋，受到了${dmg}點傷害`,
                MyColor.getInstance.purple
            );
            if (
                this.deathAction(
                    hp,
                    PublicData.getInstance.mobData[target].Name,
                    false,
                    target
                )
            )
                return;
        }
        //迴避判定
        if (PublicData.getInstance.mobData[target].Dodge > randomRange(0, 1)) {
            PanelLog.instance.addLog(
                `${PublicData.getInstance.userData.Name}的攻擊，但${PublicData.getInstance.mobData[target].Name}躲開了`,
                Color.GRAY
            );
            return;
        }
        //傷害判定
        dmg = Math.floor(
            PublicData.getInstance.userData.AD *
                randomRange(0.5, 1) *
                critical -
                PublicData.getInstance.mobData[target].DEF
        );
        if (dmg < 0) dmg = 0;
        hp -= dmg;
        if (critical == 1)
            PanelLog.instance.addLog(
                `${PublicData.getInstance.userData.Name}的攻擊，${PublicData.getInstance.mobData[target].Name}受到了${dmg}點傷害`
            );
        else
            PanelLog.instance.addLog(
                `${PublicData.getInstance.userData.Name}擊中了要害，${PublicData.getInstance.mobData[target].Name}受到了${dmg}點傷害`,
                Color.YELLOW
            );
        if (
            this.deathAction(
                hp,
                PublicData.getInstance.mobData[target].Name,
                false,
                target
            )
        )
            return;
        //體力判定
        if (Stamina <= 0) {
            PanelLog.instance.addLog(
                `${PublicData.getInstance.userData.Name}的體力耗盡了`,
                Color.RED
            );
            if (this.deathAction(0, PublicData.getInstance.userData.Name, true))
                return;
        }
        PublicData.getInstance.mobData[target].HP = `${hp}`;
        //戰鬥結束存檔
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveMobData(PublicData.getInstance.mobData);
        PanelLog.instance.eventEmit(EventEnum.infoLabelRefresh);
    }
    mobAction(target: number) {
        this.mobSpeed[target] -= 1500;
        let hp = Number(PublicData.getInstance.userData.HP.split(`/`)[0]),
            critical =
                PublicData.getInstance.mobData[target].Critical >
                randomRange(0, 1)
                    ? 2
                    : 1,
            dmg = Math.floor(
                PublicData.getInstance.mobData[target].Lux *
                    2 *
                    randomRange(0.5, 1)
            ),
            random = randomRange(0, 1);
        //幸運判定
        if (PublicData.getInstance.mobData[target].Lucky > random) {
            hp -= dmg;
            PanelLog.instance.addLog(
                `${PublicData.getInstance.userData.Name}突然抽筋，受到了${dmg}點傷害`,
                MyColor.getInstance.purple
            );
            if (
                this.deathAction(hp, PublicData.getInstance.userData.Name, true)
            )
                return;
        }
        //迴避判定
        if (PublicData.getInstance.userData.Dodge > randomRange(0, 1)) {
            PanelLog.instance.addLog(
                `${PublicData.getInstance.mobData[target].Name}的攻擊，但${PublicData.getInstance.userData.Name}躲開了`,
                Color.GRAY
            );
            return;
        }
        //傷害判定
        dmg = Math.floor(
            PublicData.getInstance.mobData[target].AD *
                randomRange(0.5, 1) *
                critical -
                PublicData.getInstance.userData.DEF
        );
        if (dmg < 0) dmg = 0;
        hp -= dmg;
        if (critical == 1)
            PanelLog.instance.addLog(
                `${PublicData.getInstance.mobData[target].Name}的攻擊，${PublicData.getInstance.userData.Name}受到了${dmg}點傷害`
            );
        else
            PanelLog.instance.addLog(
                `${PublicData.getInstance.mobData[target].Name}擊中了要害，${PublicData.getInstance.userData.Name}受到了${dmg}點傷害`,
                Color.YELLOW
            );
        if (this.deathAction(hp, PublicData.getInstance.userData.Name, true))
            return;
        PublicData.getInstance.userData.HP = `${hp}/${
            PublicData.getInstance.userData.HP.split(`/`)[1]
        }`;
        //戰鬥結束存檔
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        PanelLog.instance.eventEmit(EventEnum.infoLabelRefresh);
    }
    deathAction(
        hp: number,
        name: string,
        isPlayerBeHit: boolean,
        mobTarget?: number
    ) {
        if (hp <= 0) {
            if (isPlayerBeHit) {
                PanelLog.instance.addLog(`${name}被擊退了`, Color.RED);
                hp = 0;
                let Stamina = Number(
                    PublicData.getInstance.userData.Stamina.split(`/`)[0]
                );
                Stamina = 0;

                PublicData.getInstance.userData.HP = `${hp}/${
                    PublicData.getInstance.userData.HP.split(`/`)[1]
                }`;
                PublicData.getInstance.userData.Stamina = `${Stamina}/${
                    PublicData.getInstance.userData.Stamina.split(`/`)[1]
                }`;
            } else {
                PanelLog.instance.addLog(`${name}被擊退了`, Color.GREEN);
                let exp =
                        Number(
                            PublicData.getInstance.userData.Exp.split(`/`)[0]
                        ) + PublicData.getInstance.mobData[mobTarget].Level,
                    MaxExp = Number(
                        PublicData.getInstance.userData.Exp.split(`/`)[1]
                    );
                PanelLog.instance.addLog(
                    `獲得了${PublicData.getInstance.mobData[mobTarget].Level}經驗值`,
                    Color.GREEN
                );
                if (
                    exp >= MaxExp &&
                    PublicData.getInstance.userData.Level < 50
                ) {
                    PublicData.getInstance.userData =
                        SetUserInfo.getInstance.LevelUP(
                            PublicData.getInstance.userData,
                            exp,
                            MaxExp
                        );
                    PanelLog.instance.addLog(
                        `${PublicData.getInstance.userData.Name}升級了`,
                        Color.YELLOW
                    );
                } else if (PublicData.getInstance.userData.Level == 50) exp = 0;
                else PublicData.getInstance.userData.Exp = `${exp}/${MaxExp}`;

                SetMobInfo.getInstance.setMobDrop(
                    PublicData.getInstance.mobData[mobTarget].Name.slice(0, -1)
                );

                PublicData.getInstance.mobData.splice(mobTarget, 1);
                SaveAndLoad.getInstance.saveMobData(
                    PublicData.getInstance.mobData
                );
                if (PublicData.getInstance.mobData.length > 0) {
                    SaveAndLoad.getInstance.saveUserData(
                        PublicData.getInstance.userData,
                        PublicData.getInstance.userExtra
                    );
                    PanelLog.instance.eventEmit(EventEnum.infoLabelRefresh);
                    return true;
                }
                PublicData.getInstance.userData.AreaLevel += 1;
            }

            PublicData.getInstance.userData.isBattle = false;
            clearInterval(this.speedTimer);
            PanelLog.instance.eventEmit(EventEnum.setBtnLabel);

            SaveAndLoad.getInstance.saveUserData(
                PublicData.getInstance.userData,
                PublicData.getInstance.userExtra
            );
            PanelLog.instance.eventEmit(EventEnum.infoLabelRefresh);
            return true;
        }
        return false;
    }
}
