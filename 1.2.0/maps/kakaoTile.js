class KakaoTile{
    constructor(){
        this.percentage = 0;
    }

    wakeUp(wakeUpUrl, callback){
        var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    callback();
                    return;
                }
            }

            document.body.dispatchEvent(kakaoTileOnErrorEvent);
        };

        xhr.open('GET', wakeUpUrl);
        xhr.send();
    }

    draw(proxyUrl, callback){
        var kakaoTileOnProgressEvent = new CustomEvent("kakaoTileOnProgress",{
            detail:{
                percentage:this.percentage
            }
        });
        
        var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxyUrl, true);
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = function(e) {            
            var blob = new Blob([this.response]);
            callback(blob);
        };

        xhr.onprogress = function(e) {
            this.percentage = parseInt((e.loaded / e.total) * 100);
            document.body.dispatchEvent(kakaoTileOnProgressEvent);
        };

        xhr.onerror = function(){
            document.body.dispatchEvent(kakaoTileOnErrorEvent);
        }

        xhr.send();
    }
}