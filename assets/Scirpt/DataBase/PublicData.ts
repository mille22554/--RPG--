import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ItemType, UserItem } from "./ItemInfo";
import PlayerEquip from "./PlayerEquip";
import { ExtraPoint, UserData } from "./UserData";

export class PublicData extends BaseSingleton<PublicData>() {
    userData: UserData = new UserData();
    userExtra: ExtraPoint = new ExtraPoint();
    item: ItemType = new ItemType();
    userItem = new UserItem();
    mobData = [new UserData()];
    playerEquip = new PlayerEquip();
}
