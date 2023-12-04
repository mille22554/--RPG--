import {
  _decorator,
  Component,
  EditBox,
  Label,
  Node,
  resources,
  warn,
} from "cc";
import { SaveAndLoad } from "./SaveAndLoad";
import { CharactorPage } from "./CharactorPage";
const { ccclass, property } = _decorator;
@ccclass("Main")
export class Main extends Component {
  test() {
    let SL = SaveAndLoad.getInstance,
      data = SL.loadUserData();
    data.exp += 1;
    if (data.exp >= data.level * 10) {
      data.level += 1;
      data.exp = 0;
    }
    SL.saveUserData(data);
    CharactorPage.getInstance.UserDataLoad();
  }
}
