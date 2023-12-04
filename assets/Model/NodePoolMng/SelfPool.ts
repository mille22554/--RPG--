
import { Node, Tween, warn } from "cc";
import { CCNodePool } from "./CCNodePool";
import { IPool } from "./IPool";

export class SelfPool implements IPool {

    private list: Node[] = []

    private readonly pool: CCNodePool;

    constructor(pool: CCNodePool) {
        this.pool = pool;
    }

    get(): Node {
        return this.list.length > 0 ? this.list.shift() : this.pool.get();
    }

    getPool(): CCNodePool {
        return this.pool
    }

    size(): number {
        return this.pool.size() + this.list.length;
    }

    /**
     * 將物件返回對象池中
     * @param node
     * @param nodePool 是否放入NodePool中
     */
    put(node: Node, nodePool: boolean = false): void {
        if (nodePool) {
            this.pool.put(node)
        } else {
            this.list.push(node);
            Tween.stopAllByTarget(node)
            node.active = false;
        }
    }

    clear(): void {
        this.pool.clear();
        this.list.length = 0;
    }
}
