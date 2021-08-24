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

    setLevel(quality){
        if(quality == mapshot.Quality.HIGH){
            this.level = 18;
        } else if(quality == mapshot.Quality.NORMAL){
            this.level = 16;
        } else{
            throw "Parameter is not Quality Type";
        }
        
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
             + "&h=" + this.height +
             + "&center=" +  this.center.getX() + "," + this.center.getY()
             + "&level=" + this.level
             + "&X-NCP-APIGW-API-KEY-ID=" + this.key
             + "&maptype=" + this.mapType;
    }

}
