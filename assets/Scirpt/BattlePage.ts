import {
    Button,
    EventTarget,
    Label,
    Node,
    UIOpacity,
    _decorator,
    randomRange,
    randomRangeInt,
    warn,
} from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import PanelPlace from "./PanelPlace";
import PanelLog from "./PanelLog";
import {
    EventMng,
    ExtraPoint,
    ItemInfo,
    ItemType,
    MobInit,
    SetInfo,
    UserData,
    ZoneData,
} from "./DataBase";
import { DataKey, SaveAndLoad } from "./SaveAndLoad";
import CharactorPage from "./CharactorPage";
import Resting from "./Resting";

const { ccclass, property } = _decorator;
@ccclass("BattlePage")
export default class BattlePage extends BaseSingletonComponent<BattlePage>() {
    @property(Node)
    home: Node;
    @property(Node)
    field: Node;
    @property(Node)
    info: Node;
    @property(Node)
    panelMessage: Node;
    @property(Label)
    zoneName: Label;
    @property(Label)
    areaLevel: Label;
    @property(Label)
    labelBtn1: Label;
    @property(Label)
    labelBtn2: Label;
    @property(Label)
    labelBtn3: Label;
    PlayerSpeed = 0;
    mobSpeed: number[] = [];
    mobData: UserData[] = [new UserData()];
    userData: UserData;
    userExtra: ExtraPoint;
    conLabelInfo = {};
    speedTimer: number;
    isPlayerTurn: boolean;
    protected onLoad(): void {
        super.onLoad();
        this.home.getComponent(UIOpacity).opacity = 255;
        this.field.getComponent(UIOpacity).opacity = 255;
        this.panelMessage.getComponent(UIOpacity).opacity = 255;
        this.field.active = false;
        this.panelMessage.active = false;

        for (let i of this.info.children)
            this.conLabelInfo[i.name] = i.getComponent(Label);

        this.setEvent(`SetZoneName`, this.setZoneName);
    }
    protected start(): void {
        let data = SaveAndLoad.getInstance.loadUserData();
        this.userData = data[0] as UserData;
        this.userExtra = data[1] as ExtraPoint;

        data[0] = SetInfo.getInstance.setUserInfo(
            data[0] as UserData,
            data[1] as ExtraPoint
        );

        if (this.userData.isField) {
            this.home.active = false;
            this.field.active = true;
            this.zoneName.string = this.userData.ZoneName;

            PanelLog.instance.addLog(`進入了${this.zoneName.string}`);

            if (this.userData.isBattle) {
                this.mobData = SaveAndLoad.getInstance.loadMobData();
                this.labelBtn1.string = `戰鬥`;
                this.labelBtn2.string = `技能`;
                this.labelBtn3.string = `撤退`;

                for (let i of this.mobData) {
                    PanelLog.instance.addLog(`${i.Name}出現了!`);
                    PanelLog.instance.addLog(
                        `${i.Name} LV${i.Level} HP${i.HP.split(`/`)[0]}`
                    );
                }
                this.runSpeed();
            }
        }
        if (this.userData.isResting) this.eventEmit(`Rest`);
        this.infoLabelRefresh();
    }
    PanelPlaceSwitch() {
        PanelPlace.instance.show();
    }
    escape() {
        let data = SaveAndLoad.getInstance.loadUserData();
        this.userData = data[0] as UserData;
        this.userExtra = data[1] as ExtraPoint;

        let Stamina = Number(this.userData.Stamina.split(`/`)[0]);
        Stamina -= 1;

        for (let i of this.mobData)
            if (i.Dodge > randomRange(0, 1)) {
                PanelLog.instance.addLog(`逃跑失敗`);
                //體力判定
                if (Stamina <= 0) {
                    PanelLog.instance.addLog(
                        `${this.userData.Name}的體力耗盡了`
                    );
                    if (this.deathAction(0, this.userData.Name, true)) return;
                }
                return;
            }

        PanelLog.instance.addLog(`${this.userData.Name}逃跑了`);
        this.userData.isBattle = false;
        this.labelBtn1.string = `前進`;
        this.labelBtn2.string = `休息`;
        this.labelBtn3.string = `回城`;

        this.userData.Stamina = `${Stamina}/${
            this.userData.Stamina.split(`/`)[1]
        }`;

        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        this.infoLabelRefresh();
    }
    MessageSwitch() {
        if (this.userData.isBattle) {
            if (this.PlayerSpeed >= 1500) {
                this.PlayerSpeed -= 1500;
                this.escape();
            }
            return;
        }
        this.panelMessage.active = true;
    }
    BackHome() {
        let data = SaveAndLoad.getInstance.loadUserData();
        this.userData = data[0] as UserData;
        this.userExtra = data[1] as ExtraPoint;

        this.panelMessage.active = false;
        this.field.active = false;
        this.home.active = true;
        this.userData.isField = false;

        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
    }
    MessageCancel() {
        this.panelMessage.active = false;
    }
    GoForward() {
        if (this.panelMessage.active) return;
        let data = SaveAndLoad.getInstance.loadUserData();
        this.userData = data[0] as UserData;
        this.userExtra = data[1] as ExtraPoint;

        if (this.userData.isBattle) {
            if (this.PlayerSpeed >= 1500) this.Battel();
            return;
        }

        let Stamina = Number(this.userData.Stamina.split(`/`)[0]);
        Stamina -= 1;
        if (Stamina < 0) {
            return;
        }
        this.userData.Stamina = `${Stamina}/${
            this.userData.Stamina.split(`/`)[1]
        }`;

        let prop = randomRangeInt(1, 21);
        //藥草採集
        if (prop < 6) {
            PanelLog.instance.addLog(`採藥草`);
            this.userData.AreaLevel += 1;
        }
        //挖礦
        else if (prop > 5 && prop < 11) {
            PanelLog.instance.addLog(`挖礦`);
            this.userData.AreaLevel += 1;
        }
        //遇敵
        else {
            let mobLevel,
                mobType,
                mobNum = randomRangeInt(1, 7);
            this.mobData = [new UserData()];
            this.isPlayerTurn = false;
            for (let i = 0; i < mobNum; i++) {
                mobType = randomRangeInt(
                    Math.floor(this.userData.AreaLevel / 30) - 2 > 0
                        ? Math.floor(this.userData.AreaLevel / 30) - 2
                        : 0,
                    Math.floor(this.userData.AreaLevel / 30) + 1
                );
                mobLevel = randomRangeInt(
                    Math.floor(this.userData.AreaLevel / 10) - 1 > 0
                        ? Math.floor(this.userData.AreaLevel / 10) - 1
                        : 1,
                    Math.floor(this.userData.AreaLevel / 10) + 2
                );
                if (mobType > 4) mobType = 4;
                if (mobLevel > 50) mobLevel = 50;

                this.mobData[i] = MobInit.getInstance.setMobInfo(
                    MobInit.getInstance.mobName[mobType],
                    mobLevel,
                    this.zoneName.string
                );
                this.mobData[i].Name = `${
                    MobInit.getInstance.mobName[mobType]
                }${i + 1}`;
                this.mobData[i].HP = this.mobData[i].HP.split(`/`)[0];
                this.mobSpeed[i] = 0;

                PanelLog.instance.addLog(`${this.mobData[i].Name}出現了!`);
                PanelLog.instance.addLog(
                    `${this.mobData[i].Name} LV${this.mobData[i].Level} HP${this.mobData[i].HP}`
                );
            }

            this.labelBtn1.string = `戰鬥`;
            this.labelBtn2.string = `技能`;
            this.labelBtn3.string = `撤退`;

            this.userData.isBattle = true;
            this.runSpeed();
        }
        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        SaveAndLoad.getInstance.saveMobData(this.mobData);
        this.infoLabelRefresh();
    }
    Battel() {
        let target = randomRangeInt(0, this.mobData.length),
            hp = Number(this.mobData[target].HP.split(`/`)[0]),
            critical = this.userData.Critical > randomRange(0, 1) ? 2 : 1,
            dmg = Math.floor(this.userData.Lux * 2 * randomRange(0.5, 1)),
            Stamina = Number(this.userData.Stamina.split(`/`)[0]);

        this.PlayerSpeed -= 1500;
        this.isPlayerTurn = false;
        Stamina -= 1;
        //幸運判定
        if (this.userData.Lucky > randomRange(0, 1)) {
            hp -= dmg;
            PanelLog.instance.addLog(
                `${this.mobData[target].Name}突然抽筋，受到了${dmg}點傷害`
            );
            if (this.deathAction(hp, this.mobData[target].Name, false)) return;
        }
        //迴避判定
        if (this.mobData[target].Dodge > randomRange(0, 1)) {
            PanelLog.instance.addLog(
                `${this.userData.Name}的攻擊，但${this.mobData[target].Name}躲開了`
            );
            return;
        }
        //傷害判定
        dmg = Math.floor(
            this.userData.AD * randomRange(0.5, 1) * critical -
                this.mobData[target].DEF
        );
        if (dmg < 0) dmg = 0;
        hp -= dmg;
        if (critical == 1)
            PanelLog.instance.addLog(
                `${this.userData.Name}的攻擊，${this.mobData[target].Name}受到了${dmg}點傷害`
            );
        else
            PanelLog.instance.addLog(
                `${this.userData.Name}擊中了要害，${this.mobData[target].Name}受到了${dmg}點傷害`
            );
        if (this.deathAction(hp, this.mobData[target].Name, false, target))
            return;
        //體力判定
        if (Stamina <= 0) {
            PanelLog.instance.addLog(`${this.userData.Name}的體力耗盡了`);
            if (this.deathAction(0, this.userData.Name, true)) return;
        }
        this.mobData[target].HP = `${hp}`;
        this.userData.Stamina = `${Stamina}/${
            this.userData.Stamina.split(`/`)[1]
        }`;
        //戰鬥結束存檔
        // PanelLog.instance.addLog(
        //     `${this.mobData[target].Name} LV${
        //         this.mobData[target].Level
        //     } HP${this.mobData[target].HP}`
        // );

        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        SaveAndLoad.getInstance.saveMobData(this.mobData);
        this.infoLabelRefresh();
    }
    mobAction(target: number) {
        this.mobSpeed[target] -= 1500;
        let hp = Number(this.userData.HP.split(`/`)[0]),
            critical =
                this.mobData[target].Critical > randomRange(0, 1) ? 2 : 1,
            dmg = Math.floor(
                this.mobData[target].Lux * 2 * randomRange(0.5, 1)
            ),
            random = randomRange(0, 1);
        //幸運判定
        if (this.mobData[target].Lucky > random) {
            hp -= dmg;
            PanelLog.instance.addLog(
                `${this.userData.Name}突然抽筋，受到了${dmg}點傷害`
            );
            if (this.deathAction(hp, this.userData.Name, true)) return;
        }
        //迴避判定
        if (this.userData.Dodge > randomRange(0, 1)) {
            PanelLog.instance.addLog(
                `${this.mobData[target].Name}的攻擊，但${this.userData.Name}躲開了`
            );
            return;
        }
        //傷害判定
        dmg = Math.floor(
            this.mobData[target].AD * randomRange(0.5, 1) * critical -
                this.userData.DEF
        );
        if (dmg < 0) dmg = 0;
        hp -= dmg;
        if (critical == 1)
            PanelLog.instance.addLog(
                `${this.mobData[target].Name}的攻擊，${this.userData.Name}受到了${dmg}點傷害`
            );
        else
            PanelLog.instance.addLog(
                `${this.mobData[target].Name}擊中了要害，${this.userData.Name}受到了${dmg}點傷害`
            );
        if (this.deathAction(hp, this.userData.Name, true)) return;
        this.userData.HP = `${hp}/${this.userData.HP.split(`/`)[1]}`;
        //戰鬥結束存檔
        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        this.infoLabelRefresh();
    }
    deathAction(
        hp: number,
        name: string,
        isPlayerBeHit: boolean,
        mobTarget?: number
    ) {
        if (hp <= 0) {
            if (isPlayerBeHit) {
                PanelLog.instance.addLog(`${name}被擊退了`);
                hp = 0;
                let Stamina = Number(this.userData.Stamina.split(`/`)[0]);
                Stamina = 0;

                this.userData.HP = `${hp}/${this.userData.HP.split(`/`)[1]}`;
                this.userData.Stamina = `${Stamina}/${
                    this.userData.Stamina.split(`/`)[1]
                }`;
            } else {
                PanelLog.instance.addLog(`${name}被擊退了`);
                let exp =
                        Number(this.userData.Exp.split(`/`)[0]) +
                        this.mobData[mobTarget].Level,
                    MaxExp = Number(this.userData.Exp.split(`/`)[1]);
                if (exp >= MaxExp && this.userData.Level < 50) {
                    this.userData = CharactorPage.instance.LevelUP(
                        this.userData,
                        exp,
                        MaxExp
                    );
                } else if (this.userData.Level == 50) exp = 0;
                else this.userData.Exp = `${exp}/${MaxExp}`;

                this.dropItem(
                    this.mobData[mobTarget].Name,
                    MobInit.getInstance.mobName.indexOf(
                        this.mobData[mobTarget].Name.slice(0, -1)
                    )
                );

                this.mobData.splice(mobTarget, 1);
                SaveAndLoad.getInstance.saveMobData(this.mobData);
                if (this.mobData.length > 0) {
                    SaveAndLoad.getInstance.saveUserData(
                        this.userData,
                        this.userExtra
                    );
                    this.infoLabelRefresh();
                    return true;
                }
                this.userData.AreaLevel += 1;
            }

            this.userData.isBattle = false;
            clearInterval(this.speedTimer);
            this.labelBtn1.string = `前進`;
            this.labelBtn2.string = `休息`;
            this.labelBtn3.string = `回城`;

            SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
            this.infoLabelRefresh();
            return true;
        }
        return false;
    }
    infoLabelRefresh() {
        let data = SaveAndLoad.getInstance.loadUserData();
        this.conLabelInfo[`Name`].string = data[0][`Name`].toString();
        this.conLabelInfo[`HP`].string = `HP ${data[0][`HP`].toString()}`;
        this.conLabelInfo[`MP`].string = `MP ${data[0][`MP`].toString()}`;
        this.conLabelInfo[`Level`].string = `LV ${data[0][`Level`].toString()}`;
        this.conLabelInfo[`Stamina`].string = `體力 ${data[0][
            `Stamina`
        ].toString()}`;
        this.conLabelInfo[`Gold`].string = `錢 ${data[0][`Gold`].toString()}`;
        this.areaLevel.string = data[0][`AreaLevel`].toString();
    }
    runSpeed() {
        this.speedTimer = setInterval(() => {
            if (this.userData.isBattle) {
                if (this.PlayerSpeed < 1500) {
                    for (let i of this.mobData) {
                        if (this.mobSpeed[this.mobData.indexOf(i)] >= 1500)
                            this.mobAction(this.mobData.indexOf(i));
                        else this.mobSpeed[this.mobData.indexOf(i)] += i.Speed;
                    }
                    this.PlayerSpeed += this.userData.Speed;
                } else {
                    if (Number(this.userData.Stamina.split(`/`)[0]) == 0)
                        this.PlayerSpeed = 0;
                    if (!this.isPlayerTurn) {
                        for (let i of this.mobData)
                            PanelLog.instance.addLog(
                                `${i.Name} LV${i.Level} HP${i.HP}`
                            );
                        this.isPlayerTurn = true;
                    }
                }
            }
        }, 1);
    }
    setZoneName(name: string) {
        this.home.active = false;
        this.field.active = true;
        PanelPlace.instance.hide();
        PanelLog.instance.addLog(`進入了${name}`);
        this.zoneName.string = name;
        this.infoLabelRefresh();
    }
    resetUserData() {
        SaveAndLoad.getInstance.saveUserData(
            SaveAndLoad.getInstance.initData(),
            SaveAndLoad.getInstance.initExtra()
        );
        let data = SaveAndLoad.getInstance.loadUserData();
        SetInfo.getInstance.setUserInfo(
            data[0] as UserData,
            data[1] as ExtraPoint
        );
        this.infoLabelRefresh();
    }
    dropItem(mobName: string, mobID: number) {
        let item = ItemType.getInstance.dropItem[mobID];
        item.ID = mobID;
        let userItem: ItemInfo[] = [new ItemInfo()];
        userItem[mobID] = ItemType.getInstance.setInfo(item);
        let dropNum = randomRangeInt(0, 3);
        if (dropNum > 0)
            PanelLog.instance.addLog(
                `${mobName}掉落了${dropNum}個${userItem[mobID].Name}`
            );
        userItem[mobID].Num =
            SaveAndLoad.getInstance.loadItemData(DataKey.userDropItemKey)[mobID]
                .Num + dropNum;

        SaveAndLoad.getInstance.saveItemData(userItem, DataKey.userDropItemKey);
    }
}
