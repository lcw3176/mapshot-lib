class Kakao{
    constructor(){
        this.center;
        this.level;
        this.mapType;
        this.proxyUrl;
        this.layerMode = false;
    }

    setLayerMode(mode){
        this.layerMode = mode;
    }

    isLayerMode(){
        return this.layerMode;
    }

    setLevel(level){
        this.level = level;
    }

    setMapType(type){
        this.mapType = type;
    }

    setCenter(center){
        this.center = center;
    }

    setProxyUrl(proxyUrl){
        this.proxyUrl = proxyUrl;
    }

    getProxyUrl(){
        return this.proxyUrl;
    }

    getUrlWithParams(){
        var queryString = "?lat=" + this.center.getY() + 
                          "&lng=" + this.center.getX() + 
                          "&level=" + this.level + 
                          "&type=" + this.mapType;
        
        return this.proxyUrl + queryString;
    }

    getParamsToJson(){
        var jsonData = {
            layerMode:this.layerMode,
            lat:this.center.getY(),
            lng:this.center.getX(),
            level:this.level,
            type:this.mapType
        }

        return JSON.stringify(jsonData);
    }
}