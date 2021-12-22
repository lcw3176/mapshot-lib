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
<script type="text/javascript" src="../1.0.0/mapshot.min.js"></script>
```

2. CDN 이용
```html
<script type="text/javascript" 
src="https://cdn.jsdelivr.net/gh/lcw3176/mapshot-lib@master/mapshot.latest.js"></script>
```

## 문서
### 공통 클래스
<details>
<summary>mapshot.coors.LatLng</summary>
<br>

### 생성자 (number lat, number lng)
- 용도
    - 좌표 클래스를 정의합니다.
- parameter
    - lat: 위도 or 경도 값
    - lng: 위도 or 경도 값
    - init을 사용해 재정렬됩니다
- return value
    - 없음

### init (number lat, number lng)
- 용도 
    - 사용자의 위,경도 입력을 x,y 값으로 구분
- parameter
    - lat: 위도 or 경도 값
    - lng: 위도 or 경도 값
    - 대한민국을 기준으로 작동합니다
    - 큰 값(경도)이 x 값으로 설정됩니다.
    - 작은 값(위도)이 y 값으로 설정됩니다. 
- return value
    - 없음

### getX()
- 용도
    - x(경도) 값을 반환합니다
- parameter
    - 없음
- return value
    - type: number
    - value: x(경도) 값

### getY()
- 용도
    - y(위도) 값을 반환합니다
- parameter
    - 없음
- return value
    - type: number
    - value: y(위도) 값
</details> 
<br>

### Naver 전용 클래스
<details>
<summary>mapshot.radius.{Number}</summary>
<br>

### One
- 용도: 1km 반경의 속성을 정의합니다.
- parameter
    - 없음
- return value
    - sideBlockCount: 11
    - zoom: 18
### Two
- 용도: 2km 반경의 속성 값을 가집니다.
- parameter
    - 없음
- return value
    - sideBlockCount: 17
    - zoom: 18
### Five
- 용도: 5km 반경의 속성 값을 가집니다.
- parameter
    - 없음
- return value
    - sideBlockCount: 11
    - zoom: 16
### Ten
- 용도: 10km 반경의 속성 값을 가집니다.
- parameter
    - 없음
- return value
    - sideBlockCount: 21
    - zoom: 16

</details> 
<br>

<details>
<summary>mapshot.profile.Naver</summary>
<br>

### setMapType (string type)
- 용도
    - 네이버 지도의 종류를 결정합니다. 
- parameter
    - basic: 일반  
    - traffic: 교통 지도  
    - satellite: 위성 
    - satellite_base: 위성 배경  
    - terrain: 지형도  
    - [네이버 staticMap mapType참고](https://api.ncloud-docs.com/docs/ai-naver-mapsstaticmap-raster)
- return value
    - 없음
### setLevel (mapshot.radius.{Number} radius)
- 용도
    - 지도의 반경을 설정합니다
- parameter
    - mapshot.radius.One: 1km 반경
    - mapshot.radius.Two: 2km 반경
    - mapshot.radius.Five: 5km 반경
    - mapshot.radius.Ten: 10km 반경
- return value
    - 없음

### setKey(string apiKey)
- 용도
    - 네이버 지도 api의 개발 키를 설정합니다.
- parameter
    - apiKey: 개발 키
- return value
    - 없음

</details> 
<br>


<details>
<summary>mapshot.maps.NaverTile</summary>
<br>

### getSE (mapshot.radius.{Number} radius, mapshot.coors.LatLng latlng)
- 용도
    - 설정된 반경의 남동쪽 좌표를 가져옵니다
- parameter
    - radius: 지도의 반경입니다.
    - latlng: 지도의 중심점 좌표입니다.
- return value
    - type: mapshot.coors.LatLng
    - value: 해당 반경의 남동쪽 좌표 클래스

### getSW (mapshot.radius.{Number} radius, mapshot.coors.LatLng latlng)
- 용도
    - 설정된 반경의 남서쪽 좌표를 가져옵니다
- parameter
    - radius: 지도의 반경입니다.
    - latlng: 지도의 중심점 좌표입니다.
- return value
    - type: mapshot.coors.LatLng
    - value: 해당 반경의 남서쪽 좌표 클래스

### getNE (mapshot.radius.{Number} radius, mapshot.coors.LatLng latlng)
- 용도
    - 설정된 반경의 북동쪽 좌표를 가져옵니다
- parameter
    - radius: 지도의 반경입니다.
    - latlng: 지도의 중심점 좌표입니다.
- return value
    - type: mapshot.coors.LatLng
    - value: 해당 반경의 북동쪽 좌표 클래스

### getNW (mapshot.radius.{Number} radius, mapshot.coors.LatLng latlng)
- 용도
    - 설정된 반경의 북서쪽 좌표를 가져옵니다
- parameter
    - radius: 지도의 반경입니다.
    - latlng: 지도의 중심점 좌표입니다.
- return value
    - type: mapshot.coors.LatLng
    - value: 해당 반경의 북서쪽 좌표 클래스

### draw (mapshot.coors.LatLng latlng, mapshot.radius.{Number} radius, mapshot.profile.Naver naverProfile, function onSuccessCallback)
- 용도
    - 설정된 중심좌표, 반지름에 해당하는 범위의 위성사진을 canvas에 그립니다.
    - canvas는 onSuccessCallback의 인자로 전달됩니다.
- parameter
    - latlng: 중심점의 좌표입니다.
    - radius: 중심점으로부터 캡쳐해올 반경입니다.
    - naverProfile: 네이버 staticMap Api 정보가 담긴 클래스입니다.
    - onSuccessCallback: draw 함수가 끝나면 실행될 콜백함수입니다.
- return value
    - type: 콜백함수를 통한 canvas 전달
    - value: canvas

### naverTileOnLoadStart (Event)
- 용도
    - canvas에 이미지를 받아오기 전, 총 몇장의 사진을 수집할 예정인지 알려줍니다
- parameter
    - 없음
- return value
    - type: detail.total (number)
    - value: 총 수집할 사진 갯수

### naverTileOnProgress (Event)
- 용도
    - 사진이 수집될때 마다 발생하는 이벤트입니다.
- parameter
    - 없음
- return value
    - 없음

### naverTileOnError (Event)
- 용도
    - 사진 수집에 실패할 때 마다 발생하는 이벤트입니다.
- parameter
    - 없음
- return value
    - 없음
    
</details> 
<br>

### Kakao 전용 클래스
<details>
<summary>mapshot.profile.Kakao</summary>

### setLevel (number level)
- 용도
    - 지도의 확대 레벨을 설정합니다.
- parameter
    - level: 확대 레벨입니다
    - [카카오 지도 api 참고](https://apis.map.kakao.com/web/documentation/#Map_setLevel)
- return value
    - 없음

### setMapType (string type)
- 용도
    - 지도 종류를 설정합니다.
- parameter
    - [카카오 지도 api 참고](https://apis.map.kakao.com/web/documentation/#MapTypeId)
- return value
    - 없음

### setCenter (mapshot.maps.LatLng latlng)
- 용도
    - 지도의 중심 좌표를 설정합니다.
- parameter
    - latlng: 중심 좌표가 설정된 LatLng 클래스입니다.
- return value
    - 없음

### setProxyUrl (string url)
- 용도
    - 지도의 Proxy 서버 url을 설정합니다.
- parameter
    - url: 개별 구축한 proxy 서버 url
- return value
    - 없음

</details>
<br>

<details>
<summary>mapshot.maps.KakaoTile</summary>

### wakeUp (string wakeUpUrl, function onSuccessCallback)
- 용도
    - 구축한 서버에 접속 전 서버를 깨우는 함수입니다.
- parameter
    - wakeUpUrl: wakeUp 전용 서버 url 입니다.
    - onSuccessCallback: 성공적인 응답시 실행되는 콜백함수 입니다.
- return value
    - 없음

### draw (string proxyUrl, function onSuccessCallback)
- 용도
    - 서버에서 지도 이미지를 받아오는 함수입니다.
- parameter
    - proxyUrl: 지도 생성에 해당하는 url입니다.
    - onSuccessCallback: 성공적인 응답시 실행되는 콜백함수 입니다.
- return value
    - type: 콜백함수를 통한 blob 전달
    - value: Image blob

### kakaoTileOnProgress (Event)
- 용도
    - 서버에서 이미지를 받아오는 진행상황을 알려줍니다.
- parameter
    - 없음
- return value
    - type: detail.percentage (number)
    - value: 전송 진행상황을 나타냅니다. max:100

### kakaoTileOnError (Event)
- 용도
    - 서버에서 이미지를 받아오는 중 에러 발생을 알려줍니다.
- parameter
    - 없음
- return value
    - 없음

</details>
<br>

## 사용법
### 공통 클래스
- mapshot.coors. LatLng
```javascript
// 좌표 데이터 클래스 생성
// 1. 생성자로 위,경도 좌표 생성
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);

