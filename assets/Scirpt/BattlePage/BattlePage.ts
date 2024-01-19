import {
    Color,
    Label,
    Node,
    UIOpacity,
    _decorator,
    randomRange,
    randomRangeInt,
} from "cc";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { MyColor } from "../DataBase/MyColor";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { ExtraPoint, UserData } from "../DataBase/UserData";
import { EventEnum } from "../Enum/EventEnum";
import { Battle } from "../計算/Battle";
import { SetMobInfo } from "../計算/SetMobInfo";
import { SetUserInfo } from "../計算/SetUserInfo";
import PanelLog from "./PanelLog";
import PanelPlace from "./PanelPlace";
import PanelMarket from "./PanelMarket";
import PlayerEquip from "../DataBase/PlayerEquip";

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

        this.setEvent(EventEnum.SetZoneName, this.setZoneName);
        this.setEvent(EventEnum.infoLabelRefresh, this.infoLabelRefresh);
        this.setEvent(EventEnum.setBtnLabel, this.setBtnLabel);
    }
    protected start(): void {
        if (PublicData.getInstance.userData.isField) {
            this.home.active = false;
            this.field.active = true;
            this.zoneName.string = PublicData.getInstance.userData.ZoneName;

            PanelLog.instance.addLog(`進入了${this.zoneName.string}`);

            if (PublicData.getInstance.userData.isBattle) {
                SaveAndLoad.getInstance.loadMobData();
                this.labelBtn1.string = `戰鬥`;
                this.labelBtn2.string = `技能`;
                this.labelBtn3.string = `撤退`;

                for (let i of PublicData.getInstance.mobData)
                    PanelLog.instance.addLog(`${i.Name}出現了!`, Color.RED);
                Battle.getInstance.runSpeed();
            }
        }
        if (PublicData.getInstance.userData.isResting)
            this.eventEmit(EventEnum.Rest);
        this.infoLabelRefresh();
    }
    show(...any: any[]): void {
        super.show();
        PanelPlace.instance.hide();
        PanelMarket.instance.hide();
        this.infoLabelRefresh();
    }
    escape() {
        let Stamina = Number(
            PublicData.getInstance.userData.Stamina.split(`/`)[0]
        );
        Stamina -= 1;

        for (let i of PublicData.getInstance.mobData)
            if (i.Dodge > randomRange(0, 1)) {
                PanelLog.instance.addLog(`逃跑失敗`, Color.RED);
                //體力判定
                if (Stamina <= 0) {
                    PanelLog.instance.addLog(
                        `${PublicData.getInstance.userData.Name}的體力耗盡了`,
                        Color.RED
                    );
                    if (
                        Battle.getInstance.deathAction(
                            0,
                            PublicData.getInstance.userData.Name,
                            true
                        )
                    )
                        return;
                }
                return;
            }

        PanelLog.instance.addLog(
            `${PublicData.getInstance.userData.Name}逃跑了`,
            Color.GREEN
        );
        PublicData.getInstance.userData.isBattle = false;
        this.labelBtn1.string = `前進`;
        this.labelBtn2.string = `休息`;
        this.labelBtn3.string = `回城`;

        PublicData.getInstance.userData.Stamina = `${Stamina}/${
            PublicData.getInstance.userData.Stamina.split(`/`)[1]
        }`;

        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        this.infoLabelRefresh();
    }
    MessageSwitch() {
        if (PublicData.getInstance.userData.isBattle) {
            if (Battle.getInstance.PlayerSpeed >= 1500) {
                Battle.getInstance.PlayerSpeed -= 1500;
                this.escape();
            }
            else if (Battle.getInstance.PlayerSpeed2 >= 1500) {
                Battle.getInstance.PlayerSpeed2 -= 1500;
                this.escape();
            }
            return;
        }
        this.panelMessage.active = true;
    }
    BackHome() {
        this.panelMessage.active = false;
        this.field.active = false;
        this.home.active = true;
        PublicData.getInstance.userData.isField = false;

        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
    }
    MessageCancel() {
        this.panelMessage.active = false;
    }
    GoForward() {
        if (this.panelMessage.active) return;

        SaveAndLoad.getInstance.loadUserData();
        SaveAndLoad.getInstance.loadMobData();
        SaveAndLoad.getInstance.loadPlayerEquipData();
        SaveAndLoad.getInstance.loadItemData();

        if (PublicData.getInstance.userData.isBattle) {
            if (
                Battle.getInstance.PlayerSpeed >= 1500 ||
                Battle.getInstance.PlayerSpeed2 >= 1500
            )
                Battle.getInstance.Battel();
            return;
        }

        let Stamina = Number(
            PublicData.getInstance.userData.Stamina.split(`/`)[0]
        );
        Stamina -= 1;
        if (Stamina < 0) {
            return;
        }
        PublicData.getInstance.userData.Stamina = `${Stamina}/${
            PublicData.getInstance.userData.Stamina.split(`/`)[1]
        }`;

        let prop = randomRangeInt(1, 21);
        //藥草採集
        if (prop < 6) {
            PanelLog.instance.addLog(`採藥草`, Color.GREEN);
            PublicData.getInstance.userData.AreaLevel += 1;
        }
        //挖礦
        else if (prop > 5 && prop < 11) {
            PanelLog.instance.addLog(`挖礦`, MyColor.getInstance.orange);
            PublicData.getInstance.userData.AreaLevel += 1;
        }
        //遇敵
        else {
            let mobLevel,
                mobType,
                mobNum = randomRangeInt(0, 100);
            if (mobNum < 50) mobNum = 1;
            else if (mobNum > 49 && mobNum < 75) mobNum = 2;
            else if (mobNum > 74 && mobNum < 88) mobNum = 3;
            else if (mobNum > 87 && mobNum < 94) mobNum = 4;
            else if (mobNum > 93 && mobNum < 98) mobNum = 5;
            else mobNum = 6;
            PublicData.getInstance.mobData = [new UserData()];
            Battle.getInstance.isPlayerTurn = false;
            for (let i = 0; i < mobNum; i++) {
                mobType = randomRangeInt(
                    Math.floor(PublicData.getInstance.userData.AreaLevel / 30) -
                        2 >
                        0
                        ? Math.floor(
                              PublicData.getInstance.userData.AreaLevel / 30
                          ) - 2
                        : 0,
                    Math.floor(PublicData.getInstance.userData.AreaLevel / 30) +
                        1
                );
                mobLevel = randomRangeInt(
                    Math.floor(PublicData.getInstance.userData.AreaLevel / 10) -
                        1 >
                        0
                        ? Math.floor(
                              PublicData.getInstance.userData.AreaLevel / 10
                          ) - 1
                        : 1,
                    Math.floor(PublicData.getInstance.userData.AreaLevel / 10) +
                        2
                );
                if (mobType > 4) mobType = 4;
                if (mobLevel > 50) mobLevel = 50;

                PublicData.getInstance.mobData[i] =
                    SetMobInfo.getInstance.setMobType(
                        SetMobInfo.getInstance.mobName[mobType],
                        mobLevel,
                        this.zoneName.string
                    );
                PublicData.getInstance.mobData[i].Name = `${
                    SetMobInfo.getInstance.mobName[mobType]
                }${i + 1}`;
                PublicData.getInstance.mobData[i].HP =
                    PublicData.getInstance.mobData[i].HP.split(`/`)[0];
                Battle.getInstance.mobSpeed[i] = 0;

                PanelLog.instance.addLog(
                    `${PublicData.getInstance.mobData[i].Name}出現了!`,
                    Color.RED
                );
            }

            this.labelBtn1.string = `戰鬥`;
            this.labelBtn2.string = `技能`;
            this.labelBtn3.string = `撤退`;

            PublicData.getInstance.userData.isBattle = true;
            Battle.getInstance.runSpeed();
        }
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );
        SaveAndLoad.getInstance.saveMobData(PublicData.getInstance.mobData);
        this.infoLabelRefresh();
    }
    infoLabelRefresh() {
        SaveAndLoad.getInstance.loadUserData();
        this.conLabelInfo[`Name`].string =
            PublicData.getInstance.userData[`Name`].toString();
        this.conLabelInfo[`HP`].string = `HP ${PublicData.getInstance.userData[
            `HP`
        ].toString()}`;
        this.conLabelInfo[`MP`].string = `MP ${PublicData.getInstance.userData[
            `MP`
        ].toString()}`;
        this.conLabelInfo[
            `Level`
        ].string = `LV ${PublicData.getInstance.userData[`Level`].toString()}`;
        this.conLabelInfo[
            `Stamina`
        ].string = `體力 ${PublicData.getInstance.userData[
            `Stamina`
        ].toString()}`;
        this.conLabelInfo[`Gold`].string = `$${PublicData.getInstance.userData[
            `Gold`
        ].toString()}`;
        this.areaLevel.string =
            PublicData.getInstance.userData[`AreaLevel`].toString();
    }
    setZoneName(name: string) {
        this.home.active = false;
        this.field.active = true;
        PanelPlace.instance.hide();
        PanelLog.instance.addLog(`進入了${name}`);
        this.zoneName.string = name;
        this.infoLabelRefresh();
    }
    async resetUserData() {
        SaveAndLoad.getInstance.saveUserData(new UserData(), new ExtraPoint());
        for (let type in PublicData.getInstance.userItem) {
            SaveAndLoad.getInstance.saveItemData(null, type);
        }
        SaveAndLoad.getInstance.savePlayerEquipData(new PlayerEquip());

        await SaveAndLoad.getInstance.startGameLoad();
        SetUserInfo.getInstance.setUserInfo();
        this.infoLabelRefresh();
    }
    setBtnLabel() {
        this.labelBtn1.string = `前進`;
        this.labelBtn2.string = `休息`;
        this.labelBtn3.string = `回城`;
    }
}
