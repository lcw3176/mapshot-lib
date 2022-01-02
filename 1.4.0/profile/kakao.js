class Kakao{
    constructor(){
        this.center;
        this.level;
        this.mapType;
        this.proxyUrl;
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
            lat:this.center.getY(),
            lng:this.center.getX(),
            level:this.level,
            type:this.mapType
        }

        return JSON.stringify(jsonData);
    }
}