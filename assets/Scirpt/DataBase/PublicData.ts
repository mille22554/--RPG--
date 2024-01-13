import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ItemType } from "./ItemInfo";
import { ExtraPoint, UserData } from "./UserData";

export class PublicData extends BaseSingleton<PublicData>() {
    userData: UserData = new UserData();
    userExtra: ExtraPoint = new ExtraPoint();
    item: ItemType = new ItemType();
    mobData = [new UserData()];
}
