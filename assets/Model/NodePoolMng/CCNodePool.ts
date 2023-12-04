
import { instantiate, Node, NodePool, Prefab, warn } from "cc";
import { IPool } from "./IPool";
export class CCNodePool implements IPool {

    private pool: NodePool;

    private readonly prefab: Prefab | Node;

    private readonly name: string;

    /**
     *
     * @param {string} name
     * @param {Prefab | Node} nodeOrPrefab - 要建立的物件
     * @param {number} count 初始化個數
     */
    constructor(name: string, nodeOrPrefab: Prefab | Node, count: number) {
        this.name = name
        this.pool = new NodePool();
        this.prefab = nodeOrPrefab;
        for (let i = 0; i < count; i++) {
            let obj: Node = this.getNode() as Node;
            this.pool.put(obj);
        }
    }

    getName() {
        return this.name
    }

    get(): Node {
        // warn(`有從${this.getName()}拿嗎${this.pool.size() > 0}`)
        return this.pool.size() > 0 ? this.pool.get() : this.getNode() as Node;
    }

    getNode() {
        if (this.prefab) {
            return instantiate<Node | Prefab>(this.prefab);
        } else {
            console.error(' 預製體沒有賦值 ')
            return null;
        }
    }

    size() {
        return this.pool.size();
    }

    put(node: Node) {
        this.pool.put(node);
    }

    clear() {
        this.pool.clear();
    }

}
