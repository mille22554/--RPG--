import { Label, _decorator, warn } from "cc";
import BaseComponent from "../Model/BaseComponent";
import PanelPlace from "./PanelPlace";
import BattlePage from "./BattlePage";
import EasyCode from "../Model/EasyCode";
import PanelLog from "./PanelLog";
import { EventMng, UserData } from "./DataBase";
import { SaveAndLoad } from "./SaveAndLoad";

const { ccclass, property } = _decorator;
@ccclass("Zone")
export default class Zone extends BaseComponent {
    @property(Label)
    labelName: Label;
    @property(Label)
    labelLV: Label;
    selectZone() {
        EasyCode.getInstance.putInPool(`logItem`);

        let data = SaveAndLoad.getInstance.loadUserData();
        data[0][`AreaLevel`] = 1;
        data[0][`ZoneName`] = this.labelName.string;
        data[0][`isField`] = true;
        SaveAndLoad.getInstance.saveUserData(data[0], data[1]);

        this.eventEmit(`SetZoneName`, this.labelName.string);
    }
}
