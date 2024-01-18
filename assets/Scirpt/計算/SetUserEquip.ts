import { warn } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { EquipPart } from "../DataBase/EquipPart";
import { ItemInfo } from "../DataBase/ItemInfo";
import PlayerEquip from "../DataBase/PlayerEquip";
import { PublicData } from "../DataBase/PublicData";
import { UserEuqipInfo } from "../DataBase/UserData";
import { EquipPartEnum } from "../Enum/EquipPartEnum";
import { EquipmentType } from "../Enum/EquipmentType";
import Equipment from "../ItemPage/Equipment";

export class SetUserEquip extends BaseSingleton<SetUserEquip>() {
    item: Equipment;
    set(item) {
        warn(item.info);
        this.item = item;
        if (this.item.info.isEquip) {
            switch (item.info.Type) {
                case EquipmentType.E0:
                case EquipmentType.E3:
                case EquipmentType.E6:
                case EquipmentType.E7:
                case EquipmentType.E9:
                case EquipmentType.E13:
                    this.rightHand(item.info);
                    break;
                case EquipmentType.E1:
                    this.leftHand(item.info);
                    break;
                case EquipmentType.E2:
                case EquipmentType.E4:
                case EquipmentType.E5:
                case EquipmentType.E8:
                case EquipmentType.E10:
                case EquipmentType.E11:
                case EquipmentType.E12:
                    this.twoHand(item.info);
                    break;
                case EquipmentType.E14:
                    this.topCloth(item.info);
                    break;
                case EquipmentType.E15:
                    this.pants(item.info);
                    break;
                case EquipmentType.E16:
                    this.suit(item.info);
                    break;
                case EquipmentType.E17:
                    this.shoes(item.info);
                    break;
                case EquipmentType.E18:
                    this.head(item.info);
                    break;
                case EquipmentType.E19:
                    this.arm(item.info);
                    break;
                case EquipmentType.E20:
                    this.glove(item.info);
                    break;
                case EquipmentType.E21:
                    this.necklace(item.info);
                    break;
                case EquipmentType.E22:
                    this.ring(item.info);
                    break;
                case EquipmentType.E23:
                    this.mask(item.info);
                    break;
                case EquipmentType.E24:
                    this.eye(item.info);
                    break;
                case EquipmentType.E25:
                    this.cloak(item.info);
                    break;
                case EquipmentType.E26:
                    this.belt(item.info);
                    break;
            }
        } else {
            switch (item.info.Type) {
                case EquipmentType.E0:
                case EquipmentType.E3:
                case EquipmentType.E6:
                case EquipmentType.E7:
                case EquipmentType.E9:
                case EquipmentType.E13:
                    this.unEquipRightHand();
                    break;
                case EquipmentType.E1:
                    PublicData.getInstance.playerEquip.leftHand =
                        new PlayerEquip().leftHand;
                    break;
                case EquipmentType.E2:
                case EquipmentType.E4:
                case EquipmentType.E5:
                case EquipmentType.E8:
                case EquipmentType.E10:
                case EquipmentType.E11:
                case EquipmentType.E12:
                    PublicData.getInstance.playerEquip.rightHand =
                        new PlayerEquip().rightHand;
                    break;
                case EquipmentType.E14:
                    PublicData.getInstance.playerEquip.topCloth =
                        new PlayerEquip().topCloth;
                    break;
                case EquipmentType.E15:
                    PublicData.getInstance.playerEquip.pants =
                        new PlayerEquip().pants;
                    break;
                case EquipmentType.E16:
                    PublicData.getInstance.playerEquip.suit =
                        new PlayerEquip().suit;
                    break;
                case EquipmentType.E17:
                    PublicData.getInstance.playerEquip.shoes =
                        new PlayerEquip().shoes;
                    break;
                case EquipmentType.E18:
                    PublicData.getInstance.playerEquip.head =
                        new PlayerEquip().head;
                    break;
                case EquipmentType.E19:
                    PublicData.getInstance.playerEquip.arm =
                        new PlayerEquip().arm;
                    break;
                case EquipmentType.E20:
                    PublicData.getInstance.playerEquip.glove =
                        new PlayerEquip().glove;
                    break;
                case EquipmentType.E21:
                    PublicData.getInstance.playerEquip.necklace =
                        new PlayerEquip().necklace;
                    break;
                case EquipmentType.E22:
                    this.unEquipRing();
                    break;
                case EquipmentType.E23:
                    PublicData.getInstance.playerEquip.mask =
                        new PlayerEquip().mask;
                    break;
                case EquipmentType.E24:
                    PublicData.getInstance.playerEquip.eye =
                        new PlayerEquip().eye;
                    break;
                case EquipmentType.E25:
                    PublicData.getInstance.playerEquip.cloak =
                        new PlayerEquip().cloak;
                    break;
                case EquipmentType.E26:
                    PublicData.getInstance.playerEquip.belt =
                        new PlayerEquip().belt;
                    break;
            }
        }
        this.setUserEquipAllInfo();
    }
    setUserEquipAllInfo() {
        let info = new UserEuqipInfo();
        for (let part in new PlayerEquip())
            for (let ability in new UserEuqipInfo()) {
                if (part == `ring`)
                    for (let i of PublicData.getInstance.playerEquip[part])
                        info[ability] += i[ability];
                else
                    info[ability] +=
                        PublicData.getInstance.playerEquip[part][ability];
            }
        PublicData.getInstance.userEuqipInfo = info;
    }
    rightHand(info: ItemInfo) {
        if (
            PublicData.getInstance.userData.isTwoHand ||
            (info.Type == EquipmentType.E13 &&
                PublicData.getInstance.playerEquip.rightHand.ID != -1)
        ) {
            this.leftHand(info);
            return;
        }
        this.setIsEquip(EquipPartEnum.rightHand);
        PublicData.getInstance.playerEquip.rightHand = info;
    }
    leftHand(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.leftHand, null, EquipPartEnum.twoHand);
        PublicData.getInstance.playerEquip.leftHand = info;
    }
    twoHand(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.rightHand, EquipPartEnum.leftHand);
        PublicData.getInstance.playerEquip.rightHand = info;
        PublicData.getInstance.playerEquip.leftHand = new ItemInfo();
    }
    topCloth(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.topCloth);
        PublicData.getInstance.playerEquip.topCloth = info;
    }
    pants(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.pants, null, EquipPartEnum.suit);
        PublicData.getInstance.playerEquip.pants = info;
    }
    suit(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.topCloth, EquipPartEnum.pants);
        PublicData.getInstance.playerEquip.topCloth = info;
        PublicData.getInstance.playerEquip.pants = new ItemInfo();
    }
    head(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.head);
        PublicData.getInstance.playerEquip.head = info;
    }
    shoes(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.shoes);
        PublicData.getInstance.playerEquip.shoes = info;
    }
    arm(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.arm);
        PublicData.getInstance.playerEquip.arm = info;
    }
    glove(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.glove);
        PublicData.getInstance.playerEquip.glove = info;
    }
    necklace(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.necklace);
        PublicData.getInstance.playerEquip.necklace = info;
    }
    ring(info: ItemInfo) {
        for (let i = 0; i < 9; i++) {
            if (PublicData.getInstance.playerEquip.ring[i].Type == ``) {
                PublicData.getInstance.playerEquip.ring[i] = info;
                return;
            }
        }
        if (PublicData.getInstance.playerEquip.ring[9].ID != -1)
            PublicData.getInstance.userItem.userEquip[
                PublicData.getInstance.playerEquip.ring[9].ID
            ].isEquip = false;
        PublicData.getInstance.playerEquip.ring[9] = info;
    }
    mask(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.mask);
        PublicData.getInstance.playerEquip.mask = info;
    }
    eye(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.eye);
        PublicData.getInstance.playerEquip.eye = info;
    }
    cloak(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.cloak);
        PublicData.getInstance.playerEquip.cloak = info;
    }
    belt(info: ItemInfo) {
        this.setIsEquip(EquipPartEnum.belt);
        PublicData.getInstance.playerEquip.belt = info;
    }
    unEquipRing() {
        for (let i in PublicData.getInstance.playerEquip.ring)
            if (
                PublicData.getInstance.playerEquip.ring[i].ID ==
                this.item.info.ID
            )
                PublicData.getInstance.playerEquip.ring[i] = new ItemInfo();
    }
    unEquipRightHand() {
        if (this.item.info.Type == EquipmentType.E13)
            if (
                PublicData.getInstance.playerEquip.rightHand.ID ==
                this.item.info.ID
            )
                PublicData.getInstance.playerEquip.rightHand = new ItemInfo();
            else PublicData.getInstance.playerEquip.leftHand = new ItemInfo();
        else {
            PublicData.getInstance.playerEquip.rightHand =
                new PlayerEquip().rightHand;
        }
    }
    setIsEquip(mainType, subType?, thirdType?) {
        if (mainType == EquipPartEnum.ring) {
            if (PublicData.getInstance.playerEquip.ring[9].ID != -1)
                PublicData.getInstance.userItem.userEquip[
                    PublicData.getInstance.playerEquip.ring[9].ID
                ].isEquip = false;
        }
        if (PublicData.getInstance.playerEquip[mainType].ID != -1)
            PublicData.getInstance.userItem.userEquip[
                PublicData.getInstance.playerEquip[mainType].ID
            ].isEquip = false;

        if (subType)
            if (PublicData.getInstance.playerEquip[subType].ID != -1)
                PublicData.getInstance.userItem.userEquip[
                    PublicData.getInstance.playerEquip[subType].ID
                ].isEquip = false;

        if (thirdType == EquipPartEnum.twoHand)
            subType = EquipPartEnum.rightHand;
        else if (thirdType == EquipPartEnum.suit)
            subType = EquipPartEnum.topCloth;

        for (let type in EquipPart.getInstance[thirdType])
            if (
                PublicData.getInstance.playerEquip[subType].ID != -1 &&
                PublicData.getInstance.playerEquip[subType].Type == type
            )
                PublicData.getInstance.userItem.userEquip[
                    PublicData.getInstance.playerEquip[subType].ID
                ].isEquip = false;
    }
}
