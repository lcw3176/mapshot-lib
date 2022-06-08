class Naver{
    constructor(){
        this.mapType;
        this.center;
        this.level;
        this.key;
        this.height;
    }

    setMapType(param){
        this.mapType = param;
    }

    setCenter(param){
        this.center = param;
    }

    setLevel(radius){
        this.level = radius.Naver.zoom;
    }

    setKey(param){
        this.key = param;
    }

    setHeight(param){
        this.height = param;
    }

    getUrl(){
        return "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?"
             + "w=1000"
             + "&h=" + this.height
             + "&center=" +  this.center.getX() + "," + this.center.getY()
             + "&level=" + this.level
             + "&X-NCP-APIGW-API-KEY-ID=" + this.key
             + "&maptype=" + this.mapType;
    }

}