export const Radius = {
    // {
    //  One: {
    //      sideBlockCount: 11,
    //      zoom: 18,
    //      level: 1
    //    }
    // }
    // 이런식으로 변경해도 무방할듯
    // 
    // profile 이랑 mapsho/tile쪽도 간소화 가능해보임
    // 코드 정리좀
    
    One: {
        Naver: {
            sideBlockCount: 11,
            zoom: 18,
        },
        Kakao: {
            level: 1,
            // width: 5000,
        },

        Google:{
            level:1,
            // width:6000,
        }

    },
    Two: {
        Naver: {
            sideBlockCount: 17,
            zoom: 18,
        },
        Kakao: {
            level: 2,
            // width: 4000,
        },

        Google:{
            level:2,
            // width:5000,
        }

    },
    Five: {
        Naver: {
            sideBlockCount: 11,
            zoom: 16,
        },
        Kakao: {
            level: 5,
            // width: 5000,
        },

        Google:{
            level:5,
            // width:6000,
        }

    },
    Ten: {
        Naver: {
            sideBlockCount: 21,
            zoom: 16,
        },
        Kakao: {
            level: 10,
            // width: 5000,
        },

        Google:{
            level:10,
            // width:6000,
        }

    },

};
