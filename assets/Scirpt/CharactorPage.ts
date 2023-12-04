import { _decorator, Component, EditBox, find, Label, Node, warn } from "cc";
import { SaveAndLoad } from "./SaveAndLoad";
import BaseSingleton from "../Model/Singleton/BaseSingleton";
const { ccclass, property } = _decorator;

@ccclass("CharactorPage")
export class CharactorPage extends BaseSingleton<CharactorPage>() {
  @property(Label)
  labelUserName: Label;
  @property(Label)
  labelUserLevel: Label;
  @property(Label)
  labelUserGold: Label;
  @property(Label)
  labelUserExp: Label;
  @property(Label)
  labelName: Label;
  @property(Label)
  labelLevel: Label;
  @property(Label)
  labelGold: Label;
  @property(Label)
  labelStr: Label;
  @property(Label)
  labelVit: Label;
  @property(Label)
  labelDex: Label;
  @property(Label)
  labelInt: Label;
  @property(Label)
  labelAgi: Label;
  @property(Label)
  labelLux: Label;

  ebn: EditBox;

  protected onLoad(): void {
    this.UserDataLoad();
  }

  btnSave() {
    let userData = {
      name: this.labelUserName.string ? this.labelUserName.string : `Kirito`,
      level: this.labelUserLevel.string
        ? Number(this.labelUserLevel.string) < 1
          ? 1
          : this.labelUserLevel.string
        : 1,
      gold: this.labelUserGold.string
        ? Number(this.labelUserGold.string) < 0
          ? 0
          : this.labelUserGold.string
        : 0,
      exp: this.labelUserExp.string,
      str: this.labelStr.string
        ? Number(this.labelStr.string) < 0
          ? 0
          : this.labelStr.string
        : 0,
      vit: this.labelVit.string
        ? Number(this.labelVit.string) < 0
          ? 0
          : this.labelVit.string
        : 0,
      dex: this.labelDex.string
        ? Number(this.labelDex.string) < 0
          ? 0
          : this.labelDex.string
        : 0,
      int: this.labelInt.string
        ? Number(this.labelInt.string) < 0
          ? 0
          : this.labelInt.string
        : 0,
      agi: this.labelAgi.string
        ? Number(this.labelAgi.string) < 0
          ? 0
          : this.labelAgi.string
        : 0,
      lux: this.labelLux.string
        ? Number(this.labelLux.string) < 0
          ? 0
          : this.labelLux.string
        : 0,
    };
    SaveAndLoad.getInstance.saveUserData(userData);
    this.UserDataLoad();
  }
  UserDataLoad() {
    let data = SaveAndLoad.getInstance.loadUserData(),
      exp: string,
      conLabel = {
        name: this.labelUserName,
        level: this.labelUserLevel,
        gold: this.labelUserGold,
        exp: exp,
        str: this.labelStr,
        vit: this.labelVit,
        dex: this.labelDex,
        int: this.labelInt,
        agi: this.labelAgi,
        lux: this.labelLux,
      };
    for (let i in data) {
      warn(i);
      try {
        conLabel[i].string = data[i];
      } catch {
        exp = data[i];
      }
    }
    if (!exp) exp = `0`;
    this.labelUserExp.string = `${exp}/${data.level * 10}`;
  }
}
