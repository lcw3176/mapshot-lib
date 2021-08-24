class Naver{
    constructor(){
        this.mapType;
        this.center;
        this.level;
        this.key;
    }

    setMapType(param){
        this.mapType = param;
    }

    setCenter(param){
        this.center = param;
    }

    setLevel(quality){
        if(quality.HIGH){
            this.level = 18;
        } else if(quality.NORMAL){
            this.level = 16;
        } else{
            throw "Parameter is not QUALITY";
        }
        
    }

    setKey(param){
        this.key = param;
    }

    getUrl(){
        return "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?"
             + "w=1000"
             + "&h=1000"
             + "&center=" +  this.center.getX() + "," + this.center.getY()
             + "&level=" + this.level
             + "&X-NCP-APIGW-API-KEY-ID=" + this.key
             + "&maptype=" + this.mapType;
    }

}
