export class ItemInfo {
    ID: number = 0;
    Name: string = ``;
    AD: number = 0;
    AP: number = 0;
    DEF: number = 0;
    MDF: number = 0;
    Dodge: number = 0;
    Critical: number = 0;
    Speed: number = 0;
    Lucky: number = 0;
    Num: number = 0;
    Gold: number = 0;
}
export class ItemType {
    dropItem = new DropItem();
}
export class DropItem {
    史萊姆球 = new ItemInfo();
    火萊姆球 = new ItemInfo();
    冰萊姆球 = new ItemInfo();
    輕萊姆球 = new ItemInfo();
    固萊姆球 = new ItemInfo();
}
