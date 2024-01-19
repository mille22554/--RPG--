import { Node, Prefab, Size, UITransform, _decorator, find } from "cc";
import EasyCode from "../../Model/EasyCode";
import { NodePoolManager } from "../../Model/NodePoolMng/NodePoolMng";
import BaseSingletonComponent from "../../Model/Singleton/BaseSingletonComponent";
import { PublicData } from "../DataBase/PublicData";
import { DataKey, SaveAndLoad } from "../DataBase/SaveAndLoad";
import { EventEnum } from "../Enum/EventEnum";
import Equipment from "./Equipment";
import PanelMessage from "./PanelMessage";
import Sozai from "./Sozai";
import UseItem from "./UseItem";

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
    @property(UITransform)
    scrollView: UITransform;
    @property(UITransform)
    view: UITransform;
    type: string;

    protected onLoad(): void {
        super.onLoad();
        this.hide();
        NodePoolManager.getInstance.init(`sozai`, this.sozai, 1);
        NodePoolManager.getInstance.init(`equipment`, this.equipment, 1);
        NodePoolManager.getInstance.init(`use`, this.use, 1);
        this.setEvent(EventEnum.refreshItemPage, this.refreshItemPage);
        this.setEvent(
            EventEnum.setScrollViewHeightIP,
            this.setScrollViewHeight
        );
    }
    show(...any: any[]): void {
        super.show();
        this.type = `Equipment`;
        this.selectType(null);
    }
    selectType(e?) {
        if (e != null) this.type = e.target.name;
        PanelMessage.instance.hide();
        this.setScrollViewHeight();
        SaveAndLoad.getInstance.loadItemData();
        EasyCode.getInstance.putInPool(`sozai`);
        EasyCode.getInstance.putInPool(`equipment`);
        EasyCode.getInstance.putInPool(`use`);
        switch (this.type) {
            case `Equipment`:
                for (let i of PublicData.getInstance.userItem.userEquip) {
                    let item = EasyCode.getInstance
                        .getFromPool(`equipment`)
                        .getComponent(Equipment);
                    item.node.parent = this.content;
                    item.Name.string = i.Name;
                    item.Type.string = i.Type;
                    item.Durability.string = `耐久 ${i.Durability.toString()}`;

                    // PublicData.getInstance.userItem.userEquip[
                    //     PublicData.getInstance.userItem.userEquip.indexOf(i)
                    // ].ID = PublicData.getInstance.userItem.userEquip.indexOf(i);

                    item.info = i;
                }
                this.eventEmit(EventEnum.init);
                PanelMessage.instance.nowType = `equipment`;
                SaveAndLoad.getInstance.saveItemData(
                    PublicData.getInstance.userItem.userEquip,
                    DataKey.UserEquipKey
                );
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
                SaveAndLoad.getInstance.saveItemData(
                    PublicData.getInstance.userItem.userDropItem,
                    DataKey.UserDropItemKey
                );
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
                SaveAndLoad.getInstance.saveItemData(
                    PublicData.getInstance.userItem.userUseItem,
                    DataKey.UserUseItemKey
                );
                break;
        }
    }
    refreshItemPage() {
        EasyCode.getInstance.putInPool(PanelMessage.instance.nowType);
        switch (PanelMessage.instance.nowType) {
            case `equipment`:
                for (let i of PublicData.getInstance.userItem.userEquip) {
                    let item = EasyCode.getInstance
                        .getFromPool(`equipment`)
                        .getComponent(Equipment);
                    item.node.parent = this.content;
                    item.Name.string = i.Name;
                    item.Type.string = i.Type;
                    item.Durability.string = `耐久 ${i.Durability.toString()}`;
                    item.info = i;
                    // warn(item)
                }
                this.eventEmit(`init`);
                PanelMessage.instance.nowType = `equipment`;
                break;
            case `sozai`:
                for (let i in PublicData.getInstance.userItem.userDropItem) {
                    if (
                        PublicData.getInstance.userItem.userDropItem[i].Num == 0
                    )
                        continue;
                    let item = EasyCode.getInstance
                        .getFromPool(PanelMessage.instance.nowType)
                        .getComponent(Sozai);
                    item.node.parent = this.content;
                    item[
                        `Num`
                    ].string = `X${PublicData.getInstance.userItem.userDropItem[i].Num}`;
                    item[`Name`].string =
                        PublicData.getInstance.userItem.userDropItem[i].Name;
                    item[`info`] =
                        PublicData.getInstance.userItem.userDropItem[i];
                }
                break;
            case `use`:
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
    setScrollViewHeight() {
        if (!this.scrollView)
            this.scrollView = find(`ScrollView`, this.node).getComponent(
                UITransform
            );
        if (!this.view)
            this.view = find(`view`, this.node).getComponent(UITransform);

        if (PanelMessage.instance.node.active) {
            this.scrollView.setContentSize(
                new Size(this.scrollView.width, 1150)
            );
            this.view.setContentSize(new Size(this.view.width, 1150));
        } else {
            this.scrollView.setContentSize(
                new Size(this.scrollView.width, 1600)
            );
            this.view.setContentSize(new Size(this.view.width, 1600));
        }
    }
}
