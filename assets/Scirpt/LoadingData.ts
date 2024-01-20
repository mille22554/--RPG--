import { Prefab, _decorator, instantiate } from "cc";
import BaseComponent from "../Model/BaseComponent";
import { PublicData } from "./DataBase/PublicData";
import { DataKey, SaveAndLoad } from "./DataBase/SaveAndLoad";
import { SetItemInfo } from "./計算/SetItemInfo";
import { SetUserInfo } from "./計算/SetUserInfo";

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
        for (let type in PublicData.getInstance.item) {
            for (let key in PublicData.getInstance.item[type]) {
                SetItemInfo.getInstance.setItemInfo(
                    PublicData.getInstance.item[type][key],
                    key
                );
            }
            SaveAndLoad.getInstance.saveItemData(
                PublicData.getInstance.item[type],
                type
            );
        }

        await SaveAndLoad.getInstance.startGameLoad();
        SaveAndLoad.getInstance.UpdateData();
        SetUserInfo.getInstance.setUserInfo();

        instantiate(this.battlePage).parent = this.node;
        instantiate(this.charactorPage).parent = this.node;
        instantiate(this.itemPage).parent = this.node;
        instantiate(this.pageBtn).parent = this.node;
    }
}
