class Naver{
    constructor(){
        this.bbox;
    }

    setBbox(param){
        this.bbox = param;
    }

    getUrl(){
        return "https://api.vworld.kr/req/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=lt_c_upisuq151"
            + "&MAXFEATURES=100&SRSNAME=EPSG:4326&OUTPUT=text/javascript&KEY=BA51886D-3289-32E9-AC7C-1D7A36D3BB20&DOMAIN=https://testservermapshot.netlify.app&format_options=callback:parseResponse"
            + "&BBOX=" + this.bbox;
             
    }

}