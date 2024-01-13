import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ZoneName } from "../Enum/ZoneName";

export class ZoneData extends BaseSingleton<ZoneData>() {
    zoneName: string[] = [ZoneName.zone1];
    zoneLV: string[] = [`1`];
    // zoneMob = [{ 大草原: MobInit.mobID }];
}