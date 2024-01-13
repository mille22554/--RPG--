import { Color } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";

export class MyColor extends BaseSingleton<MyColor>() {
    purple = new Color().fromHEX(`#8600FF`);
    orange = new Color().fromHEX(`#F28500`);
}
