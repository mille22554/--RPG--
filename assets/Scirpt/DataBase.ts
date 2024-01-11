import { EventTarget, warn } from "cc";
import BaseSingleton from "../Model/Singleton/BaseSingleton";
import { SaveAndLoad } from "./SaveAndLoad";

export class UserData {
    Name?: string;
    HP?: string;
    MP?: string;
    Stamina?: string;
    Level?: number;
    Gold?: number;
    Exp?: string;
    Point?: number;
    Str?: number;
    Vit?: number;
    Dex?: number;
    Int?: number;
    Agi?: number;
    Lux?: number;
    AD?: number;
    AP?: number;
    DEF?: number;
    MDF?: number;
    Dodge?: number;
    Critical?: number;
    Speed?: number;
    Lucky?: number;
    ZoneName?: string;
    ZoneLevel?: number;
    AreaLevel?: number;
    isBattle?: boolean;
    isField?: boolean;
    isResting?: boolean;
}
export interface ExtraPoint {
    Str?: number;
    Vit?: number;
    Dex?: number;
    Int?: number;
    Agi?: number;
    Lux?: number;
}
export class ItemInfo {
    ID?: number;
    Name?: string;
    AD?: number;
    AP?: number;
    DEF?: number;
    MDF?: number;
    Dodge?: number;
    Critical?: number;
    Speed?: number;
    Lucky?: number;
    Num?: number;
    Gold?: number;
}
export class ZoneData extends BaseSingleton<ZoneData>() {
    zoneName: string[] = [`大草原`];
    zoneLV: string[] = [`1`];
    // zoneMob = [{ 大草原: MobInit.mobID }];
}
export class MobInit extends BaseSingleton<MobInit>() {
    mobName: string[] = [
        MobName.slime,
        MobName.RedSlime,
        MobName.BlueSlime,
        MobName.GreenSlime,
        MobName.YellowSlime,
    ];
    mobID: MobID;
    setMobInfo(ID: string, LV: number, zone?: string) {
        this.mobID = new MobID();
        switch (ID) {
            case this.mobName[0]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Str =
                    this.mobID[zone][ID].Vit =
                    this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Int =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV * 2;
                this.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    this.mobID[zone][ID]
                );
                break;
            case this.mobName[1]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Str = LV * 3;
                this.mobID[zone][ID].Vit =
                    this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV * 2;
                this.mobID[zone][ID].Int = LV;
                this.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    this.mobID[zone][ID]
                );
                break;
            case this.mobName[2]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Int = LV * 4;
                this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV * 2;
                this.mobID[zone][ID].Str = this.mobID[zone][ID].Vit = LV;
                this.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    this.mobID[zone][ID]
                );
                break;
            case this.mobName[3]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV * 3;
                this.mobID[zone][ID].Str =
                    this.mobID[zone][ID].Vit =
                    this.mobID[zone][ID].Int =
                        LV;
                this.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    this.mobID[zone][ID]
                );
                break;
            case this.mobName[4]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Vit = LV * 5;
                this.mobID[zone][ID].Str = this.mobID[zone][ID].Int = LV * 2;
                this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV;
                this.mobID[zone][ID] = SetInfo.getInstance.setMobInfo(
                    this.mobID[zone][ID]
                );
                break;
        }
        return this.mobID[zone][ID];
    }
}
class MobID {
    大草原: {
        史萊姆: UserData;
        紅史萊姆: UserData;
        藍史萊姆: UserData;
        綠史萊姆: UserData;
        黃史萊姆: UserData;
    } = {
        史萊姆: new UserData(),
        紅史萊姆: new UserData(),
        藍史萊姆: new UserData(),
        綠史萊姆: new UserData(),
        黃史萊姆: new UserData(),
    };
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
        data.DEF = Math.floor((data.Vit + extra.Vit) / 2);
        data.MDF = Math.floor((data.Int + extra.Int) / 2);
        data.Speed = (data.Dex + extra.Dex) * 4 + (data.Agi + extra.Agi);
        data.Dodge =
            ((data.Agi + extra.Agi) * 0.25 +
                (data.Dex + extra.Dex) * 0.2 +
                (data.Lux + extra.Lux) * 0.05) /
            100;
        data.Critical =
            ((data.Agi + extra.Agi) * 0.3 +
                (data.Dex + extra.Dex) * 0.15 +
                (data.Lux + extra.Lux) * 0.05) /
            100;
        data.Lucky = ((data.Lux + extra.Lux) * 0.5) / 100;
        SaveAndLoad.getInstance.saveUserData(data, extra);
        return data;
    }
    setMobInfo(data: UserData) {
        let hp, mp;
        hp = 10 + data.Level * 5 + data.Vit * 2.5;
        mp = 5 + data.Level * 2.5 + data.Int * 2.5;
        data.HP = `${hp}/${hp}`;
        data.MP = `${mp}/${mp}`;
        data.AD = data.Str;
        data.AP = data.Int;
        data.DEF = Math.floor(data.Vit / 2);
        data.MDF = Math.floor(data.Int / 2);
        data.Speed = data.Dex * 4 + data.Agi;
        data.Dodge = (data.Agi * 0.25 + data.Dex * 0.2 + data.Lux * 0.05) / 100;
        data.Critical =
            (data.Agi * 0.3 + data.Dex * 0.15 + data.Lux * 0.05) / 100;
        data.Lucky = (data.Lux * 0.5) / 100;
        return data;
    }
}
export class ItemType extends BaseSingleton<ItemType>() {
    dropItem: ItemInfo[] = [new ItemInfo()];
    setInfo(item: ItemInfo) {
        switch (item.ID) {
            case 0:
                item.Name = `史萊姆球`;
                item.Num = 0;
                item.AD =
                    item.AP =
                    item.DEF =
                    item.MDF =
                    item.Speed =
                    item.Gold =
                        1;
                item.Critical = item.Dodge = item.Lucky = 0.01;
                break;
            case 1:
                item.Name = `火萊姆球`;
                item.Num = 0;
                item.AD = 3;
                item.DEF = item.Speed = 1;
                item.Gold = 2;
                item.Critical = item.Dodge = item.Lucky = 0.01;
                break;
            case 2:
                item.Name = `冰萊姆球`;
                item.Num = 0;
                item.AP = 2;
                item.MDF = 2;
                item.Speed = 1;
                item.Gold = 3;
                item.Critical = item.Dodge = item.Lucky = 0.01;
                break;
            case 3:
                item.Name = `輕萊姆球`;
                item.Num = 0;
                item.Speed = 2;
                item.Gold = 4;
                item.Critical = item.Dodge = item.Lucky = 0.02;
                break;
            case 4:
                item.Name = `固萊姆球`;
                item.Num = 0;
                item.AD = item.AP = 1;
                item.DEF = item.MDF = 3;
                item.Gold = 5;
                break;
        }
        return item;
    }
}
export class EventMng extends BaseSingleton<EventMng>() {
    event = new EventTarget();
}
