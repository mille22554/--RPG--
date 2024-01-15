import { _decorator } from "cc";
import { ItemInfo } from "./ItemInfo";

const { ccclass, property } = _decorator;
@ccclass("PlayerEquip")
export default class PlayerEquip {
    head = new ItemInfo();
    topCloth = new ItemInfo();
    pants = new ItemInfo();
    suit = new ItemInfo();
    rightHand = new ItemInfo();
    leftHand = new ItemInfo();
    shoes = new ItemInfo();
    arm = new ItemInfo();
    glove = new ItemInfo();
    necklace = new ItemInfo();
    ring = [new ItemInfo()];
    mask = new ItemInfo();
    eye = new ItemInfo();
    cloak = new ItemInfo();
    belt = new ItemInfo();
}
