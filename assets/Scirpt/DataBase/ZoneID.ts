import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { UserData } from "./UserData";

export class ZoneID extends BaseSingleton<ZoneID>() {
    zone: Zone[] = [new Zone()];
}
class Zone {
    mob: UserData[] = [new UserData()];
}
