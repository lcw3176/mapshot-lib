class Kakao{
    constructor(){
        this.center;
        this.level;
        this.mapType;
        this.proxyUrl = "https://mapshotproxyserver.herokuapp.com/test?";
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

    getUrl(){
        var queryString = "lat=" + coor.getY() + 
                          "&lng=" + coor.getX() + 
                          "&level=" + km + 
                          "&type=" + kakaoMapType;
        
        return this.proxyUrl + queryString;
    }
}