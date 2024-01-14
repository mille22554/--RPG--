import { Node, Prefab, _decorator } from "cc";
import EasyCode from "../../Model/EasyCode";
import { NodePoolManager } from "../../Model/NodePoolMng/NodePoolMng";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import Equipment from "./Equipment";
import PanelMessage from "./PanelMessage";
import Sozai from "./Sozai";
import UseItem from "./UseItem";
import { EventEnum } from "../Enum/EventEnum";

const { ccclass, property } = _decorator;
@ccclass("ItemPage")
export default class ItemPage extends BaseSingletonComponent<ItemPage>() {
    @property(Node)
    content: Node;
    @property(Prefab)
    equipment: Prefab;
    @property(Prefab)
    sozai: Prefab;
    @property(Prefab)
    use: Prefab;
    protected onLoad(): void {
        super.onLoad();
        this.hide();
        NodePoolManager.getInstance.init(`sozai`, this.sozai, 1);
        NodePoolManager.getInstance.init(`equipment`, this.equipment, 1);
        NodePoolManager.getInstance.init(`use`, this.use, 1);
        this.setEvent(EventEnum.refreshItemPage, this.refreshItemPage);
    }
    show(...any: any[]): void {
        super.show();
        PanelMessage.instance.hide();
        SaveAndLoad.getInstance.loadItemData();
        EasyCode.getInstance.putInPool(`sozai`);
        EasyCode.getInstance.putInPool(`equipment`);
        EasyCode.getInstance.putInPool(`use`);
        for (let i of PublicData.getInstance.userItem.userEquip) {
            let item = EasyCode.getInstance
                .getFromPool(`equipment`)
                .getComponent(Equipment);
            item.node.parent = this.content;
            item.Name.string = i.Name;
            item.Type.string = i.Type;
            item.info = i;
        }
        PanelMessage.instance.nowType = `equipment`;
    }
    selectType(e) {
        PanelMessage.instance.hide();
        SaveAndLoad.getInstance.loadItemData();
        EasyCode.getInstance.putInPool(`sozai`);
        EasyCode.getInstance.putInPool(`equipment`);
        EasyCode.getInstance.putInPool(`use`);
        switch (e.target.name) {
            case `Equipment`:
                for (let i of PublicData.getInstance.userItem.userEquip) {
                    let item = EasyCode.getInstance
                        .getFromPool(`equipment`)
                        .getComponent(Equipment);
                    item.node.parent = this.content;
                    item.Name.string = i.Name;
                    item.Type.string = i.Type;
                    item.info = i;
                }
                PanelMessage.instance.nowType = `equipment`;
                break;
            case `Sozai`:
                for (let i in PublicData.getInstance.userItem.userDropItem) {
                    if (
                        PublicData.getInstance.userItem.userDropItem[i].Num == 0
                    )
                        continue;
                    let item = EasyCode.getInstance
                        .getFromPool(`sozai`)
                        .getComponent(Sozai);
                    item.node.parent = this.content;
                    item.Num.string = `X${PublicData.getInstance.userItem.userDropItem[i].Num}`;
                    item.Name.string =
                        PublicData.getInstance.userItem.userDropItem[i].Name;
                    item.info = PublicData.getInstance.userItem.userDropItem[i];
                }
                PanelMessage.instance.nowType = `sozai`;
                break;
            case `Use`:
                for (let i in PublicData.getInstance.userItem.userUseItem) {
                    if (PublicData.getInstance.userItem.userUseItem[i].Num == 0)
                        continue;
                    let item = EasyCode.getInstance
                        .getFromPool(`use`)
                        .getComponent(UseItem);
                    item.node.parent = this.content;
                    item.Num.string = `X${PublicData.getInstance.userItem.userUseItem[i].Num}`;
                    item.Name.string =
                        PublicData.getInstance.userItem.userUseItem[i].Name;
                    item.info = PublicData.getInstance.userItem.userUseItem[i];
                }
                PanelMessage.instance.nowType = `use`;
                break;
        }
    }
    refreshItemPage() {
        let _class;
        EasyCode.getInstance.putInPool(PanelMessage.instance.nowType);
        switch (PanelMessage.instance.nowType) {
            case `equipment`:
                _class = Equipment;
                for (let i of PublicData.getInstance.userItem.userEquip) {
                    let item = EasyCode.getInstance
                        .getFromPool(`equipment`)
                        .getComponent(Equipment);
                    item.node.parent = this.content;
                    item.Name.string = i.Name;
                    item.Type.string = i.Type;
                    item.info = i;
                }
                PanelMessage.instance.nowType = `equipment`;
                break;
            case `sozai`:
                _class = Sozai;
                for (let i in PublicData.getInstance.userItem.userDropItem) {
                    if (PublicData.getInstance.userItem.userDropItem[i].Num == 0)
                        continue;
                    let item = EasyCode.getInstance
                        .getFromPool(PanelMessage.instance.nowType)
                        .getComponent(_class);
                    item.node.parent = this.content;
                    item[
                        `Num`
                    ].string = `X${PublicData.getInstance.userItem.userDropItem[i].Num}`;
                    item[`Name`].string =
                        PublicData.getInstance.userItem.userDropItem[i].Name;
                    item[`info`] = PublicData.getInstance.userItem.userDropItem[i];
                }
                break;
            case `use`:
                _class = UseItem;
                for (let i in PublicData.getInstance.userItem.userUseItem) {
                    if (PublicData.getInstance.userItem.userUseItem[i].Num == 0)
                        continue;
                    let item = EasyCode.getInstance
                        .getFromPool(`use`)
                        .getComponent(UseItem);
                    item.node.parent = this.content;
                    item.Num.string = `X${PublicData.getInstance.userItem.userUseItem[i].Num}`;
                    item.Name.string =
                        PublicData.getInstance.userItem.userUseItem[i].Name;
                    item.info = PublicData.getInstance.userItem.userUseItem[i];
                }
                PanelMessage.instance.nowType = `use`;
                break;
        }
    }
}
