import { EventTarget } from "cc";
import BaseSingleton from "../Model/Singleton/BaseSingleton";
import { SaveAndLoad } from "./SaveAndLoad";

export interface UserData {
    Name: string;
    HP: string;
    MP: string;
    Stamina: string;
    Level: number;
    Gold: number;
    Exp: string;
    Point: number;
    Str: number;
    Vit: number;
    Dex: number;
    Int: number;
    Agi: number;
    Lux: number;
    AD: number;
    AP: number;
    DEF: number;
    MDF: number;
    Dodge: number;
    Critical: number;
    Speed: number;
    Lucky: number;
    ZoneName: string;
    ZoneLevel: number;
    AreaLevel: number;
    isBattle: boolean;
    isField: boolean;
    isResting: boolean;
}
export interface ExtraPoint {
    Str: number;
    Vit: number;
    Dex: number;
    Int: number;
    Agi: number;
    Lux: number;
}
export class ZoneData extends BaseSingleton<ZoneData>() {
    zoneName: string[] = [`大草原`];
    zoneLV: string[] = [`1`];
    zoneMob = [{ 大草原: MobData.mobID }];
}
export class MobData extends BaseSingleton<MobData>() {
    mobName: string[] = [
        MobName.slime,
        MobName.RedSlime,
        MobName.BlueSlime,
        MobName.GreenSlime,
        MobName.YellowSlime,
    ];
    static mobID: {
        大草原: {
            史萊姆: UserData;
            紅史萊姆: UserData;
            藍史萊姆: UserData;
            綠史萊姆: UserData;
            黃史萊姆: UserData;
        };
    } = {
        大草原: {
            史萊姆: {
                Name: "",
                HP: "",
                MP: "",
                Stamina: "",
                Level: 0,
                Gold: 0,
                Exp: "",
                Point: 0,
                Str: 0,
                Vit: 0,
                Dex: 0,
                Int: 0,
                Agi: 0,
                Lux: 0,
                AD: 0,
                AP: 0,
                DEF: 0,
                MDF: 0,
                Dodge: 0,
                Critical: 0,
                Speed: 0,
                Lucky: 0,
                ZoneName: ``,
                ZoneLevel: 0,
                AreaLevel: 0,
                isBattle: false,
                isField: false,
                isResting: false,
            },
            紅史萊姆: {
                Name: "",
                HP: "",
                MP: "",
                Stamina: "",
                Level: 0,
                Gold: 0,
                Exp: "",
                Point: 0,
                Str: 0,
                Vit: 0,
                Dex: 0,
                Int: 0,
                Agi: 0,
                Lux: 0,
                AD: 0,
                AP: 0,
                DEF: 0,
                MDF: 0,
                Dodge: 0,
                Critical: 0,
                Speed: 0,
                Lucky: 0,
                ZoneName: ``,
                AreaLevel: 0,
                isBattle: false,
                isField: false,
                isResting: false,
                ZoneLevel: 0,
            },
            藍史萊姆: {
                Name: "",
                HP: "",
                MP: "",
                Stamina: "",
                Level: 0,
                Gold: 0,
                Exp: "",
                Point: 0,
                Str: 0,
                Vit: 0,
                Dex: 0,
                Int: 0,
                Agi: 0,
                Lux: 0,
                AD: 0,
                AP: 0,
                DEF: 0,
                MDF: 0,
                Dodge: 0,
                Critical: 0,
                Speed: 0,
                Lucky: 0,
                ZoneName: ``,
                AreaLevel: 0,
                isBattle: false,
                isField: false,
                isResting: false,
                ZoneLevel: 0,
            },
            綠史萊姆: {
                Name: "",
                HP: "",
                MP: "",
                Stamina: "",
                Level: 0,
                Gold: 0,
                Exp: "",
                Point: 0,
                Str: 0,
                Vit: 0,
                Dex: 0,
                Int: 0,
                Agi: 0,
                Lux: 0,
                AD: 0,
                AP: 0,
                DEF: 0,
                MDF: 0,
                Dodge: 0,
                Critical: 0,
                Speed: 0,
                Lucky: 0,
                ZoneName: ``,
                AreaLevel: 0,
                isBattle: false,
                isField: false,
                isResting: false,
                ZoneLevel: 0,
            },
            黃史萊姆: {
                Name: "",
                HP: "",
                MP: "",
                Stamina: "",
                Level: 0,
                Gold: 0,
                Exp: "",
                Point: 0,
                Str: 0,
                Vit: 0,
                Dex: 0,
                Int: 0,
                Agi: 0,
                Lux: 0,
                AD: 0,
                AP: 0,
                DEF: 0,
                MDF: 0,
                Dodge: 0,
                Critical: 0,
                Speed: 0,
                Lucky: 0,
                ZoneName: ``,
                AreaLevel: 0,
                isBattle: false,
                isField: false,
                isResting: false,
                ZoneLevel: 0,
            },
        },
    };
    setMobInfo(ID: string, LV: number, zone?: string) {
        switch (ID) {
            case this.mobName[0]:
                MobData.mobID[zone][ID].Level = LV;
                MobData.mobID[zone][ID].Str =
                    MobData.mobID[zone][ID].Vit =
                    MobData.mobID[zone][ID].Dex =
                    MobData.mobID[zone][ID].Int =
                    MobData.mobID[zone][ID].Agi =
                    MobData.mobID[zone][ID].Lux =
                        LV * 2;
                MobData.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    MobData.mobID[zone][ID]
                );
                break;
            case this.mobName[1]:
                MobData.mobID[zone][ID].Level = LV;
                MobData.mobID[zone][ID].Str = LV * 3;
                MobData.mobID[zone][ID].Vit =
                    MobData.mobID[zone][ID].Dex =
                    MobData.mobID[zone][ID].Agi =
                    MobData.mobID[zone][ID].Lux =
                        LV * 2;
                MobData.mobID[zone][ID].Int = LV;
                MobData.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    MobData.mobID[zone][ID]
                );
                break;
            case this.mobName[2]:
                MobData.mobID[zone][ID].Level = LV;
                MobData.mobID[zone][ID].Int = LV * 4;
                MobData.mobID[zone][ID].Dex =
                    MobData.mobID[zone][ID].Agi =
                    MobData.mobID[zone][ID].Lux =
                        LV * 2;
                MobData.mobID[zone][ID].Str = MobData.mobID[zone][ID].Vit = LV;
                MobData.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    MobData.mobID[zone][ID]
                );
                break;
            case this.mobName[3]:
                MobData.mobID[zone][ID].Level = LV;
                MobData.mobID[zone][ID].Dex =
                    MobData.mobID[zone][ID].Agi =
                    MobData.mobID[zone][ID].Lux =
                        LV * 3;
                MobData.mobID[zone][ID].Str =
                    MobData.mobID[zone][ID].Vit =
                    MobData.mobID[zone][ID].Int =
                        LV;
                MobData.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    MobData.mobID[zone][ID]
                );
                break;
            case this.mobName[4]:
                MobData.mobID[zone][ID].Level = LV;
                MobData.mobID[zone][ID].Vit = LV * 5;
                MobData.mobID[zone][ID].Str = MobData.mobID[zone][ID].Int =
                    LV * 2;
                MobData.mobID[zone][ID].Dex =
                    MobData.mobID[zone][ID].Agi =
                    MobData.mobID[zone][ID].Lux =
                        LV;
                MobData.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    MobData.mobID[zone][ID]
                );
                break;
        }
        return MobData.mobID[zone][ID] as UserData;
    }
}
export enum MobName {
    slime = `史萊姆`,
    RedSlime = `紅史萊姆`,
    BlueSlime = `藍史萊姆`,
    GreenSlime = `綠史萊姆`,
    YellowSlime = `黃史萊姆`,
}
export class SetInfo extends BaseSingleton<SetInfo>() {
    setUserInfo(data: UserData, extra: ExtraPoint) {
        data.AD = 2 * (data.Str + extra.Str);
        data.AP = 2 * (data.Int + extra.Int);
        data.DEF = Number(
            (500 / (500 + 2 * (data.Vit + extra.Vit))).toFixed(3)
        );
        data.MDF = Number(
            (500 / (500 + 2 * (data.Int + extra.Int))).toFixed(3)
        );
        data.Speed = Number(
            (
                ((data.Dex + extra.Dex) * 2 + (data.Agi + extra.Agi) + 500) /
                500
            ).toFixed(3)
        );
        data.Dodge = Number(
            (
                ((data.Agi + extra.Agi) * 3 +
                    (data.Dex + extra.Dex) * 2 +
                    (data.Lux + extra.Lux) +
                    500) /
                500
            ).toFixed(3)
        );
        SaveAndLoad.getInstance.saveUserData(data, extra);
        return data;
    }
    setMobInfo(data: UserData) {
        let hp, mp;
        hp = 10 + data.Level + data.Vit / 2;
        mp = 5 + data.Level / 2 + data.Int / 2;
        data.HP = `${hp}/${hp}`;
        data.MP = `${mp}/${mp}`;
        data.AD = 2 * data.Str;
        data.AP = 2 * data.Int;
        data.DEF = 500 / (500 + 2 * data.Vit);
        data.MDF = 500 / (500 + 2 * data.Int);
        data.Speed = (data.Dex * 2 + data.Agi + 500) / 500;
        data.Dodge = (data.Agi * 3 + data.Dex * 2 + data.Lux + 500) / 500;
        return data;
    }
}
export class EventMng extends BaseSingleton<EventMng>() {
    event = new EventTarget();
}
