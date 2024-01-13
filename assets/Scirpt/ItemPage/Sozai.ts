import { Label, _decorator } from "cc";
import BaseComponent from "../../Model/BaseComponent";

const { ccclass, property } = _decorator;
@ccclass("DropItem")
export default class Sozai extends BaseComponent {
    @property(Label)
    Name: Label;
    @property(Label)
    Num: Label;
}
