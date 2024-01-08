import { Node, Prefab, _decorator, warn } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import { NodePoolManager } from "../Model/NodePoolMng/NodePoolMng";
import EasyCode from "../Model/EasyCode";
import { SaveAndLoad } from "./SaveAndLoad";
import Zone from "./Zone";
import { ZoneData } from "./DataBase";

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
        let data = SaveAndLoad.getInstance.loadUserData();
        console.log(data[0][`ZoneLevel`])
        for (let i = 0; i < data[0][`ZoneLevel`]; i++) {
            let zone = EasyCode.getInstance
                .getFromPool(`zoneItem`)
                .getComponent(Zone);
            zone.labelName.string = ZoneData.getInstance.zoneName[i];
            zone.labelLV.string = `LV${ZoneData.getInstance.zoneLV[i]}~`;
            console.log(zone.node,this.content)
            zone.node.parent = this.content;
        }
    }
}
