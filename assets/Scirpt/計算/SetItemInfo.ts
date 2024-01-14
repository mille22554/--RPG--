import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ItemInfo } from "../DataBase/ItemInfo";
import { DropItemName } from "../Enum/DropItemName";
import { EquipmentName } from "../Enum/EquipmentName";
import { UseItemName } from "../Enum/UseItemName";

export class SetItemInfo extends BaseSingleton<SetItemInfo>() {
    setItemInfo(item: ItemInfo, name: string) {
        item.Name = item.Type = name;
        switch (name) {
            //#region DropItem
            case DropItemName.DI0:
                if (!item.Num) item.Num = 0;
                item.AD =
                    item.AP =
                    item.DEF =
                    item.MDF =
                    item.Speed =
                    item.Gold =
                        1;
                item.Critical = item.Dodge = item.Lucky = 0.01;
                break;
            case DropItemName.DI1:
                if (!item.Num) item.Num = 0;
                item.AD = 3;
                item.DEF = item.Speed = 1;
                item.Gold = 2;
                item.Critical = item.Dodge = item.Lucky = 0.01;
                break;
            case DropItemName.DI2:
                if (!item.Num) item.Num = 0;
                item.AP = 2;
                item.MDF = 2;
                item.Speed = 1;
                item.Gold = 3;
                item.Critical = item.Dodge = item.Lucky = 0.01;
                break;
            case DropItemName.DI3:
                if (!item.Num) item.Num = 0;
                item.Speed = 2;
                item.Gold = 4;
                item.Critical = item.Dodge = item.Lucky = 0.02;
                break;
            case DropItemName.DI4:
                if (!item.Num) item.Num = 0;
                item.AD = item.AP = 1;
                item.DEF = item.MDF = 3;
                item.Gold = 5;
                break;
            //#endregion
            //#region 裝備
            case EquipmentName.E0:
                item.AD = 5;
                item.DEF = 3;
                item.Critical = item.Dodge = item.Lucky = 0.05;
                item.Speed = 10;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E1:
                item.DEF = 10;
                item.MDF = 5;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E2:
                item.DEF = 30;
                item.MDF = 20;
                item.Speed = -10;
                item.Dodge = -0.05;
                item.Gold = 500;
                item.Durability = 100;
                break;
            case EquipmentName.E3:
                item.AP = 5;
                item.MDF = 3;
                item.Speed = 5;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E4:
                item.AP = 15;
                item.MDF = 10;
                item.Gold = 300;
                item.Durability = 100;
                break;
            case EquipmentName.E5:
                item.AD = 15;
                item.DEF = 10;
                item.Gold = 300;
                item.Durability = 100;
                break;
            case EquipmentName.E6:
                item.AD = 8;
                item.DEF = 5;
                item.Gold = 200;
                item.Durability = 100;
                break;
            case EquipmentName.E7:
                item.AD = 8;
                item.Critical = 0.1;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E8:
                item.AD = 20;
                item.Critical = 0.3;
                item.Gold = 300;
                item.Durability = 100;
                break;
            case EquipmentName.E9:
                item.AD = 3;
                item.DEF = 3;
                item.AP = 3;
                item.MDF = 3;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E10:
                item.AD = 8;
                item.DEF = 8;
                item.AP = 8;
                item.MDF = 8;
                item.Gold = 300;
                item.Durability = 100;
                break;
            case EquipmentName.E11:
                item.AD = 12;
                item.Critical = item.Dodge = 0.1;
                item.Speed = 5;
                item.Gold = 300;
                item.Durability = 100;
                break;
            case EquipmentName.E12:
                item.AD = 8;
                item.Dodge = 0.2;
                item.Speed = 5;
                item.Gold = 300;
                item.Durability = 100;
                break;
            case EquipmentName.E13:
                item.AD = 3;
                item.Critical = item.Dodge = 0.1;
                item.Speed = 8;
                item.Gold = 200;
                item.Durability = 100;
                break;
            case EquipmentName.E14:
                item.DEF = 5;
                item.MDF = 5;
                item.Speed = 3;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E15:
                item.DEF = 3;
                item.MDF = 3;
                item.Dodge = 0.05;
                item.Speed = 3;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E16:
                item.DEF = 20;
                item.MDF = 20;
                item.Speed = -10;
                item.Gold = 500;
                item.Durability = 100;
                break;
            case EquipmentName.E17:
                item.DEF = 2;
                item.MDF = 2;
                item.Dodge = 0.1;
                item.Speed = 8;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E18:
                item.DEF = 8;
                item.MDF = 8;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E19:
                item.DEF = 2;
                item.MDF = 2;
                item.Critical = 0.1;
                item.Gold = 100;
                item.Durability = 100;
                break;
            case EquipmentName.E20:
                item.Critical = 0.05;
                item.Speed = 3;
                item.Gold = 50;
                item.Durability = 100;
                break;
            case EquipmentName.E21:
                item.Lucky = 0.05;
                item.Gold = 50;
                item.Durability = 100;
                break;
            case EquipmentName.E22:
                item.Critical = item.Dodge = item.Lucky = 0.02;
                item.Gold = 50;
                item.Durability = 100;
                break;
            case EquipmentName.E23:
                item.AP = item.MDF = 2;
                item.Gold = 50;
                item.Durability = 100;
                break;
            case EquipmentName.E24:
                item.Dodge = 0.03;
                item.Gold = 50;
                item.Durability = 100;
                break;
            case EquipmentName.E25:
                item.Speed = 6;
                item.Gold = 50;
                item.Durability = 100;
                break;
            case EquipmentName.E26:
                item.Dodge = 0.06;
                item.Gold = 50;
                item.Durability = 100;
                break;
            //#endregion
            //#region 消耗品
            case UseItemName.UI0:
                item.HP = 50;
                item.Gold = 50;
                break;
            case UseItemName.UI1:
                item.Stamina = 50;
                item.Gold = 100;
                break;
            //#endregion
        }
        return item;
    }
}
