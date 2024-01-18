import { Node, Prefab, Size, UITransform, _decorator } from "cc";
import EasyCode from "../../Model/EasyCode";
import { NodePoolManager } from "../../Model/NodePoolMng/NodePoolMng";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import ShouHin from "./ShouHin";
import PanelBuyInfo from "./PanelBuyInfo";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("PanelMarket")
export default class PanelMarket extends BaseSingletonComponent<PanelMarket>() {
    @property(Prefab)
    souhin: Prefab;
    @property(Node)
    content: Node;
    @property(UITransform)
    scrollView: UITransform;
    @property(UITransform)
    view: UITransform;
    protected onLoad(): void {
        super.onLoad();
        NodePoolManager.getInstance.init(`souhin`, this.souhin, 1);
        this.setEvent(EventEnum.setScrollViewHeightPM, this.setScrollViewHeight)
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
    setScrollViewHeight() {
        if (PanelBuyInfo.instance.node.active) {
            this.scrollView.setContentSize(
                new Size(this.scrollView.width, 680)
            );
            this.view.setContentSize(new Size(this.view.width, 680));
        } else {
            this.scrollView.setContentSize(
                new Size(this.scrollView.width, 1130)
            );
            this.view.setContentSize(new Size(this.view.width, 1130));
        }
    }
}
