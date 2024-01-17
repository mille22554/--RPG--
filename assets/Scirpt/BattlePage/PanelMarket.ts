import { Node, Prefab, _decorator } from "cc";
import EasyCode from "../../Model/EasyCode";
import { NodePoolManager } from "../../Model/NodePoolMng/NodePoolMng";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import ShouHin from "./ShouHin";
import PanelBuyInfo from "./PanelBuyInfo";

const { ccclass, property } = _decorator;
@ccclass("PanelMarket")
export default class PanelMarket extends BaseSingletonComponent<PanelMarket>() {
    @property(Prefab)
    souhin: Prefab;
    @property(Node)
    content: Node;
    protected onLoad(): void {
        super.onLoad();
        NodePoolManager.getInstance.init(`souhin`, this.souhin, 1);
    }
    protected start(): void {
        this.hide();
    }
    show(): void {
        super.show();
        this.openTownShop();
    }
    hide(): void {
        super.hide();
        PanelBuyInfo.instance.hide();
    }
    openTownShop() {
        this.loadEquipmentItem();
    }
    loadEquipmentItem() {
        PanelBuyInfo.instance.hide();
        EasyCode.getInstance.putInPool(`souhin`);
        SaveAndLoad.getInstance.loadUserData();
        for (let key in PublicData.getInstance.item.equipment) {
            let item = EasyCode.getInstance
                .getFromPool(`souhin`)
                .getComponent(ShouHin);
            item.labelName.string =
                PublicData.getInstance.item.equipment[key].Name;
            item.labelGold.string = `$${PublicData.getInstance.item.equipment[key].Gold}`;
            item.node.parent = this.content;
            item.nowType = `E`;
            item.info = PublicData.getInstance.item.equipment[key];
        }
    }
    loadUseItem() {
        PanelBuyInfo.instance.hide();
        EasyCode.getInstance.putInPool(`souhin`);
        SaveAndLoad.getInstance.loadUserData();
        for (let key in PublicData.getInstance.item.useItem) {
            let item = EasyCode.getInstance
                .getFromPool(`souhin`)
                .getComponent(ShouHin);
            item.labelName.string =
                PublicData.getInstance.item.useItem[key].Name;
            item.labelGold.string = `$${PublicData.getInstance.item.useItem[key].Gold}`;
            item.node.parent = this.content;
            item.nowType = `U`;
            item.info = PublicData.getInstance.item.useItem[key];
        }
    }
}
