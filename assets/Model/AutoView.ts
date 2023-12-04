
import { Component, find, ResolutionPolicy, Size, UITransform, view, _decorator } from 'cc';
// import DelayTime from '../../../Plug/DelayTime';
// import PublicData from '../../Model/PublicData';
const { ccclass, property } = _decorator;
@ccclass('AutoView')
export default class AutoView extends Component {
    public curDR: Size = null;

    isCanUpdata: boolean = true
    BaseViewWidth: number = 720
    BaseViewHeight: number = 1280
    start() {
        console.log(find("AutoView"));

        // if (sys.os == sys.OS.ANDROID) return
        this.AdjustView();
        window.addEventListener("resize", (async () => {
            if (this.isCanUpdata) {
                this.isCanUpdata = false
                await this.StartDT_NotClear(.5)
                this.AdjustView()
                this.isCanUpdata = true
            }
            else {
                console.error("等待刷新......");
            }
        }))
        // view.on('canvas-resize', this.resize, this);
        // director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.AdjustView, this);
    }
    public AdjustView() {
        // console.log(view.getDesignResolutionSize().height);
        // console.log(view.getDesignResolutionSize().x);

        let canvasSize = this.getWinSize();
        if (!this.curDR)
            this.curDR = view.getDesignResolutionSize();
        console.log(canvasSize);

        let cvs = find('Canvas').getComponent(UITransform);
        if (canvasSize.width >= this.BaseViewWidth || canvasSize.height / canvasSize.width <= (this.BaseViewHeight / this.BaseViewWidth)) {
            var width = canvasSize.width * (this.BaseViewHeight / canvasSize.height);
            view.setDesignResolutionSize(width, this.BaseViewHeight, ResolutionPolicy.FIXED_HEIGHT);
            // console.log(width);

            // cvs.width = width;
            // cvs.height = 1280;

        }
        else {
            var height = canvasSize.height * (this.BaseViewWidth / canvasSize.width);
            // if (height > this.BaseViewHeight)
            //     height = this.BaseViewHeight

            view.setDesignResolutionSize(this.BaseViewWidth, height, ResolutionPolicy.FIXED_HEIGHT)

        }
        let str: string = `window寬:${canvasSize.width}\n\rwindow高:${canvasSize.height}\n\rcocos寬:${this.curDR.width}\n\rcocos高:${this.curDR.height}`
        // find("資訊", cvs.node).getComponent(Label).string = str;

        // if (canvasSize.height / canvasSize.width <= 16 / 9) {

        // } else {

        //     // if (canvasSize.height / canvasSize.width > 16 / 9 && canvasSize.height / canvasSize.width <= 19.5 / 9) {

        //     //     view.setDesignResolutionSize(720, 1500, ResolutionPolicy.FIXED_WIDTH)
        //     // } else {

        //     //     view.setDesignResolutionSize(720, 1500, ResolutionPolicy.FIXED_HEIGHT)
        //     // }
        //     cvs.width = 720;
        //     cvs.height = 1500;
        // }




        // console.error("HIHI");
        // if ((screen.windowSize.width) >= (720) || (screen.windowSize.height / screen.windowSize.width) <= (1280 / 720)) {
        //     //宽度超出
        //     var width = screen.windowSize.width * (1280 / screen.windowSize.height);
        //     view.setDesignResolutionSize(width, 1280, ResolutionPolicy.FIXED_HEIGHT);
        // } else {
        //     //高度超出
        //     var height = screen.windowSize.height * (720 / screen.windowSize.width);
        //     view.setDesignResolutionSize(720, height, ResolutionPolicy.FIXED_WIDTH);
        // }
    }

