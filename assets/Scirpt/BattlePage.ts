import { Button, Label, _decorator, randomRange, warn } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import CharactorPage from "./CharactorPage";
import { SaveAndLoad, UserData } from "./SaveAndLoad";

const { ccclass, property } = _decorator;
@ccclass("BattlePage")
export default class BattlePage extends BaseSingletonComponent<BattlePage>() {
    @property(Label)
    mobInfo: Label;
    @property(Button)
    btnAttack: Button;
    mobName: string;
    mobHP: number = 100;
    mobLevel: number = 1;
    speedValue: number = 0;
    playerSpeed: number = 0;
    mobSpeed: number = 0;
    playerData: UserData;
    isBattle: boolean;
    protected onLoad(): void {
        super.onLoad();
    }
    attackMob() {
        warn(this.playerSpeed, this.mobSpeed);
        this.playerSpeed = 0;
        this.playerData = SaveAndLoad.getInstance.loadUserData();
        let prop =
            (Number(this.playerData.Agi) * 3 +
                Number(this.playerData.Dex) * 2 +
                Number(this.playerData.Lux)) /
            ((this.mobLevel * 2 - 1) * 6 * 2);
        if (prop >= 1 || randomRange(0, 1) < prop)
            this.mobHP =
                this.mobHP -
                (Number(this.playerData.Str) * 2) /
                    Math.ceil(this.playerData.Level / 2) -
                (this.mobLevel * 2 - 1) / Math.ceil(this.mobLevel / 2);
        this.mobInfo.string = `${this.mobName}:Level ${this.mobLevel} HP ${this.mobHP}`;
        if (this.mobHP <= 0) {
            this.playerData.Exp = Number(this.playerData.Exp) + this.mobLevel;
            if (this.playerData.Exp >= this.playerData.Level * 10) {
                this.playerData.Exp -= this.playerData.Level * 10;
                this.playerData.Level += 1;
            }
            SaveAndLoad.getInstance.saveUserData(this.playerData);
            CharactorPage.instance.UserDataLoad();
            this.isBattle = false;
            this.btnAttack.node.active = false;
        }
    }
    mobAttack() {
        warn(`被扁`);
        this.playerData = SaveAndLoad.getInstance.loadUserData();
        let prop =
            ((this.mobLevel * 2 - 1) * 6) /
            ((Number(this.playerData.Agi) * 3 +
                Number(this.playerData.Dex) * 2 +
                Number(this.playerData.Lux)) *
                2);
        if (prop >= 1 || randomRange(0, 1) < prop)
            this.playerData.HP = (
                Number(this.playerData.HP) -
                ((this.mobLevel * 2 - 1) * 2) / Math.ceil(this.mobLevel / 2) -
                Number(this.playerData.Vit) /
                    Math.ceil(this.playerData.Level / 2)
            ).toString();
        SaveAndLoad.getInstance.saveUserData(this.playerData);
        CharactorPage.instance.UserDataLoad();
        if (Number(this.playerData.HP) <= 0) {
            this.isBattle = false;
            this.btnAttack.node.active = false;
        }
    }
    speedCounter(dt: number) {
        if (
            this.playerSpeed < this.speedValue &&
            this.mobSpeed < this.speedValue
        ) {
            this.btnAttack.node.active = false;
            this.playerSpeed =
                this.playerSpeed +
                dt *
                    (Number(this.playerData.Dex) * 2 +
                        Number(this.playerData.Agi));
            this.mobSpeed = this.mobSpeed + dt * ((this.mobLevel * 2 - 1) * 3);
        } else if (this.mobSpeed >= this.speedValue) {
            this.mobSpeed = 0;
            this.mobAttack();
        } else this.btnAttack.node.active = true;
    }
    protected update(dt: number): void {
        if (this.isBattle) this.speedCounter(dt);
    }
}
