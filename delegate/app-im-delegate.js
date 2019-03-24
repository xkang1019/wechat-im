import {getIMHandlerFactory} from "../libs/im-sdk/im-factory";

export default class AppIMDelegate {
    constructor(app) {
        this._app = app;
    }

    onLaunch(options) {
        this.iIMHandler = getIMHandlerFactory;
    }

    onShow(options) {
     var userName = new Date().getTime();
      this._app.globalData.userId = userName;
      this.iIMHandler.createConnection({ options: { url: 'ws://47.107.162.97:8888?username=' + userName +'&password=123'}});
    }

    onHide() {

    }

    getIMHandlerDelegate() {
        return this.iIMHandler;
    }
}