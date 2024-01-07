import { Label, Layout, Node, Prefab, ScrollView, UITransform, _decorator } from "cc";
import BaseSingletonComponent from "../Model/Singleton/BaseSingletonComponent";
import { NodePoolManager } from "../Model/NodePoolMng/NodePoolMng";
import EasyCode from "../Model/EasyCode";

const { ccclass, property } = _decorator;
@ccclass("PanelLog")
export default class PanelLog extends BaseSingletonComponent<PanelLog>() {
    @property(Prefab)
    logItem: Prefab;
    @property(Node)
    content: Node;
    @property(ScrollView)
    scrollView: ScrollView;
    protected onLoad(): void {
        super.onLoad();
        NodePoolManager.getInstance.init(`logItem`, this.logItem, 1);
    }
    addLog(log: string) {
        let item = EasyCode.getInstance
            .getFromPool(`logItem`)
            .getComponent(Label);
        item.node.parent = this.content;
        item.string = log;
        this.content.getComponent(Layout).updateLayout()
        if (this.content.getComponent(UITransform).contentSize.height > 740)
            this.scrollView.scrollToBottom();
    }
}
