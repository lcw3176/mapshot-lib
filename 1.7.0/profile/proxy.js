class Proxy{
    constructor(){
        this.center;
        this.level;
        this.mapType;
        this.proxyUrl;
        this.layerMode = false;
        this.companyType;
        this.width;
    }

    setLayerMode(mode){
        this.layerMode = mode;
    }

    isLayerMode(){
        return this.layerMode;
    }

    setRadius(radius){
        if(this.companyType === "google"){
            this.level = radius.Google.level;
            this.width = radius.Google.width;
        } else if (this.companyType === "kakao") {
            this.level = radius.Kakao.level;
            this.width = radius.Kakao.width;
        }
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

    setCompanyType(companyType){
        this.companyType = companyType;
    }

    getCompanyType(){
        return this.companyType;
    }

    getWidth(){
        return this.width;
    }

    getProxyUrl(){
        return this.proxyUrl;
    }

    getUrlWithParams(){
        return this.proxyUrl + this.getQueryString();
    }

    getParamsToJson(){
        var jsonData = {
            layerMode:this.layerMode,
            lat:this.center.getY(),
            lng:this.center.getX(),
            level:this.level,
            type:this.mapType,
            companyType:this.companyType
        }

        return JSON.stringify(jsonData);
    }

    getQueryString(){
        return "?lat=" + this.center.getY() + 
                "&lng=" + this.center.getX() + 
                "&level=" + this.level + 
                "&type=" + this.mapType + 
                "&layerMode=" + this.layerMode + 
                "&companyType=" + this.companyType;
        
    }

}