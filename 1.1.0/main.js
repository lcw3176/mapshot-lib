var mapshot;

window.addEventListener("load", function(){
    mapshot = {
        maps:{
            Tile:Tile,
        },

        coors:{
            LatLng:LatLng, 
        },

        profile:{
            Naver:Naver
        },

        Radius:{
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
    }
    
});