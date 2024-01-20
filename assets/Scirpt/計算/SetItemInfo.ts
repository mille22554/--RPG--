import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ItemInfo } from "../DataBase/ItemInfo";
import { PublicData } from "../DataBase/PublicData";
import { DropItemName } from "../Enum/DropItemName";
import { EquipmentType } from "../Enum/EquipmentType";
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
                item.Critical = item.Dodge = item.Lux = 0.001;
                item.Text = `黏黏的`;
                break;
            case DropItemName.DI1:
                if (!item.Num) item.Num = 0;
                item.AD = 3;
                item.DEF = item.Speed = 1;
                item.Gold = 2;
                item.Critical = item.Dodge = item.Lux = 0.001;
                item.Text = `修啦幹`;
                break;
            case DropItemName.DI2:
                if (!item.Num) item.Num = 0;
                item.AP = 2;
                item.MDF = 2;
                item.Speed = 1;
                item.Gold = 3;
                item.Critical = item.Dodge = item.Lux = 0.001;
                item.Text = `手指沒感覺了`;
                break;
            case DropItemName.DI3:
                if (!item.Num) item.Num = 0;
                item.Speed = 2;
                item.Gold = 4;
                item.Critical = item.Dodge = item.Lux = 0.002;
                item.Text = `跟沒拿東西一樣`;
                break;
            case DropItemName.DI4:
                if (!item.Num) item.Num = 0;
                item.AD = item.AP = 1;
                item.DEF = item.MDF = 3;
                item.Gold = 5;
                item.Text = `頂扣扣`;
                break;
            //#endregion
            //#region 裝備
            case EquipmentType.E0:
                item.AD = item.DEF = item.Speed = 20;
                item.Critical = item.Dodge = 30;
                item.Lux = 80;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E1:
                item.DEF = item.MDF = 70;
                item.Speed = 30;
                item.Dodge = 10;
                item.Lux = 40;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E2:
                item.DEF = item.MDF = 450;
                item.Speed = 500;
                item.Dodge = -100;
                item.Lux = 100;
                item.Gold = item.Durability = 1000;
                break;
            case EquipmentType.E3:
                item.MDF = item.Speed = item.Dodge = 20;
                item.AP = item.Critical = 40;
                item.Lux = 60;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E4:
                item.AP = 200;
                item.MDF = 100;
                item.Speed = 80;
                item.Critical = 30;
                item.Lux = 150;
                item.Gold = item.Durability = 1000;
                break;
            case EquipmentType.E5:
                item.AD = item.Speed = 150;
                item.DEF = 250;
                item.Critical = 50;
                item.Lux = 100;
                item.Gold = item.Durability = 1000;
                break;
            case EquipmentType.E6:
                item.AD = item.DEF = 90;
                item.Speed = 37.5;
                item.Critical = item.Dodge = 18.75;
                item.Lux = 60;
                item.Gold = item.Durability = 600;
                break;
            case EquipmentType.E7:
                item.AD = 90;
                item.Speed = 48;
                item.Critical = 72;
                item.Dodge = 66;
                item.Lux = 60;
                item.Gold = item.Durability = 600;
                break;
            case EquipmentType.E8:
                item.AD = 450;
                item.Speed = item.Critical = 225;
                item.Lux = 150;
                item.Gold = item.Durability = 600;
                break;
            case EquipmentType.E9:
                item.AD = item.AP = item.DEF = item.MDF = 30;
                item.Speed = 20;
                item.Lux = 60;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E10:
                item.AD = item.Speed = item.Dodge = item.Lux = 60;
                item.DEF = 30;
                item.Critical = 90;
                item.Gold = item.Durability = 600;
                break;
            case EquipmentType.E11:
                item.AD = 200;
                item.DEF = 120;
                item.Speed = 80;
                item.Critical = 60;
                item.Dodge = 100;
                item.Gold = item.Durability = 1000;
                break;
            case EquipmentType.E12:
                item.AD = 48;
                item.DEF = 12;
                item.Speed = 6;
                item.Critical = 30;
                item.Dodge = 90;
                item.Lux = 66;
                item.Gold = item.Durability = 600;
                break;
            case EquipmentType.E13:
                item.AD = item.DEF = item.Speed = 10;
                item.Critical = item.Dodge = 60;
                item.Lux = 30;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E14:
                item.AD = item.AP = 6;
                item.DEF = item.MDF = 90;
                item.Speed = 42;
                item.Dodge = 30;
                item.Lux = 60;
                item.Gold = item.Durability = 600;
                break;
            case EquipmentType.E15:
                item.AD = item.AP = 8;
                item.DEF = item.MDF = 50;
                item.Speed = item.Dodge = 32;
                item.Critical = 4;
                item.Lux = 40;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E16:
                item.AD = item.AP = 37.5;
                item.DEF = item.MDF = 600;
                item.Speed = 675;
                item.Dodge = -150;
                item.Lux = 150;
                item.Gold = item.Durability = 1500;
                break;
            case EquipmentType.E17:
                item.AD = item.AP = 2;
                item.DEF = item.MDF = 40;
                item.Speed = 12;
                item.Dodge = 48;
                item.Lux = 40;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E18:
                item.AD = item.AP = 8;
                item.DEF = item.MDF = 70;
                item.Speed = item.Lux = 40;
                item.Critical = 4;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E19:
                item.AD = item.AP = 10;
                item.DEF = item.MDF = 40;
                item.Speed = 32;
                item.Critical = 52;
                item.Lux = 40;
                item.Gold = item.Durability = 400;
                break;
            case EquipmentType.E20:
                item.AD =
                    item.AP =
                    item.DEF =
                    item.MDF =
                    item.Speed =
                    item.Dodge =
                        10;
                item.Critical = item.Lux = 20;
                item.Gold = item.Durability = 200;
                break;
            case EquipmentType.E21:
                item.AD = item.AP = item.DEF = item.MDF = 5;
                item.Speed = 10;
                item.Critical = 16;
                item.Dodge = 14;
                item.Lux = 40;
                item.Gold = item.Durability = 200;
                break;
            case EquipmentType.E22:
                item.AD = item.AP = item.DEF = item.MDF = 1.25;
                item.Speed = 1;
                item.Critical = item.Dodge = 10;
                item.Lux = 16;
                item.Gold = item.Durability = 100;
                break;
            case EquipmentType.E23:
                item.AD = item.AP = 1;
                item.DEF = item.MDF = item.Speed = item.Dodge = 10;
                item.Lux = 58;
                item.Gold = item.Durability = 200;
                break;
            case EquipmentType.E24:
                item.AD = item.AP = 0.5;
                item.DEF = item.MDF = 4;
                item.Dodge = 8;
                item.Critical = item.Dodge = 10;
                item.Lux = 19;
                item.Gold = item.Durability = 100;
                break;
            case EquipmentType.E25:
                item.AD = item.AP = 3;
                item.DEF = item.MDF = 16;
                item.Speed = 12;
                item.Dodge = 24;
                item.Lux = 30;
                item.Gold = item.Durability = 200;
                break;
            case EquipmentType.E26:
                item.AD = item.AP = 5;
                item.DEF = item.MDF = 18;
                item.Dodge = item.Dodge = 10;
                item.Critical = 4;
                item.Lux = 30;
                item.Gold = item.Durability = 200;
                break;
            //#endregion
            //#region 消耗品
            case UseItemName.UI0:
                item.HP = 50;
                item.Gold = 50;
                item.Text = `HP回50`;
                break;
            case UseItemName.UI1:
                item.Stamina = 50;
                item.Gold = 100;
                item.Text = `體力回50`;
                break;
            //#endregion
        }
        return item;
    }
    findEquipByID(ID: number) {
        let array = [];
        for (let i of PublicData.getInstance.userItem.userEquip)
            array.push(i.ID);
        if (array.indexOf(ID) != -1)
            return PublicData.getInstance.userItem.userEquip[array.indexOf(ID)];
        else return null;
    }
    delectEquipByID(ID: number) {
        let array = [];
        for (let i of PublicData.getInstance.userItem.userEquip)
            array.push(i.ID);
        if (array.indexOf(ID) != -1)
            PublicData.getInstance.userItem.userEquip.splice(
                array.indexOf(ID),
                1
            );
    }
    findIndexByID(ID: number) {
        let array = [];
        for (let i of PublicData.getInstance.userItem.userEquip)
            array.push(i.ID);
        return array.indexOf(ID);
    }
    findIndexByType(Type: string, itemType: string) {
        let array = [];
        for (let i in PublicData.getInstance.userItem[Type])
            array.push(PublicData.getInstance.userItem[Type][i].Type);
        return array.indexOf(itemType);
    }
}
