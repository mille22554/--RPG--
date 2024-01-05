import {
    _decorator,
    Component,
    EditBox,
    Label,
    Node,
    randomRangeInt,
    resources,
    warn,
} from "cc";
import { SaveAndLoad } from "./SaveAndLoad";
import CharactorPage from "./CharactorPage";
import BattlePage from "./BattlePage";
const { ccclass, property } = _decorator;
@ccclass("Main")
export class Main extends Component {
    test() {
        let SL = SaveAndLoad.getInstance,
            data = SL.loadUserData();
        data.Exp = Number(data.Exp) + 1;
        if (data.Exp >= data.Level * 10) {
            data.Level += 1;
            data.Exp = 0;
        }
        SL.saveUserData(data);
        CharactorPage.instance.UserDataLoad();
    }
    BattleTest() {
        let SL = SaveAndLoad.getInstance,
            data = SL.loadUserData();
        BattlePage.instance.playerData = data;
        BattlePage.instance.mobLevel = randomRangeInt(
            1,
            Number(data.Level) + 1
        );
        BattlePage.instance.mobHP = BattlePage.instance.mobLevel * 10;
        BattlePage.instance.speedValue =
            ((Number(data.Dex) * 2 + Number(data.Agi)) *
                ((BattlePage.instance.mobLevel * 2 - 1) * 3)) /
            10;
        BattlePage.instance.mobName = `史萊姆`;
        BattlePage.instance.mobInfo.string = `${BattlePage.instance.mobName}:Level ${BattlePage.instance.mobLevel} HP ${BattlePage.instance.mobHP}`;
        BattlePage.instance.isBattle = true;
    }
}
