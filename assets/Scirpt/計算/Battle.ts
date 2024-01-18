import { Color, randomRange, randomRangeInt } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import PanelLog from "../BattlePage/PanelLog";
import { MyColor } from "../DataBase/MyColor";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import { SetMobInfo } from "./SetMobInfo";
import { SetUserInfo } from "./SetUserInfo";
import { EquipmentType } from "../Enum/EquipmentType";
import { BAIDU } from "cc/env";
import { ItemInfo } from "../DataBase/ItemInfo";
import { EquipPart } from "../DataBase/EquipPart";

export class Battle extends BaseSingleton<Battle>() {
    speedTimer: number;
    PlayerSpeed = 0;
    PlayerSpeed2 = 0;
    mobSpeed: number[] = [0];
    isPlayerTurn: boolean;
    runSpeed() {
        this.speedTimer = setInterval(() => {
            if (PublicData.getInstance.userData.isBattle) {
                if (this.PlayerSpeed < 1500 && this.PlayerSpeed2 < 1500) {
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
                    for (let type in EquipPart.getInstance.rightHand)
                        if (PublicData.getInstance.playerEquip.leftHand.Type == type)
                            this.PlayerSpeed2 += PublicData.getInstance.userData.Speed;
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
            ), isLeft = false;

        if (this.PlayerSpeed >= 1500) this.PlayerSpeed -= 1500;
        else {
            this.PlayerSpeed2 -= 1500
            isLeft = true
        }
        this.isPlayerTurn = false;
        Stamina -= 1;
        PublicData.getInstance.userData.Stamina = `${Stamina}/${PublicData.getInstance.userData.Stamina.split(`/`)[1]
            }`;
        //幸運判定
        this.luckyEvent(
            hp, PublicData.getInstance.userData, PublicData.getInstance.mobData[target], dmg)
        if (
            this.deathAction(
                hp,
                PublicData.getInstance.mobData[target].Name,
                false,
                target
            )
        )
            return;
        //迴避判定
        if (PublicData.getInstance.mobData[target].Dodge > randomRange(0, 1)) {
            PanelLog.instance.addLog(
                `${PublicData.getInstance.userData.Name}的攻擊，但${PublicData.getInstance.mobData[target].Name}躲開了`,
                Color.GRAY
            );
            return;
        }
        //武器種類判定
        let base: number
        switch (PublicData.getInstance.playerEquip.rightHand.Type) {
            case EquipmentType.E3:
            case EquipmentType.E4:
                base = PublicData.getInstance.userData.AP
                break;
            case EquipmentType.E9:
            case EquipmentType.E10:
                base = (PublicData.getInstance.userData.AP + PublicData.getInstance.userData.AD) / 2
                break;
            default:
                base = PublicData.getInstance.userData.AD
                break;
        }
        //傷害判定
        dmg = Math.floor(
            base *
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
        //武器損壞判定
        if (isLeft) {
            PublicData.getInstance.userItem
                .userEquip[PublicData.getInstance.playerEquip.leftHand.ID].Durability -= 1
            if (PublicData.getInstance.userItem
                .userEquip[PublicData.getInstance.playerEquip.leftHand.ID].Durability <= 0) {
                PublicData.getInstance.userItem.userEquip
                    .splice(PublicData.getInstance.playerEquip.leftHand.ID, 1)
                PublicData.getInstance.playerEquip.leftHand = new ItemInfo()
            }
        }
        else {
            PublicData.getInstance.userItem
                .userEquip[PublicData.getInstance.playerEquip.rightHand.ID].Durability -= 1
            if (PublicData.getInstance.userItem
                .userEquip[PublicData.getInstance.playerEquip.rightHand.ID].Durability <= 0) {
                PublicData.getInstance.userItem.userEquip
                    .splice(PublicData.getInstance.playerEquip.rightHand.ID, 1)
                PublicData.getInstance.playerEquip.rightHand = new ItemInfo()
            }
        }
        //死亡判定
        if (
            this.deathAction(
                hp,
                PublicData.getInstance.mobData[target].Name,
                false,
                target
            )
        ) return;
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
        SaveAndLoad.getInstance.loadUserData()

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
            )
        //幸運判定
        this.luckyEvent(
            hp, PublicData.getInstance.mobData[target], PublicData.getInstance.userData, dmg)
        if (this.deathAction(hp, PublicData.getInstance.userData.Name, true)) return;
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
        PublicData.getInstance.userData.HP = `${hp}/${PublicData.getInstance.userData.HP.split(`/`)[1]
            }`;
        //戰鬥結束存檔
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        PanelLog.instance.eventEmit(EventEnum.infoLabelRefresh);
    }
    luckyEvent(hp, hiter, behiter, dmg) {
        //幸運判定
        if (hiter.Lucky > randomRange(0, 1)) {
            hp -= dmg;
            PanelLog.instance.addLog(
                `${behiter.Name}突然抽筋，受到了${dmg}點傷害`,
                MyColor.getInstance.purple
            );
        }
        return hp
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

                PublicData.getInstance.userData.HP = `${hp}/${PublicData.getInstance.userData.HP.split(`/`)[1]
                    }`;
                PublicData.getInstance.userData.Stamina = `${Stamina}/${PublicData.getInstance.userData.Stamina.split(`/`)[1]
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
