export class Layer {
    constructor() {
        this.layers = [];
        this.yMin;
        this.xMin;
        this.yMax;
        this.xMax;
        this.height;
        this.url;
    }

    setLayer(param){
        this.layers = param;
    }

    removeLayer(){
        // this.layers = this.layers.filter((i) => i !== param);
        this.layers.length = 0;
    }

    setYMin(param){
        this.yMin = param;
    }

    setXMin(param){
        this.xMin = param;
    }

    setYMax(param){
        this.yMax = param;
    }

    setXMax(param){
        this.xMax = param;
    }

    setHeight(param) {
        this.height = param;
    }

    setUrl(param){
        this.url = param;
    }

    getUrl() {
        return this.url
            + "?layer=" + this.layers.join()
            + "&ymin=" + this.yMin
            + "&xmin=" + this.xMin
            + "&ymax=" + this.yMax
            + "&xmax=" + this.xMax
            + "&height=" + this.height;
    }

}