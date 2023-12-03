import { _decorator, Component, sys, warn } from "cc";
import { Singleton } from "../Model/Singleton";
const { ccclass, property } = _decorator;

const coinKey: string = "gold";
const userDataKey = "userData";

interface UserData {
  name: string;
  level: number;
  gold: number;
}

@ccclass("SaveAndLoad")
export class SaveAndLoad extends Singleton<SaveAndLoad> {
  start() {
    this.saveCoin(100);
    this.loadCoin();
    // this.saveUserData();
    this.loadUserData();
  }

  saveCoin(value: number) {
    sys.localStorage.setItem(coinKey, value.toString());
  }
  loadCoin() {
    const value = sys.localStorage.getItem(coinKey);
    if (value) {
      console.log(`${coinKey} = ${value}`);
    } else {
      console.log(`${coinKey} is not exist`);
    }
  }

  saveUserData(data) {
    const userData = data;
    const jsonStr = JSON.stringify(userData);
    sys.localStorage.setItem(userDataKey, jsonStr);
  }

  loadUserData() {
    const jsonStr = sys.localStorage.getItem(userDataKey);
    const userData = JSON.parse(jsonStr) as UserData;
    warn(userData);
    return userData
  }
}