// 2. init으로 좌표 생성
// 위,경도 입력 순서 관계 X
latlng.init(127.0016985, 37.5642135) ;

// 좌표 가져오기
latlng.getX(); // 127.0016985
latlng.getY(); // 37.5642135
```
### Naver 전용 클래스
- mapshot.radius.{Number}
```javascript
var radiusOne = mapshot.radius.One;
var radiusTwo = mapshot.radius.Two;
var radiusFive = mapshot.radius.Five;
var radiusTen = mapshot.radius.Ten;
```
- mapshot.profile.Naver
```javascript
// 반경 1키로 설정
var radius = mapshot.radius.One;

var naverProfile = new mapshot.profile.Naver();
naverProfile.setLevel(radius);
naverProfile.setMapType("satellite_base");
naverProfile.setKey(dev-key);
```

- mapshot.maps.NaverTile
```javascript
// 지도 관련 기능 클래스
var tile = new mapshot.maps.NaverTile();

// 2km 반경 타일의 사각형 남동쪽 좌표 가져오기
var radius = mapshot.radius.Two; 

var seLatLng = tile.getSE(radius, centerLatLng);
seLatLng.getX();
seLatLng.getY();

// 5km 반경 타일의 사각형 북서쪽 좌표 가져오기
radius = mapshot.radius.Five; 

