import { Prefab, _decorator, instantiate, warn } from "cc";
import BaseComponent from "../Model/BaseComponent";
import { DataKey, SaveAndLoad } from "./DataBase/SaveAndLoad";
import { SetUserInfo } from "./計算/SetUserInfo";
import { DropItem } from "./DataBase/ItemInfo";
import { SetItemInfo } from "./計算/SetItemInfo";
import { PublicData } from "./DataBase/PublicData";

const { ccclass, property } = _decorator;
@ccclass(`LoaingData`)
class LoaingData extends BaseComponent {
    @property(Prefab)
    battlePage: Prefab = null;
    @property(Prefab)
    charactorPage: Prefab = null;
    @property(Prefab)
    itemPage: Prefab = null;
    @property(Prefab)
    pageBtn: Prefab = null;
    protected async start() {
        await SaveAndLoad.getInstance.startGameLoad();
        SetUserInfo.getInstance.setUserInfo();
        for (let key in PublicData.getInstance.item.dropItem) {
            SetItemInfo.getInstance.setDropItemInfo(
                PublicData.getInstance.item.dropItem[key],
                key
            );
        }
        SaveAndLoad.getInstance.saveItemData(
            PublicData.getInstance.item.dropItem,
            DataKey.DropItemKey
        );

        instantiate(this.battlePage).parent = this.node;
        instantiate(this.charactorPage).parent = this.node;
        instantiate(this.itemPage).parent = this.node;
        instantiate(this.pageBtn).parent = this.node;
    }
}
