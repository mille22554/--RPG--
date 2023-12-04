import { Node } from "cc";

export interface IPool {

    /**
     * 獲取緩存池內物件
     * @return {Node}
     */
    get(): Node;

    /**
     * 獲取該對象池內物件大小
     * @return {number}
     */
    size(): number;

    /**
     * 將物件返回對象池中
     * @param node - 要返回的物件
     * @param nodePool 是否放入NodePool中
     */
    put(node: Node, nodePool?: boolean);

    clear(): void;
}