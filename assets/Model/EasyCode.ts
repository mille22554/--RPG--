import { Node, Size, UITransform, error } from "cc";
import { NodePoolManager } from "./NodePoolMng/NodePoolMng";
import BaseSingleton from "./Singleton/BaseSingleton"

export default class EasyCode extends BaseSingleton<EasyCode>() {
    /**NodePoolManager.getInstance */
    nameMap: Map<string, Node> = new Map()
    /**有沒有從池裡拿 */
    isGet: boolean

    // /**
    //  * 
    //  * @param node 要掛autoFollow的物件
    //  * @param content 掛好autoFollow的物件要移到底下的物件
    //  * @returns 
    //  */
    // autoFollow(node: Node, content: Node) {
    //     if (node.getComponent(AutoFollow) == null)
    //         node.addComponent(AutoFollow).createNewTarget();
    //     node.parent = content
    // }
    /**
     * 
     * @param conNode 要設定的conNode
     * @param parent conNode要掛到底下的物件
     * @returns 
     */
    setConNode(conNode: Node, parent: Node) {
        try {
            conNode.getComponent(UITransform).setContentSize(new Size(0, 0))
            parent.addChild(conNode)
        }
        catch (e) {
            error(e)
        }
        return
    }
    /**
     * 用於紀錄重複生成的物件，會回傳keycount+1
     * @param keyname 自訂namemap索引詞綴
     * @param node 要索引的物件
     * @param keyCount 索引計數用
     * @returns 
     */
    getFromPool(keyname: string) {
        // warn(`test:${keyname},${keyCount}`)
        let i: number = 0, node = NodePoolManager.getInstance.get(keyname)
        for (i = 0; this.nameMap.has(keyname + i.toString()); i++);
        this.nameMap.set(keyname + i.toString(), node)
        return node
    }
    /**
     * 將nameMap中詞綴內帶有keyname的物件都放進池內
     * @param keyname namemap索引詞綴
     */
    putInPool(keyname: string, eventName?: string) {
        for (let i of this.nameMap.keys()) {
            if (i.includes(keyname)) {
                // warn(`回收${i}`)
                // if (eventName)
                //     this.nameMap.get(i).off(eventName, normalLisner.onLevelRoomChoice, normalLisner);
                NodePoolManager.getInstance.put(this.nameMap.get(i), true)
                this.nameMap.delete(i)
            }
        }
    }
}
export enum EasyString {
    IOR = "itemOwnerRoom",
    ILP = "itemLimitPage"
}