import BaseSingleton from "../../Model/Singleton/BaseSingleton";
import { PublicData } from "../DataBase/PublicData";
import { SaveAndLoad } from "../DataBase/SaveAndLoad";
import { UserData } from "../DataBase/UserData";

export class SetUserInfo extends BaseSingleton<SetUserInfo>() {
    setUserInfo() {
        let data = PublicData.getInstance.userData,
            extra = PublicData.getInstance.userExtra;

        data.AD = 2 * (data.Str + extra.Str);
        data.AP = 2 * (data.Int + extra.Int);
        data.DEF = Math.floor((data.Vit + extra.Vit) / 2);
        data.MDF = Math.floor((data.Int + extra.Int) / 2);
        data.Speed = (data.Dex + extra.Dex) * 4 + (data.Agi + extra.Agi);
        data.Dodge =
            ((data.Agi + extra.Agi) * 0.25 +
                (data.Dex + extra.Dex) * 0.2 +
                (data.Lux + extra.Lux) * 0.05) /
            100;
        data.Critical =
            ((data.Agi + extra.Agi) * 0.3 +
                (data.Dex + extra.Dex) * 0.15 +
                (data.Lux + extra.Lux) * 0.05) /
            100;
        data.Lucky = ((data.Lux + extra.Lux) * 0.5) / 100;

        SaveAndLoad.getInstance.saveUserData(data, extra);
        PublicData.getInstance.userData = data;
    }
    LevelUP(data: UserData, exp, MaxExp) {
        data.Level += 1;
        data.Str += 1;
        data.Vit += 1;
        data.Dex += 1;
        data.Agi += 1;
        data.Int += 1;
        data.Lux += 1;

        let stamina = Number(data.Stamina.split(`/`)[0]) + 10,
            maxStamina = Number(data.Stamina.split(`/`)[1]) + 10,
            HP = Number(data.HP.split(`/`)[0]) + data.Vit + data.Level * 10,
            maxHP = Number(data.HP.split(`/`)[1]) + data.Vit + data.Level * 10,
            MP = Number(data.MP.split(`/`)[0]) + data.Level * 5 + data.Int,
            maxMP = Number(data.MP.split(`/`)[1]) + data.Level * 5 + data.Int;

        data.Stamina = `${stamina}/${maxStamina}`;
        data.HP = `${HP}/${maxHP}`;
        data.MP = `${MP}/${maxMP}`;
        data.Point += 6;
        exp -= MaxExp;
        MaxExp += data.Level * 20;
        data.Exp = `${exp}/${MaxExp}`;
        return data;
    }
}
