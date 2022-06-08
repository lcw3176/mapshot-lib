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
            Naver:{
                sideBlockCount:11,
                zoom:18,
            },
            Kakao:{
                level:1,
                width:5000,
            },
            Google:{
                level:1,
                width:5500,
            }
            
        },
        Two:{
            Naver:{
                sideBlockCount:17,
                zoom:18,
            },
            Kakao:{
                level:2,
                width:4000,
            },
            Google:{
                level:2,
                width:4500,
            }
           
        },
        Five:{
            Naver:{
                sideBlockCount:11,
                zoom:16,
            },
            Kakao:{
                level:5,
                width:5000,
            },
            Google:{
                level:5,
                width:5500,
            }
            
        },
        Ten:{
            Naver:{
                sideBlockCount:21,
                zoom:16,
            },
            Kakao:{
                level:10,
                width:5000,
            },
            Google:{
                level:10,
                width:5500,
            }
            
        },
            
    }
};