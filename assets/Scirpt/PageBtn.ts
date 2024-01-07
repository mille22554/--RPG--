import { _decorator } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import CharactorPage from "./CharactorPage";
import BattlePage from "./BattlePage";

const { ccclass, property } = _decorator;
@ccclass("PageBtn")
export default class PageBtn extends BaseSingletonComponent<PageBtn>() {
    PageSwitch(e) {
        switch (e.target.name) {
            case `BouKen`:
                BattlePage.instance.show()
                CharactorPage.instance.hide();
                break;
            case `Item`:
                BattlePage.instance.hide()
                CharactorPage.instance.hide();
                break;
            case `Kyara`:
                BattlePage.instance.hide()
                CharactorPage.instance.show();
                break;
            case `Skill`:
                BattlePage.instance.hide()
                CharactorPage.instance.hide();
                break;
            case `Forge`:
                BattlePage.instance.hide()
                CharactorPage.instance.hide();
                break;
        }
    }
}
