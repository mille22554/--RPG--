export class ItemInfo {
    ID: number = -1;
    Type: string = ``;
    Name: string = ``;
    AD: number = 0;
    AP: number = 0;
    DEF: number = 0;
    MDF: number = 0;
    Dodge: number = 0;
    Critical: number = 0;
    Speed: number = 0;
    Lux: number = 0;
    Num: number = 0;
    Gold: number = 0;
    Durability: number = 0;
    HP: number = 0;
    MP: number = 0;
    Stamina: number = 0;
    isEquip: boolean = false;
    Text: string = ``;
}
export class ItemType {
    dropItem = new DropItem();
    equipment = new Equipment();
    useItem = new UseItem();
}
export class UserItem {
    userDropItem = new DropItem();
    userEquip: ItemInfo[] = [];
    userUseItem = new UseItem();
}
export class DropItem {
    史萊姆球 = new ItemInfo();
    火萊姆球 = new ItemInfo();
    冰萊姆球 = new ItemInfo();
    輕萊姆球 = new ItemInfo();
    固萊姆球 = new ItemInfo();
}
export class Equipment {
    //#region 武器
    短刀 = new ItemInfo();
    小圓盾 = new ItemInfo();
    大盾 = new ItemInfo();
    短杖 = new ItemInfo();
    長杖 = new ItemInfo();
    大劍 = new ItemInfo();
    長劍 = new ItemInfo();
    單手斧 = new ItemInfo();
    雙手斧 = new ItemInfo();
    單手棍 = new ItemInfo();
    刺劍 = new ItemInfo();
    長槍 = new ItemInfo();
    弓箭 = new ItemInfo();
    指虎 = new ItemInfo();
    //#endregion
    //#region 防具
    布甲 = new ItemInfo();
    護腿 = new ItemInfo();
    盔甲 = new ItemInfo();
    靴 = new ItemInfo();
    頭盔 = new ItemInfo();
    手甲 = new ItemInfo();
    //#endregion
    //#region 飾品
    手套 = new ItemInfo();
    項鍊 = new ItemInfo();
    戒指 = new ItemInfo();
    面具 = new ItemInfo();
    護目 = new ItemInfo();
    披風 = new ItemInfo();
    腰帶 = new ItemInfo();
    //#endregion
}
export class UseItem {
    HP藥水_小 = new ItemInfo();
    體力藥水_小 = new ItemInfo();
}
