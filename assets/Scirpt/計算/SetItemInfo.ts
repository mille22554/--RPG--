import { warn } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { DropItem, ItemInfo } from "../DataBase/ItemInfo";
import { DropItemName } from "../Enum/DropItemName";

export class SetItemInfo extends BaseSingleton<SetItemInfo>() {
    setDropItemInfo(item: ItemInfo, name: string) {
        switch (name) {
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
        }
        return item;
    }
}
