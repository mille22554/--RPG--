import IBaseSingleton from "./IBaseSingleton";
import SingletManager from "./SingletonManger";

export default function BaseSingleton<T>() {
    class BaseSingleton implements IBaseSingleton {

        private static instance: any;

        public static get getInstance(): T {
            if (!(<any>this).instance) {
                (<any>this).instance = new (<any>this)();
                if ((<any>this).name != "SingletManager") {
                    SingletManager.instance.set((<any>this).instance);
                } else {
                    const singletManager = (<any>this).instance as SingletManager;
                    singletManager.set((<any>this).instance);
                }
            }
            return (<any>this).instance;
        }

        protected constructor() {
        }

        /**
         * 清除單例物件
         */
        public clear() {
            (<any>this)._instance = null;
        }
    }

    return BaseSingleton;
}
