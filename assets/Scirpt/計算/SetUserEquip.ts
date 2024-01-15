import { warn } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { ItemInfo } from "../DataBase/ItemInfo";
import PlayerEquip from "../DataBase/PlayerEquip";
import { PublicData } from "../DataBase/PublicData";
import { EquipmentName } from "../Enum/EquipmentName";
import Equipment from "../ItemPage/Equipment";

export class SetUserEquip extends BaseSingleton<SetUserEquip>() {
    item: Equipment;
    set(item) {
        this.item = item;
        if (this.item.Equip.string == `裝備`) {
            switch (item.info.Type) {
                case EquipmentName.E0:
                case EquipmentName.E3:
                case EquipmentName.E6:
                case EquipmentName.E7:
                case EquipmentName.E9:
                case EquipmentName.E13:
                    this.rightHand(item.info);
                    break;
                case EquipmentName.E1:
                    this.leftHand(item.info);
                    break;
                case EquipmentName.E2:
                case EquipmentName.E4:
                case EquipmentName.E5:
                case EquipmentName.E8:
                case EquipmentName.E10:
                case EquipmentName.E11:
                case EquipmentName.E12:
                    this.twoHand(item.info);
                    break;
                case EquipmentName.E14:
                    this.topCloth(item.info);
                    break;
                case EquipmentName.E15:
                    this.pants(item.info);
                    break;
                case EquipmentName.E16:
                    this.suit(item.info);
                    break;
                case EquipmentName.E17:
                    this.shoes(item.info);
                    break;
                case EquipmentName.E18:
                    this.head(item.info);
                    break;
                case EquipmentName.E19:
                    this.arm(item.info);
                    break;
                case EquipmentName.E20:
                    this.glove(item.info);
                    break;
                case EquipmentName.E21:
                    this.necklace(item.info);
                    break;
                case EquipmentName.E22:
                    this.ring(item.info);
                    break;
                case EquipmentName.E23:
                    this.mask(item.info);
                    break;
                case EquipmentName.E24:
                    this.eye(item.info);
                    break;
                case EquipmentName.E25:
                    this.cloak(item.info);
                    break;
                case EquipmentName.E26:
                    this.belt(item.info);
                    break;
            }
            this.item.Equip.string = `裝備中`;
        } else {
            switch (item.info.Type) {
                case EquipmentName.E0:
                case EquipmentName.E3:
                case EquipmentName.E6:
                case EquipmentName.E7:
                case EquipmentName.E9:
                case EquipmentName.E13:
                    PublicData.getInstance.playerEquip.rightHand =
                        new PlayerEquip().rightHand;
                    break;
                case EquipmentName.E1:
                    PublicData.getInstance.playerEquip.leftHand =
                        new PlayerEquip().leftHand;
                    break;
                case EquipmentName.E2:
                case EquipmentName.E4:
                case EquipmentName.E5:
                case EquipmentName.E8:
                case EquipmentName.E10:
                case EquipmentName.E11:
                case EquipmentName.E12:
                    PublicData.getInstance.playerEquip.rightHand =
                        new PlayerEquip().rightHand;
                    break;
                case EquipmentName.E14:
                    PublicData.getInstance.playerEquip.topCloth =
                        new PlayerEquip().topCloth;
                    break;
                case EquipmentName.E15:
                    PublicData.getInstance.playerEquip.pants =
                        new PlayerEquip().pants;
                    break;
                case EquipmentName.E16:
                    PublicData.getInstance.playerEquip.suit =
                        new PlayerEquip().suit;
                    break;
                case EquipmentName.E17:
                    PublicData.getInstance.playerEquip.shoes =
                        new PlayerEquip().shoes;
                    break;
                case EquipmentName.E18:
                    PublicData.getInstance.playerEquip.head =
                        new PlayerEquip().head;
                    break;
                case EquipmentName.E19:
                    PublicData.getInstance.playerEquip.arm =
                        new PlayerEquip().arm;
                    break;
                case EquipmentName.E20:
                    PublicData.getInstance.playerEquip.glove =
                        new PlayerEquip().glove;
                    break;
                case EquipmentName.E21:
                    PublicData.getInstance.playerEquip.necklace =
                        new PlayerEquip().necklace;
                    break;
                case EquipmentName.E22:
                    PublicData.getInstance.playerEquip.ring =
                        new PlayerEquip().ring;
                    break;
                case EquipmentName.E23:
                    PublicData.getInstance.playerEquip.mask =
                        new PlayerEquip().mask;
                    break;
                case EquipmentName.E24:
                    PublicData.getInstance.playerEquip.eye =
                        new PlayerEquip().eye;
                    break;
                case EquipmentName.E25:
                    PublicData.getInstance.playerEquip.cloak =
                        new PlayerEquip().cloak;
                    break;
                case EquipmentName.E26:
                    PublicData.getInstance.playerEquip.belt =
                        new PlayerEquip().belt;
                    break;
            }
            this.item.Equip.string = `裝備`;
        }
    }
    rightHand(info: ItemInfo) {
        if (PublicData.getInstance.userData.isTwoHand) {
            this.leftHand(info);
            return;
        }
        PublicData.getInstance.playerEquip.rightHand = info;
    }
    leftHand(info: ItemInfo) {
        PublicData.getInstance.playerEquip.leftHand = info;
    }
    twoHand(info: ItemInfo) {
        PublicData.getInstance.playerEquip.rightHand = info;
        PublicData.getInstance.playerEquip.leftHand = new ItemInfo();
    }
    topCloth(info: ItemInfo) {
        PublicData.getInstance.playerEquip.topCloth = info;
    }
    pants(info: ItemInfo) {
        PublicData.getInstance.playerEquip.pants = info;
    }
    suit(info: ItemInfo) {
        PublicData.getInstance.playerEquip.topCloth = info;
        PublicData.getInstance.playerEquip.pants = new ItemInfo();
    }
    head(info: ItemInfo) {
        PublicData.getInstance.playerEquip.head = info;
    }
    shoes(info: ItemInfo) {
        PublicData.getInstance.playerEquip.shoes = info;
    }
    arm(info: ItemInfo) {
        PublicData.getInstance.playerEquip.arm = info;
    }
    glove(info: ItemInfo) {
        PublicData.getInstance.playerEquip.glove = info;
    }
    necklace(info: ItemInfo) {
        PublicData.getInstance.playerEquip.necklace = info;
    }
    ring(info: ItemInfo) {
        for (let i = 0; i < 9; i++) {
            if (PublicData.getInstance.playerEquip.ring[i].Type == ``) {
                PublicData.getInstance.playerEquip.ring[i] = info;
                return;
            }
        }
        PublicData.getInstance.playerEquip.ring[9] = info;
    }
    mask(info: ItemInfo) {
        PublicData.getInstance.playerEquip.mask = info;
    }
    eye(info: ItemInfo) {
        PublicData.getInstance.playerEquip.eye = info;
    }
    cloak(info: ItemInfo) {
        PublicData.getInstance.playerEquip.cloak = info;
    }
    belt(info: ItemInfo) {
        PublicData.getInstance.playerEquip.belt = info;
    }
}
