import { Label, _decorator } from "cc";
import BaseComponent from "../Model/BaseComponent";
import PanelPlace from "./PanelPlace";
import BattlePage from "./BattlePage";
import EasyCode from "../Model/EasyCode";
import PanelLog from "./PanelLog";
import { UserData } from "./DataBase";
import { SaveAndLoad } from "./SaveAndLoad";

const { ccclass, property } = _decorator;
@ccclass("Zone")
export default class Zone extends BaseComponent {
    @property(Label)
    labelName: Label;
    @property(Label)
    labelLV: Label;
    selectZone() {
        PanelPlace.instance.hide();
        BattlePage.instance.home.active = false;
        BattlePage.instance.field.active = true;

        EasyCode.getInstance.putInPool(`logItem`);

        PanelLog.instance.addLog(`進入了${this.labelName.string}`);

        let data = SaveAndLoad.getInstance.loadUserData();
        data[0][`AreaLevel`] = 1;
        data[0][`ZoneName`] = this.labelName.string;
        data[0][`isField`] = true;
        SaveAndLoad.getInstance.saveUserData(data[0], data[1]);
        
        BattlePage.instance.zoneName.string = this.labelName.string;
        BattlePage.instance.infoLabelRefresh()
    }
}
