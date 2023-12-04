import { js } from "cc";
import IBaseSingleton from "./IBaseSingleton";

/**
 * @Author 蕭立品
 * @Description 模板資源管理器
 * @Date 2021-12-17 下午 06:42
 * @Version 1.0
 */
export default class SingletManager {

    private static _instance: SingletManager;

    /**
     * 當前保存的所有單例物件
     * @type {Map<string, any>}
     * @private
     */
    private componentClass: Map<string, IBaseSingleton>;

    static get instance(): SingletManager {
        if (!this._instance) {
            this._instance = new SingletManager();
        }
        return this._instance;
    }


    private constructor() {
        this.componentClass = new Map<string, IBaseSingleton>();
    }

    /**
     *  添加單例
     * @param {any} self - 要加入單例的class
     */
    public set<T extends IBaseSingleton>(self: T) {
        // console.log(self.constructor.name);
        // console.log(js.getClassName(self));

        const name = js.getClassName(self);
        if (this.componentClass.has(name)) {
            return console.error("Adam", `：${name}`, "請勿重複實現單例");
        } else {
            this.componentClass.set(name, self);
        }
    }

    /**
     * 拿取單例
     * @param {string} name - 名稱
     * @return {IBaseSingleton}
     */
    public get<T extends IBaseSingleton>(name: string): T {
        if (!this.componentClass.has(name)) {
            console.error("Adam", "當前物件尚未添加進管理器中", name);
            return null;
        }
        return this.componentClass.get(name) as T;
    }

    /**
     * 獲取全部綁定單例的單例CLASS
     * @return {Map<string, any>}
     */
    getAll() {
        return this.componentClass;
    }

    /**
     * 清除所有
     */
    deleteAll() {
        for (let singleton of this.componentClass.values()) {
            singleton.clear();
        }
        this.componentClass = null;
    }

    /**
     * 清除單一
     * @param name
     */
    delete(name: any): void {
        if (this.componentClass.has(name)) {
            this.componentClass.get(name).clear();
            this.componentClass.delete(name);
        } else {
            // console.warn("查找不到該物件,無須清除");
        }
    }
}
