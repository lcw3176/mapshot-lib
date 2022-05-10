# MapshotLib
## 목차
- [소개](#소개)
- [설치](#설치)
- [문서](#문서)
- [사용법](#사용법)
- [요구사항](#요구사항)
- [호환성](#호환성)
- [라이센스](#라이센스)
- [버전정보](#버전정보)
## 소개
Naver Static Map Api를 조금 더 편하게 이용하기 위해 만들어진 라이브러리 입니다. Static Map의 양 옆 타일들의 중심 좌표 계산과, 위도가 내려갈수록 어긋나는 좌표를 보정하는 기능들이 있습니다. 
이 라이브러리는 [Mapshot](https://mapshot.netlify.app) 운영에 사용되고 있으며, 특정 기능은 직접 서버를 구축해야 사용 가능합니다.

## 설치
1. 다운로드
- 라이브러리 다운로드 후 각자 폴더 구조에 맞게 사용하시면 됩니다.
```html
<script type="text/javascript" src="../1.4.1/mapshot.min.js"></script>
```

2. CDN 이용
```html
<script type="text/javascript" 
src="https://cdn.jsdelivr.net/gh/lcw3176/mapshot-lib@master/1.4.1/mapshot.min.js"></script>
```

## 문서
- [Document](https://github.com/lcw3176/mapshot-lib/wiki/Document)

## 사용법
- [Usage_Example](https://github.com/lcw3176/mapshot-lib/wiki/Usage-Example)

## 요구사항
- 필수
    - Naver Static Map API
- 선택
    - Kakao Maps API
    - Google Maps Javascript API
    - 개인 서버

## 호환성
|브라우저|동작|테스트 환경|비고|
|----|----|----|---|
|Google Chrome|O|Desktop, Mobile||
|Microsoft Edge|O|Desktop||
|Internet Explorer|△|Desktop|ie 10 미만 작동 x|
|FireFox|O|Desktop||
|Brave Browser|O|Desktop||

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


