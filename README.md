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

## 설치
1. 다운로드
- 라이브러리 다운로드 후 각자 폴더 구조에 맞게 사용하시면 됩니다.
```html
<script type="text/javascript" src="../1.4.1/mapshot.min.js"></script>
```

```javascript
// 2.0.0 버전 이상 가능
import { Naver, NaverTile, LatLng, Radius } from "../assets/js/mapshot.min.js";
```

2. CDN 이용
```html
<script type="text/javascript" 
src="https://cdn.jsdelivr.net/gh/lcw3176/mapshot-lib@master/1.4.1/mapshot.min.js"></script>
```

## 사용법

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

## 라이센스
이 라이브러리는 [MIT License](https://opensource.org/licenses/MIT)로 배포되었습니다.

## 버전정보
<details>
<summary>1.1.x</summary>

## 1.1.0
### coors.NFixLat 클래스 삭제
기존 좌표 보정 과정이 비효율적이라고 판단하여, 이를 Tile 클래스에 통합하였습니다. NFixLat 클래스는 이제 사용되지 않습니다.

### maps.Tile 기능 확장
Tile 클래스의 기능이 추가되었습니다. 진행상황들을 알려주는 이벤트와, 지도를 반경별로 찍어주는 기능이 추가되었습니다. 기존 nFixLat의 좌표 보정 기능들은 이제 Tile 클래스 내부에서 처리됩니다.

### profile.Naver 클래스 개선
기존에는 설정해야 하는 사항들이 너무 많았습니다. 이제 사용자는 자신의 개발 키와 캡쳐할 지도의 타입, 반경 이 3가지만 설정해 주면 됩니다.

### radius 추가
Tile이나 profile.Naver에 반경을 설정하는 값이 추가되었습니다. 현재 반경 1,2,5,10km 가 존재합니다.

### 코드 비교
#### 이전 버전: 1.0.0
```javascript 
// 3 x 3 지도를 만드는 예시 (반경 대략 300m)
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);

var naverProfile = new mapshot.profile.Naver();
naverProfile.setWidth(1000);
naverProfile.setHeight(1000);
naverProfile.setCenter(latlng);
naverProfile.setLevel(18);
naverProfile.setMapType("satellite_base");
naverProfile.setKey(dev-key);

var nFix = new mapshot.coors.NFixLat();
nFix.generate(latlng, naverProfile);

var movingCoor = new mapshot.coors.LatLng(
            latlng.getX() - nFix.getWidthBetweenBlock(),
            latlng.getY() + nFix.getHeightBetweenBlockWithLogo());

var startXCoor = movingCoor.getX();

for(var i = 0; i < 2; i++){
    for(var j = 0; j < 2; j++){

        naverProfile.setCenter(movingCoor);

        var img = new Image();
        img.crossOrigin = "*";
        img.src = naverProfile.getUrl();

        img.onload = function(){
            // canvas.getContext("2d").drawImage();
            // etc ......
        }

        movingCoor.init(
            movingCoor.getX() + nFixLat.getWidthBetweenBlobk(), 
            movingCoor.getY());
    }

    movingCoor.init(
        startXCoor, 
        movingCoor.getY() - nFixLat.getHeightBetweenBlockWithLogo());
}
```
#### 현재 버전 : 1.1.0
```javascript
// 1km 지도를 만드는 예시
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);
var radius = mapshot.radius.One;

var naverProfile = new mapshot.profile.Naver();
naverProfile.setLevel(radius);
naverProfile.setMapType("satellite_base");
naverProfile.setKey(dev-key);

var tile = new mapshot.maps.Tile();
tile.draw(latlng, radius, naverProfile, function(canvas){
    canvas.toBlob(function (blob) {
        // do something...
    }, "image/jpeg");
});
```

</details>

<details>
<summary>1.2.x</summary>

## 1.2.0
### Tile -> NaverTile로 변경
캡쳐 기능이 분화됨에 따라서, 타일의 종류도 나뉘게 되었습니다.
### KakaoTile, kakao profile 클래스 추가
카카오 지도를 사용하게 됨에 따라 KakaoTile, profile 클래스가 추가되었습니다.
### 이벤트명 변경
tile 클래스가 나뉘면서, 이벤트 이름도 보다 세분화되었습니다.


</details>


<details>
<summary>1.3.x</summary>

## 1.3.0
### kakaoTile.draw() -> kakaoTile.drawGet(), kakaoTile.drawPost() 로 세분화
구축한 서버 상태에 맞게 사용하기 편하도록 수정되었습니다. 

</details>




<details>
<summary>1.4.x</summary>

## 1.4.0
### kakaoTile.wait() 추가
서버가 사용 가능한지 체크하는 기능이 추가되었습니다.

</details>


<details>
<summary>1.5.x</summary>

## 1.5.0
### kakaoTile.requestImage() 추가
uuid를 통해 이미지를 발급하는 기능이 추가되었습니다.

</details>


<details>
<summary>1.6.x</summary>

## 1.6.0
### kakaoTile -> proxyTile, kakaoProfile -> proxyProfile 로 변경
proxy Server로 받아오는 이미지들이 세분화됨에 따라,
특정 회사명이 아니라 조금 더 추상화된 이름으로 변경되었습니다.

### 기존 메소드 간소화
- 사라진 메소드
    - drawGet()
    - wakeUp()
    - drawPost()
    - wait()

- 유지된 메소드
    - requestImage()
</details>


<details>
<summary>1.7.x</summary>

## 1.7.0
### 반경 설정 세분화
radius 설정이 세분화 되었습니다. mapshot.radius.{반경}.{회사명}과 같은 형식으로 세분화 되었습니다.
ex) mapshot.radius.One.Naver

### proxyTile 이미지 요청 방식 변경
proxyTile의 이미지 요청 방식이 변경되었습니다. 
기존의 XMLHttpRequest 방식에서 Image 클래스를 이용한 방식으로 변경되었습니다. 
</details>


