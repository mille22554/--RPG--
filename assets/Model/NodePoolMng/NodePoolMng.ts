import { Node, Prefab, warn } from "cc";
import { CCNodePool } from "./CCNodePool";
import { SelfPool } from "./SelfPool";
import BaseSingleton from "../Singleton/BaseSingleton";

/**
 * @Author 蕭立品
 * @Description 緩存池管理器
 * @Date 2021-10-29 下午 02:28
 * @Version 1.0
 * https://github.com/a0979225002/GameFramework/tree/e0a84930d4431433252ca84584c295c833fc6197
 */
export class NodePoolManager extends BaseSingleton<NodePoolManager>() {


    /**
     * 對象池表
     * @type {Map<string, SelfPool>}
     * @private
     */
    private pools: Map<string, SelfPool> = new Map<string, SelfPool>();

    /**
     * 保存node物件name名,使清除物件時,可透過該node物件的name名,查找對應的pool池的key
     * @type {Map<Node, string>}
     * @private
     */
    private nameMap: Map<Node, string> = new Map<Node, string>();

    /**
     * 初始該物件保存至緩存池中
     * @param {string} name 自訂物件名稱
     * @param {Prefab | Node} nodeOrPrefab - 要建立的物件
     * @param {number} count - 數量
     */
    init(name: string, nodeOrPrefab: Prefab | Node, count: number) {
        if (!this.pools.has(name)) {
            this.pools.set(name, new SelfPool(new CCNodePool(name, nodeOrPrefab, count)));
        }
    }

    /**
     * 獲取該緩存池
     * @param {string} key
     * @return {CCNodePool}
     */
    getPool(key: string): CCNodePool {
        return this.pools.get(key).getPool();
    }

    /**
     * 獲取緩存池內物件
     * @param {string} key - 當初自訂義名稱
     * @return {Node}
     */
    get(key: string): Node {
        if (this.pools.has(key)) {
            let node: Node = this.pools.get(key).get();
            if (!this.nameMap.has(node) && node.name != key) {
                this.nameMap.set(node, key);
                // warn("設" + key)
            }
            return node;
        }
        // warn("沒設" + key)
        return null;
    }

    /**
     * 回收進對象池
     * @param {Node} node - 要回收的物件
     * @param {boolean} nodePool - 是否要回收進對象池
     */
    put(node: Node, nodePool: boolean): void {
        // warn("放" + node.name)
        let key = this.nameMap.get(node);
        if (!this.pools.has(key)) {
            warn(" not have name ", key, ' ,go.name ', node.name);
            return;
        }
        this.pools.get(key).put(node, nodePool);
        this.nameMap.delete(node);
    }

    /**
     * 清除該對象池內所有物件
     * @param {string} name
     */
    clearTarget(name: string) {
        if (this.pools.has(name)) {
            this.pools.get(name).clear();
            this.pools.delete(name);
        }
    }

    /**
     * 清除所有緩存池內所有物件
     */
    clearAll() {
        for (const key in this.pools) {
            this.clearTarget(key);
        }
        this.pools.clear();
    }
}
