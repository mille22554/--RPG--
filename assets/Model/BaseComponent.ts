import { _decorator, Component } from "cc";

const { ccclass, property } = _decorator;

@ccclass('BaseComponent')
export default class BaseComponent extends Component {
    inter: number;
    delayTime: number
    zIndex: number;
    constructor(...any: any) {
        super()

    }
    protected onLoad(): void {
        // this.setEvent(GameEvent.SetLanguage, this.setLanguage);
        // PublicData.getInstance.arr_BaseComponent.push(this);
        // if (this.getComponent(UIOpacity))
        //     this.getComponent(UIOpacity).opacity = 255
    }
    protected start(): void {
    }
    protected onDestroy() {
        // let getIndex = PublicData.getInstance.arr_BaseComponent.indexOf(this)
        // if (getIndex != -1)
        //     PublicData.getInstance.arr_BaseComponent.splice(getIndex, 1)
    }
    setZIndex() {
        this.node.setSiblingIndex(this.zIndex);
    }
    setLanguage() {
        // this.deletEvent(GameEvent.SetLanguage, this.setLanguage)
    }

    personalComputerInit() {
        // this.node.setPosition(Vec3.ZERO)
        // this.node.setScale(Vec3.ONE)
    }
    phoneInit() {
        this.node.setPosition(0, -130, 0)
        // this.node.setScale(PublicModel.getInstance.oneSclaeVec3(1.25))
    }
    protected update(dt: number): void {

    }
    setEvent(name: string, callback: any | Function) {
        // EventMng.getInstance.mapEvnet.get(NotificationType.Pulic).on(name, callback, this);
    }
    eventEmit(name: string, ...any: any[]) {
        // EventMng.getInstance.emit(NotificationType.Pulic, name, ...any);
    }
    deletEvent(name: string, callback: any | Function) {
        // EventMng.getInstance.mapEvnet.get(NotificationType.Pulic).off(name, callback, this);
    }
    show(...any: any[]): void {
        this.node.active = true
    }
    hide(): void {
        this.node.active = false
    }
    reProcessing(any: any) {

    }
    startDelay() {
        this.delayTime = 0
        this.inter = setInterval(() => {
            this.delayTime += 0.016
        }, 0.016)
    }
    stopDelay() {
        clearInterval(this.inter);
        return this.delayTime
    }
}

