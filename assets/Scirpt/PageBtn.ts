import { _decorator } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import BattlePage from "./BattlePage/BattlePage";
import CharactorPage from "./CharactorPage";
import ItemPage from "./ItemPage/ItemPage";

const { ccclass, property } = _decorator;
@ccclass("PageBtn")
export default class PageBtn extends BaseSingletonComponent<PageBtn>() {
    PageSwitch(e) {
        switch (e.target.name) {
            case `BouKen`:
                BattlePage.instance.show();
                CharactorPage.instance.hide();
                ItemPage.instance.hide();
                break;
            case `Item`:
                BattlePage.instance.hide();
                CharactorPage.instance.hide();
                ItemPage.instance.show();
                break;
            case `Kyara`:
                BattlePage.instance.hide();
                CharactorPage.instance.show();
                ItemPage.instance.hide();
                break;
            case `Skill`:
                BattlePage.instance.hide();
                CharactorPage.instance.hide();
                ItemPage.instance.hide();
                break;
            case `Forge`:
                BattlePage.instance.hide();
                CharactorPage.instance.hide();
                ItemPage.instance.hide();
                break;
        }
    }
}
