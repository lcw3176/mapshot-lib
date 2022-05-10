// ie CustomEvent 추가 코드

(function () {

    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();


var mapshot = {
    maps:{
        NaverTile:NaverTile,
        ProxyTile:ProxyTile,
    },

    coors:{
        LatLng:LatLng, 
    },

    profile:{
        Naver:Naver,
        Proxy:Proxy,
    },

    radius:{
        One:{
            sideBlockCount:11,
            zoom:18,
        },
        Two:{
            sideBlockCount:17,
            zoom:18,
        },
        Five:{
            sideBlockCount:11,
            zoom:16,
        },
        Ten:{
            sideBlockCount:21,
            zoom:16,
        },
    }
};