    public AdjustView_Old() {

        let canvasSize = this.getWinSize();
        if (!this.curDR)
            this.curDR = view.getDesignResolutionSize();
        // console.log(canvasSize);

        let cvs = find('Canvas').getComponent(UITransform);
        if (canvasSize.width >= 720 || canvasSize.height / canvasSize.width <= (1280 / 720)) {
            var width = canvasSize.width * (1280 / canvasSize.height);
            view.setDesignResolutionSize(width, 1280, ResolutionPolicy.FIXED_HEIGHT);
            // console.log(width);

            // cvs.width = width;
            // cvs.height = 1280;
        }
        else {
            var height = canvasSize.height * (720 / canvasSize.width);
            view.setDesignResolutionSize(720, height, ResolutionPolicy.FIXED_HEIGHT)
            // console.log(height);
            // cvs.width = 720;
            // cvs.height = height;
        }
        let str: string = `window寬:${canvasSize.width}\n\rwindow高:${canvasSize.height}\n\rcocos寬:${this.curDR.width}\n\rcocos高:${this.curDR.height}`
        // find("資訊", cvs.node).getComponent(Label).string = str;

        // if (canvasSize.height / canvasSize.width <= 16 / 9) {

        // } else {

        //     // if (canvasSize.height / canvasSize.width > 16 / 9 && canvasSize.height / canvasSize.width <= 19.5 / 9) {

        //     //     view.setDesignResolutionSize(720, 1500, ResolutionPolicy.FIXED_WIDTH)
        //     // } else {

        //     //     view.setDesignResolutionSize(720, 1500, ResolutionPolicy.FIXED_HEIGHT)
        //     // }
        //     cvs.width = 720;
        //     cvs.height = 1500;
        // }




        // console.error("HIHI");
        // if ((screen.windowSize.width) >= (720) || (screen.windowSize.height / screen.windowSize.width) <= (1280 / 720)) {
        //     //宽度超出
        //     var width = screen.windowSize.width * (1280 / screen.windowSize.height);
        //     view.setDesignResolutionSize(width, 1280, ResolutionPolicy.FIXED_HEIGHT);
        // } else {
        //     //高度超出
        //     var height = screen.windowSize.height * (720 / screen.windowSize.width);
        //     view.setDesignResolutionSize(720, height, ResolutionPolicy.FIXED_WIDTH);
        // }
    }
    // debounce(func: Function) {
    //     let timer;
    //     return function (event) {
    //         if (timer) clearTimeout(timer);
    //         timer = setTimeout(func, 300, event);
    //     };
    // }
    public resize() {
        //根据屏幕大小决定适配策略
        //想明白原理，请阅读本文 https://blog.csdn.net/qq_36720848/article/details/89742451
        let cvs = find('Canvas').getComponent(UITransform);
        if (!this.curDR)
            this.curDR = view.getDesignResolutionSize();


        // console.log(screen);

        var s = view.getFrameSize()
        // console.log(dr);
        // console.log(s);


        var rw = s.width;
        var rh = s.height;
        var finalW = rw;
        var finalH = rh;

        if ((rw / rh) > (this.curDR.width / this.curDR.height)) {
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            //cvs.fitHeight = true;

            //如果更长，则用定高
            finalH = this.curDR.height;
            finalW = finalH * rw / rh;
        }
        else {
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            //cvs.fitWidth = true;
            //如果更短，则用定宽
            finalW = this.curDR.width;
            finalH = rh / rw * finalW;
        }
        view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);

        cvs.width = finalW;
        cvs.height = finalH;
    }

    getWinSize() {
        return { width: window.innerWidth, height: window.innerHeight };
    }


    public AdjustView_() {

        let canvasSize = this.getWinSize();
        if (!this.curDR)
            this.curDR = view.getDesignResolutionSize();
        console.log(canvasSize);

        let cvs = find('Canvas').getComponent(UITransform);
        if (canvasSize.width >= this.BaseViewWidth || canvasSize.height / canvasSize.width <= (this.BaseViewHeight / this.BaseViewWidth)) {
            var width = canvasSize.width * (this.BaseViewHeight / canvasSize.height);
            view.setDesignResolutionSize(width, this.BaseViewHeight, ResolutionPolicy.FIXED_HEIGHT);

        }
        else {
            var height = canvasSize.height * (this.BaseViewWidth / canvasSize.width);

            view.setDesignResolutionSize(this.BaseViewWidth, height, ResolutionPolicy.FIXED_HEIGHT)

        }
        let str: string = `window寬:${canvasSize.width}\n\rwindow高:${canvasSize.height}\n\rcocos寬:${this.curDR.width}\n\rcocos高:${this.curDR.height}`
        console.log(str);

    }
    connetDelay: Array<number> = []
    async StartDT_NotClear(_time: number) {
        // console.log(this.connetDelay);

        return new Promise<void>((resolve, reject) => {
            let DtID = setTimeout(() => {
                resolve()
                clearTimeout(DtID)
                // for (let index = 0; index < this.connetDelay.length; index++) {
                let index = this.connetDelay.indexOf(DtID)
                if (index != -1) {
                    this.connetDelay.splice(index - 1, index)
                }
                // }
            }, _time * 1000)
        })
    }
}

