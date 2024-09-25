import {makeObservable} from "mobx";

class CanvasState {
    canvas = null

    constructor() {
        makeObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

}

export default new CanvasState()