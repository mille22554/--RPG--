import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";
import EasyCode from "../../Model/EasyCode";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("Zone")
export default class Zone extends BaseComponent {
    @property(Label)
    labelName: Label;
    @property(Label)
    labelLV: Label;
    selectZone() {
        EasyCode.getInstance.putInPool(`logItem`);

        SaveAndLoad.getInstance.loadUserData();
        PublicData.getInstance.userData[`AreaLevel`] = 1;
        PublicData.getInstance.userData[`ZoneName`] = this.labelName.string;
        PublicData.getInstance.userData[`isField`] = true;
        SaveAndLoad.getInstance.saveUserData(
            PublicData.getInstance.userData,
            PublicData.getInstance.userExtra
        );

        this.eventEmit(EventEnum.SetZoneName, this.labelName.string);
    }
}
