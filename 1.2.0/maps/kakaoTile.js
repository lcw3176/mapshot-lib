class KakaoTile{
    constructor(){
        this.wakeUpUrl = "https://mapshotproxyserver.herokuapp.com/wakeup";
    }

    wakeUp(onSuccess, onFailed){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    onSuccess();
                }
            }

            onFailed();
        };

        xhr.open('GET', this.wakeUpUrl);
        xhr.send();
    }

    draw(proxyUrl, callback){

        var kakaoTileOnLoadStartEvent = new CustomEvent("kakaoTileOnLoadStart",{
            detail:{
                total:total
            }
            
        });

        var kakaoTileOnLoadEvent = new CustomEvent("kakaoTileOnLoad",{
            detail:{
                total:total
            }
            
        });
        
        var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

        document.body.dispatchEvent(kakaoTileOnLoadStartEvent);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxyUrl, true);
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = function(e) {            
            var blob = new Blob([this.response]);
            callback(blob);
        };

        xhr.onprogress = function(e) {
            img.completedPercentage = parseInt((e.loaded / e.total) * 100);

        };

        xhr.onerror = function(){
           
        }

        xhr.send();
    }
}