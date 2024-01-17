import BaseSingleton from "../../Model/Singleton/BaseSingleton";

export class EquipPart extends BaseSingleton<EquipPart>() {
    topCloth = new topCloth();
    pants = new pants();
    suit = new suit();
    rightHand = new rightHand();
    leftHand = new leftHand();
    twoHand = new twoHand();
    ring = new ring();
}
class topCloth {}
class pants {}
class suit {}
class rightHand {
    短刀;
    大盾;
    短杖;
    長杖;
    大劍;
    長劍;
    單手斧;
    雙手斧;
    單手棍;
    雙手棍;
    長槍;
    弓箭;
    指虎;
}
class leftHand {
    小圓盾;
}
class ring {
    盔甲;
}
class twoHand {
    大盾;
    長杖;
    大劍;
    雙手斧;
    雙手棍;
    長槍;
    弓箭;
}
