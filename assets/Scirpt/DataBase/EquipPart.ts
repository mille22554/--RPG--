import BaseSingleton from "../../Model/Singleton/BaseSingleton";

export class EquipPart extends BaseSingleton<EquipPart>() {
    suit = new suit();
    rightHand = new rightHand();
    twoHand = new twoHand();
}
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
class twoHand {
    大盾;
    長杖;
    大劍;
    雙手斧;
    雙手棍;
    長槍;
    弓箭;
}
