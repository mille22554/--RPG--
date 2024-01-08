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
import { EventMng, ExtraPoint, MobData, SetInfo, UserData, ZoneData } from "./DataBase";
import { SaveAndLoad } from "./SaveAndLoad";
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
    mobSpeed = 0;
    mobData: UserData;
    userData: UserData;
    userExtra: ExtraPoint;
    conLabelInfo = {};
    protected onLoad(): void {
        super.onLoad();
        this.home.getComponent(UIOpacity).opacity = 255;
        this.field.getComponent(UIOpacity).opacity = 255;
        this.panelMessage.getComponent(UIOpacity).opacity = 255;
        this.field.active = false;
        this.panelMessage.active = false;

        for (let i of this.info.children)
            this.conLabelInfo[i.name] = i.getComponent(Label);

        EventMng.getInstance.event.on(`SetZoneName`, this.setZoneName, this);
    }
    protected start(): void {
        let data = SaveAndLoad.getInstance.loadUserData();
        this.userData = data[0] as UserData;
        this.userExtra = data[1];

        data[0] = SetInfo.getInstance.setUserInfo(data[0] as UserData, data[1]);
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

                PanelLog.instance.addLog(`${this.mobData.Name}出現了!`);
                PanelLog.instance.addLog(
                    `${this.mobData.Name} LV${this.mobData.Level} HP${
                        this.mobData.HP.split(`/`)[0]
                    }`
                );
            }
        }
        if (this.userData.isResting) EventMng.getInstance.event.emit(`Rest`);
        this.infoLabelRefresh();
    }
    PanelPlaceSwitch() {
        PanelPlace.instance.show();
    }
    MessageSwitch() {
        this.panelMessage.active = true;
    }
    BackHome() {
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
        let data = SaveAndLoad.getInstance.loadUserData();
        this.userData = data[0] as UserData;
        this.userExtra = data[1];

        let Stamina = Number(this.userData.Stamina.split(`/`)[0]);
        Stamina -= 1;
        if (Stamina < 0) {
            return;
        }
        this.userData.Stamina = `${Stamina}/${
            this.userData.Stamina.split(`/`)[1]
        }`;

        if (this.userData.isBattle) {
            if (this.PlayerSpeed > 10) this.Battel();
            return;
        }

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
            this.userData.isBattle = true;

            let mobLevel = randomRangeInt(
                    Math.floor(this.userData.AreaLevel / 10) - 1 > 0
                        ? Math.floor(this.userData.AreaLevel / 10) - 1
                        : 1,
                    Math.floor(this.userData.AreaLevel / 10) + 2
                ),
                mobType = randomRangeInt(
                    Math.floor(this.userData.AreaLevel / 30) - 2 > 0
                        ? Math.floor(this.userData.AreaLevel / 30) - 2
                        : 0,
                    Math.floor(this.userData.AreaLevel / 30) + 1
                );
            if (mobType > 4) mobType = 4;

            this.mobData = MobData.getInstance.setMobInfo(
                MobData.getInstance.mobName[mobType],
                mobLevel,
                this.zoneName.string
            );
            this.mobData.Name = MobData.getInstance.mobName[mobType];

            PanelLog.instance.addLog(`${this.mobData.Name}出現了!`);
            PanelLog.instance.addLog(
                `${this.mobData.Name} LV${this.mobData.Level} HP${
                    this.mobData.HP.split(`/`)[0]
                }`
            );

            this.labelBtn1.string = `戰鬥`;
            this.labelBtn2.string = `技能`;
            this.labelBtn3.string = `撤退`;
        }
        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        SaveAndLoad.getInstance.saveMobData(this.mobData);
        this.infoLabelRefresh();
    }
    Battel() {
        let prop = this.userData.Dodge / this.mobData.Speed,
            random = randomRange(0, 1);
        if (prop < random) {
            `${this.userData.Name}的攻擊，但${this.mobData.Name}躲開了`;
            return;
        }

        let hp = Number(this.mobData.HP.split(`/`)[0]),
            dmg = Math.floor(
                this.userData.AD * randomRange(0.9, 1.1) * this.mobData.DEF
            );
        hp -= dmg;
        PanelLog.instance.addLog(
            `${this.userData.Name}的攻擊，${this.mobData.Name}受到了${dmg}點傷害`
        );

        if (hp <= 0) {
            PanelLog.instance.addLog(`${this.mobData.Name}被擊退了`);
            let exp =
                    Number(this.userData.Exp.split(`/`)[0]) +
                    this.mobData.Level,
                MaxExp = Number(this.userData.Exp.split(`/`)[1]);
            if (exp >= MaxExp) {
                this.userData = CharactorPage.instance.LevelUP(
                    this.userData,
                    exp,
                    MaxExp
                );
            } else this.userData.Exp = `${exp}/${MaxExp}`;

            this.userData.isBattle = false;
            this.labelBtn1.string = `前進`;
            this.labelBtn2.string = `休息`;
            this.labelBtn3.string = `回城`;

            this.userData.AreaLevel += 1;
            SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
            this.infoLabelRefresh();
            return;
        }
        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        this.infoLabelRefresh();

        this.mobData.HP = `${hp}`;
        SaveAndLoad.getInstance.saveMobData(this.mobData);
        PanelLog.instance.addLog(
            `${this.mobData.Name} LV${this.mobData.Level} HP${this.mobData.HP}`
        );
        this.PlayerSpeed -= 10;
    }
    mobAction() {
        let prop = this.mobData.Dodge / this.userData.Speed,
            random = randomRange(0, 1);
        if (prop < random) {
            `${this.mobData.Name}的攻擊，但${this.userData.Name}躲開了`;
            return;
        }

        let hp = Number(this.userData.HP.split(`/`)[0]),
            dmg = Math.floor(
                this.mobData.AD * randomRange(0.9, 1.1) * this.userData.DEF
            );
        hp -= dmg;
        PanelLog.instance.addLog(
            `${this.mobData.Name}的攻擊，${this.userData.Name}受到了${dmg}點傷害`
        );

        if (hp <= 0) {
            PanelLog.instance.addLog(`${this.userData.Name}被擊退了`);
            hp = 10;
            this.userData.isBattle = false;
            this.userData.isField = false;
            this.labelBtn1.string = `前進`;
            this.labelBtn2.string = `休息`;
            this.labelBtn3.string = `回城`;
            this.BackHome();

            this.userData.AreaLevel += 1;
            SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
            this.infoLabelRefresh();
            return;
        }

        this.userData.HP = `${hp}/${this.userData.HP.split(`/`)[1]}`;
        SaveAndLoad.getInstance.saveUserData(this.userData, this.userExtra);
        this.infoLabelRefresh();
        this.mobSpeed -= 10;
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
    protected update(dt: number): void {
        if (this.userData.isBattle) {
            if (this.PlayerSpeed < 10) {
                if (this.mobSpeed > 10) this.mobAction();
                else this.mobSpeed += this.mobData.Speed;
                this.PlayerSpeed += this.userData.Speed;
            }
        }
    }
    setZoneName(name: string) {
        this.home.active = false;
        this.field.active = true;
        PanelPlace.instance.hide();
        PanelLog.instance.addLog(`進入了${name}`);
        this.zoneName.string = name;
        this.infoLabelRefresh();
    }
}
