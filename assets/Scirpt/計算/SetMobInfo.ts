import { Color, randomRangeInt } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import PanelLog from "../BattlePage/PanelLog";
import { DropItem } from "../DataBase/ItemInfo";
import { zoneType } from "../DataBase/MobInfo";
import { PublicData } from "../DataBase/PublicData";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { UserData } from "../DataBase/UserData";
import { DropItemName } from "../Enum/DropItemName";
import { MobName } from "../Enum/MobName";
import { SetItemInfo } from "./SetItemInfo";

export class SetMobInfo extends BaseSingleton<SetMobInfo>() {
    mobName: string[] = [
        MobName.M0,
        MobName.M1,
        MobName.M2,
        MobName.M3,
        MobName.M4,
    ];
    mobID = new zoneType();
    setMobType(ID: string, LV: number, zone: string) {
        this.mobID = new zoneType();
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
                this.mobID[zone][ID] = this.setMobInfo(this.mobID[zone][ID]);
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
                this.mobID[zone][ID] = this.setMobInfo(this.mobID[zone][ID]);
                break;
            case this.mobName[2]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Int = LV * 4;
                this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV * 2;
                this.mobID[zone][ID].Str = this.mobID[zone][ID].Vit = LV;
                this.mobID[zone][ID] = this.setMobInfo(this.mobID[zone][ID]);
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
                this.mobID[zone][ID] = this.setMobInfo(this.mobID[zone][ID]);
                break;
            case this.mobName[4]:
                this.mobID[zone][ID].Level = LV;
                this.mobID[zone][ID].Vit = LV * 5;
                this.mobID[zone][ID].Str = this.mobID[zone][ID].Int = LV * 2;
                this.mobID[zone][ID].Dex =
                    this.mobID[zone][ID].Agi =
                    this.mobID[zone][ID].Lux =
                        LV;
                this.mobID[zone][ID] = this.setMobInfo(this.mobID[zone][ID]);
                break;
        }
        return this.mobID[zone][ID];
    }
    setMobInfo(data: UserData) {
        let hp: number, mp: number;
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
    setMobDrop(mobName: string) {
        switch (mobName) {
            case MobName.M0:
                let i = new DropItem().史萊姆球;
                i.Name = DropItemName.DI0;
                i = SetItemInfo.getInstance.setItemInfo(i, i.Name);
                let dropNum = randomRangeInt(0, 3);
                if (dropNum > 0)
                    PanelLog.instance.addLog(
                        `${mobName}掉落了${dropNum}個${i.Name}`,
                        Color.GREEN
                    );
                PublicData.getInstance.item.dropItem[i.Name].Num += dropNum;
                PublicData.getInstance.item.dropItem[i.Name].Name = i.Name;
                break;
            case MobName.M1:
                for (let id of [DropItemName.DI0, DropItemName.DI1]) {
                    let i = new DropItem()[id];
                    i.Name = id;
                    i = SetItemInfo.getInstance.setItemInfo(i, i.Name);
                    let dropNum = randomRangeInt(0, 3);
                    if (dropNum > 0)
                        PanelLog.instance.addLog(
                            `${mobName}掉落了${dropNum}個${id}`,
                            Color.GREEN
                        );
                    PublicData.getInstance.item.dropItem[id].Num += dropNum;
                    PublicData.getInstance.item.dropItem[i.Name].Name = i.Name;
                }
                break;
            case MobName.M2:
                for (let id of [DropItemName.DI0, DropItemName.DI2]) {
                    let i = new DropItem()[id];
                    i.Name = id;
                    i = SetItemInfo.getInstance.setItemInfo(i, i.Name);
                    let dropNum = randomRangeInt(0, 3);
                    if (dropNum > 0)
                        PanelLog.instance.addLog(
                            `${mobName}掉落了${dropNum}個${id}`,
                            Color.GREEN
                        );
                    PublicData.getInstance.item.dropItem[id].Num += dropNum;
                    PublicData.getInstance.item.dropItem[i.Name].Name = i.Name;
                }
                break;
            case MobName.M3:
                for (let id of [DropItemName.DI0, DropItemName.DI3]) {
                    let i = new DropItem()[id];
                    i.Name = id;
                    i = SetItemInfo.getInstance.setItemInfo(i, i.Name);
                    let dropNum = randomRangeInt(0, 3);
                    if (dropNum > 0)
                        PanelLog.instance.addLog(
                            `${mobName}掉落了${dropNum}個${id}`,
                            Color.GREEN
                        );
                    PublicData.getInstance.item.dropItem[id].Num += dropNum;
                    PublicData.getInstance.item.dropItem[i.Name].Name = i.Name;
                }
                break;
            case MobName.M4:
                for (let id of [DropItemName.DI0, DropItemName.DI4]) {
                    let i = new DropItem()[id];
                    i.Name = id;
                    i = SetItemInfo.getInstance.setItemInfo(i, i.Name);
                    let dropNum = randomRangeInt(0, 3);
                    if (dropNum > 0)
                        PanelLog.instance.addLog(
                            `${mobName}掉落了${dropNum}個${id}`,
                            Color.GREEN
                        );
                    PublicData.getInstance.item.dropItem[id].Num += dropNum;
                    PublicData.getInstance.item.dropItem[i.Name].Name = i.Name;
                }
                break;
        }
    }
}
