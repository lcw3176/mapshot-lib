class KakaoTile{
    wakeUp(wakeUpUrl, onSuccess){
        var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    onSuccess();
                }

                else{
                    document.body.dispatchEvent(kakaoTileOnErrorEvent);
                }
            }

            
        };

        xhr.open('GET', wakeUpUrl);
        xhr.send();
    }

    drawGet(proxyUrl, onSuccess){
        var kakaoTileOnProgressEvent = new CustomEvent("kakaoTileOnProgress",{
            detail:{
                percentage:0
            }
        });
        
        var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxyUrl, true);

        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = function(e) {            
            var blob = new Blob([this.response]);
            onSuccess(blob);
        };

        xhr.onprogress = function(e) {
            kakaoTileOnProgressEvent.detail.percentage =  parseInt((e.loaded / e.total) * 100);
            document.body.dispatchEvent(kakaoTileOnProgressEvent);
        };

        xhr.onerror = function(){
            document.body.dispatchEvent(kakaoTileOnErrorEvent);
        }

        xhr.send();
    }

    drawPost(proxyUrl, jsonData, onSuccess){
        var kakaoTileOnProgressEvent = new CustomEvent("kakaoTileOnProgress",{
            detail:{
                percentage:0
            }
        });
        
        var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

        var xhr = new XMLHttpRequest();
        xhr.open('POST', proxyUrl, true);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = function(e) {            
            var blob = new Blob([this.response]);
            onSuccess(blob);
        };

        xhr.onprogress = function(e) {
            kakaoTileOnProgressEvent.detail.percentage =  parseInt((e.loaded / e.total) * 100);
            document.body.dispatchEvent(kakaoTileOnProgressEvent);
        };

        xhr.onerror = function(){
            document.body.dispatchEvent(kakaoTileOnErrorEvent);
        }

        xhr.send(jsonData);
    }
}