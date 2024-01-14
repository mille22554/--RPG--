import { Node, Prefab, _decorator } from "cc";
import EasyCode from "../../Model/EasyCode";
import { NodePoolManager } from "../../Model/NodePoolMng/NodePoolMng";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { ZoneData } from "../DataBase/ZoneData";
import Zone from "./Zone";

const { ccclass, property } = _decorator;
@ccclass("PanelPlace")
export default class PanelPlace extends BaseSingletonComponent<PanelPlace>() {
    @property(Prefab)
    Zone: Prefab;
    @property(Node)
    content: Node;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
        NodePoolManager.getInstance.init(`zoneItem`, this.Zone, 1);
    }
    show(): void {
        super.show();
        EasyCode.getInstance.putInPool(`zoneItem`);
        SaveAndLoad.getInstance.loadUserData();
        for (let i = 0; i < PublicData.getInstance.userData[`ZoneLevel`]; i++) {
            let zone = EasyCode.getInstance
                .getFromPool(`zoneItem`)
                .getComponent(Zone);
            zone.labelName.string = ZoneData.getInstance.zoneName[i];
            zone.labelLV.string = `LV${ZoneData.getInstance.zoneLV[i]}~`;
            console.log(zone.node, this.content);
            zone.node.parent = this.content;
        }
    }
}
