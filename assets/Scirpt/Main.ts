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
const { ccclass, property } = _decorator;
@ccclass("Main")
export class Main extends Component {
  @property(EditBox)
  editBoxName: EditBox;
  @property(EditBox)
  editBoxLevel: EditBox;
  @property(EditBox)
  editBoxgold: EditBox;
  @property(Label)
  labelName: Label;
  @property(Label)
  labelLevel: Label;
  @property(Label)
  labelGold: Label;

  protected onLoad(): void {
    this.UserDataLoad();
  }
  btnSave() {
    let userData = {
      name: this.editBoxName.string
        ? this.editBoxName.string
        : this.editBoxName.placeholderLabel.string,
      level: this.editBoxLevel.string
        ? Number(this.editBoxLevel.string) < 1
          ? 1
          : this.editBoxLevel.string
        : this.editBoxLevel.placeholderLabel.string
        ? this.editBoxLevel.placeholderLabel.string
        : 1,
      gold: this.editBoxgold.string
        ? Number(this.editBoxgold.string) < 0
          ? 0
          : this.editBoxgold.string
        : this.editBoxgold.placeholderLabel.string
        ? this.editBoxgold.placeholderLabel.string
        : 0,
    };
    SaveAndLoad.GetInstance(SaveAndLoad).saveUserData(userData);
    this.UserDataLoad();
  }
  UserDataLoad() {
    let data = SaveAndLoad.GetInstance(SaveAndLoad).loadUserData();
    this.editBoxName.placeholderLabel.string = data.name;
    this.editBoxLevel.placeholderLabel.string = data.level.toString();
    this.editBoxgold.placeholderLabel.string = data.gold.toString();
  }
}
