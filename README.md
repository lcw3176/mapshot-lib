# MapshotLib
## 목차
- [소개](#소개)
- [요구사항](#요구사항)
- [설치](#설치)
- [사용법](#사용법)
- [라이센스](#라이센스)
- [버전정보](#버전정보)
## 소개
Naver Static Map Api를 조금 더 편하게 이용하기 위해 만들어진 라이브러리 입니다. Static Map의 양 옆 타일들의 중심 좌표 계산과, 위도가 내려갈수록 어긋나는 좌표를 보정하는 기능들이 있습니다. 
이 라이브러리는 [Mapshot](https://mapshot.netlify.app) 운영에 사용되고 있습니다.

## 요구사항
 - Naver Static Map API 키 값

## 사용법
세부적인 내용은 [wiki](https://github.com/lcw3176/mapshot-lib/wiki) 에서 확인 가능합니다.

- 좌표 초기화

```javascript

import { LatLng } from "../assets/js/mapshot.min.js";

// 생성자로 위,경도 좌표를 생성하고
// init으로 기존 좌표 변경이 가능합니다.

let latlng = new LatLng(37.5642135, 127.0016985);
latlng.init(127.0016985, 37.5642135) ;

// 좌표 가져오기
// getX(): 경도, getY(): 위도

latlng.getX(); // 결과값: 127.0016985
latlng.getY(); // 결과값: 37.5642135

```

- 캡쳐 프로필 생성
```javascript

import { Naver, Radius } from "../assets/js/mapshot.min.js";

// 캡쳐 반경 설정
// 1, 2, 5, 10km 존재
// 1km: Radius.One
// 2km: Radius.Two
// 5km: Radius.Five
// 10km: Radius.Ten

let radius = Radius.One;

// 지도 종류 선택
// 일반: 'basic',
// 위성: 'satellite_base',
// 하이브리드: 'satellite',

let mapType = 'satellite_base';

// 네이버에서 발급받은 Static Map API 키값
let personal_key = "123123123123123";

let naverProfile = new Naver();
naverProfile.setLevel(radius);
naverProfile.setMapType(mapType);
naverProfile.setKey(personal_key);

```


- 지도 캡쳐하기
```javascript
import { Naver, NaverTile, LatLng, Radius  } from "../assets/js/mapshot.min.js";

let radius = Radius.Five;
let mapType = 'satellite_base';
let personal_key = "123123123123123";

let naverProfile = new Naver();
naverProfile.setLevel(radius);
naverProfile.setMapType(mapType);
naverProfile.setKey(personal_key);

let latlng = new LatLng(37.5642135, 127.0016985);

let naverTile = new NaverTile();

// 콜백함수에 각각의 지도 이미지를 합친 canvas가 전달됩니다
naverTile.draw(latlng, radius, naverProfile, (canvas) => {
    canvas.toBlob((blob) => {
        // do something...
    }, "image/jpeg");
});
```

- 이벤트
```javascript
// 이벤트 사용
document.body.addEventListener("naverTileOnLoadStart", (e) => {
    // 총 몇장을 캡쳐해 올 것인지 전달 됩니다.
    document.getElementById("progressBar").max = e.detail.total;
});

document.body.addEventListener("naverTileOnProgress", () => {
    // 각각의 지도 이미지가 로딩되면 발생합니다.
    document.getElementById("progressBar").value += 1;
});

document.body.addEventListener("naverTileOnError", () => {
    // 지도 로딩중 에러 발생시 해당 이벤트가 작동됩니다..
    alert("에러 발생");
});
```

- 부가 기능
```javascript
import { NaverTile, LatLng, Radius } from "../assets/js/mapshot.min.js";

let tile = new NaverTile();
let centerLatlng = new LatLng(37.5642135, 127.0016985);

// 중점에서 2km 반경 사각형의 남동쪽 좌표 가져오기
// getNW() *---------* getNE()
//         |         |
//         |         |
//         |         |
// getSW() *---------* getSE()

let seLatLng = tile.getSE(Radius.Two, centerLatLng);
seLatLng.getX();
seLatLng.getY();
```