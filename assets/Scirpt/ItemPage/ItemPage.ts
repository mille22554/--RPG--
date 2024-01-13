import { Node, Prefab, _decorator, warn } from "cc";
import EasyCode from "../../Model/EasyCode";
import { NodePoolManager } from "../../Model/NodePoolMng/NodePoolMng";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import Sozai from "./Sozai";

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
    }
    selectType(e) {
        SaveAndLoad.getInstance.loadItemData();
        EasyCode.getInstance.putInPool(`sozai`);
        switch (e.target.name) {
            case `Equipment`:
                break;
            case `Sozai`:
                for (let i in PublicData.getInstance.item.dropItem) {
                    if (PublicData.getInstance.item.dropItem[i].Name == ``)
                        continue;
                    let item = EasyCode.getInstance
                        .getFromPool(`sozai`)
                        .getComponent(Sozai);
                    warn(item);
                    item.node.parent = this.content;
                    item.Name.string =
                        PublicData.getInstance.item.dropItem[i].Name;
                    item.Num.string = `X${PublicData.getInstance.item.dropItem[i].Num}`;
                }
                break;
            case `Use`:
                break;
        }
    }
}