// LatLng 클래스 리턴
var nwLatLng = tile.getNW(radius, centerLatLng);

// 이벤트 사용
document.body.addEventListener("naverTileOnLoadStart", function(e){
        document.getElementById("progressBar").max = e.detail.total;
    }
);

document.body.addEventListener("naverTileOnProgress", function(){
        document.getElementById("progressBar").value += 1;
    }
);

document.body.addEventListener("naverTileOnError", function(){
    alert("에러 발생");
});
```
- 10km 반경 캡쳐 사용 예시

```javascript
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);
var radius = mapshot.radius.Ten;

var naverProfile = new mapshot.profile.Naver();
naverProfile.setLevel(radius);
naverProfile.setMapType("satellite_base");
naverProfile.setKey(dev-key);

var tile = new mapshot.maps.NaverTile();
tile.draw(latlng, radius, naverProfile, function(canvas){
    canvas.toBlob(function (blob) {
        // do something...
    }, "image/jpeg");
});
```

### Kakao 전용 클래스
- mapshot.profile.Kakao
```javascript
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);

var profile = new mapshot.profile.Kakao();

profile.setLevel(12);
profile.setMapType(kakao.maps.MapTypeId.SKYVIEW);
profile.setCenter(latlng);
profile.setProxyUrl("personalServerUrl");
```

- mapshot.maps.KakaoTile
```javascript
var tile = new mapshot.maps.KakaoTile();

tile.wakeUp("personalServerUrl", function(){
    tile.draw("personalServerUrl", function(blob){
        // do something...
    });
});

// 이벤트 사용
document.body.addEventListener("kakaoTileOnProgress", function(e){
    document.getElementById("progressBar").value = e.detail.percentage;
});

document.body.addEventListener("kakaoTileOnError", function(){
    alert("에러 발생");
});

```

## 요구사항
- Naver Static Map API
- Kakao Maps API
- 개인 서버

## 호환성
|브라우저|동작|테스트 환경|비고|
|----|----|----|---|
|Google Chrome|O|Desktop, Mobile||
|Microsoft Edge|O|Desktop||
|Internet Explorer|△|Desktop|ie 10 미만 테스트 안해봄|
|FireFox|O|Desktop||
|Brave Browser|O|Desktop||

## 라이센스
이 라이브러리는 [MIT License](https://opensource.org/licenses/MIT)로 배포되었습니다.

## 버전정보
<details>
<summary>1.1.0</summary>

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
<summary>1.2.0</summary>

## 1.2.0
### Tile -> NaverTile로 변경
캡쳐 기능이 분화됨에 따라서, 타일의 종류도 나뉘게 되었습니다.
### KakaoTile, kakao profile 클래스 추가
카카오 지도를 사용하게 됨에 따라 KakaoTile, profile 클래스가 추가되었습니다.
### 이벤트명 변경
tile 클래스가 나뉘면서, 이벤트 이름도 보다 세분화되었습니다.


</details>


<details>
<summary>1.3.0</summary>

## 1.3.0
### kakaoTile.draw() -> kakaoTile.drawGet(), kakaoTile.drawPost() 로 세분화
구축한 서버 상태에 맞게 사용하기 편하도록 수정되었습니다. 
### profile.Kakao.getDataToJson() 함수 추가
POST 요청에 맞게, 필요한 매개변수들을 JSON으로 반환합니다

</details>


