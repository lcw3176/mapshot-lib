class ProxyTile{

    requestImage(proxyProfile, uuid, onSuccess){
        var proxyTileOnProgressEvent = new CustomEvent("proxyTileOnProgress",{
            detail:{
                percentage:0
            }
        });
        
        var proxyTileOnErrorEvent = new CustomEvent("proxyTileOnError");

        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxyProfile.getProxyUrl() + "/" + uuid, true);

        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = function(e) {            
            var blob = new Blob([this.response]);
            onSuccess(blob);
        };

        xhr.onprogress = function(e) {
            proxyTileOnProgressEvent.detail.percentage =  parseInt((e.loaded / e.total) * 100);
            document.body.dispatchEvent(proxyTileOnProgressEvent);
        };

        xhr.onerror = function(){
            document.body.dispatchEvent(proxyTileOnErrorEvent);
        }

        xhr.send();
    }

}