# MapshotLib
## 목차
- [소개](#소개)
- [설치](#설치)
- [사용법](#사용법)
- [요구사항](#요구사항)
- [호환성](#호환성)
- [라이센스](#라이센스)
## 소개
Naver Static Map Api를 조금 더 편하게 이용하기 위해 만들어진 라이브러리 입니다. Static Map의 양 옆 타일들의 중심 좌표 계산과, 위도가 내려갈수록 어긋나는 좌표를 보정하는 기능들이 있습니다. 
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
## 사용법
- latlng 클래스
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

- naver 클래스
```javascript
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);
// Naver Static Map raster 문서 참고
// https://api.ncloud-docs.com/docs/ai-naver-mapsstaticmap-raster
// 현재 이 라이브러리는 Level 16, 18 지원
var naverProfile = new mapshot.profile.Naver();
naverProfile.setWidth(1000);
naverProfile.setHeight(1000);
naverProfile.setCenter(latlng);
naverProfile.setLevel(18);
naverProfile.setMapType("satellite_base");
naverProfile.setKey(dev-key);

naverProfile.getUrl();
// https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?
// w=1000&h=1000&center=127.0016985,37.5642135&level=18&
// X-NCP-APIGW-API-KEY-ID=dev-key&maptype=satellite_base"
```

- nFixLat 클래스
```javascript
var latlng = new mapshot.coors.LatLng(37.5642135, 127.0016985);
var naverProfile = new mapshot.profile.Naver();
// 프로파일 세팅...

var nFixLat = new mapshot.coors.NFixLat();

// generate()
// 네이버 지도 level에 따라서 Static Map 타일들 간의 거리 계산 
nFixLat.generate(latlng, naverProfile);

/* 
코드 수정 필요

// 네이버 로고가 없이 나옴
nFix.getHeightBetweenBlock()

// 네이버 로고와 함께 나옴
nFix.getHeightBetweenBlockWithLogo()

코드 수정 필요

*/
```

- tile 클래스
```javascript
// 지도 타일의 모서리 좌표를 쉽게 구하는 클래스
var tile = new mapshot.maps.Tile();

// 중심 좌표로부터 11 x 11 타일로 이루어진 사각형의 남동쪽 좌표 가져오기 
var seLatLng = tile.getSE(11, nFixLat, centerLatLng);
seLatLng.getX();
seLatLng.getY();

// 중심 좌표로부터 17 x 17 타일로 이루어진 사각형의 북서쪽 좌표 가져오기
var nwLatLng = tile.getNW(17, nFixLat, centerLatLng);
// LatLng 클래스 리턴

// 그 외 정의된 함수
// tile.getSW();
// tile.getNE();
```
- 사용 예시
```javascript
// 3 x 3 지도를 만드는 예시 (NW)
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
## 요구사항
- Naver Static Map API
## 호환성
|브라우저|동작|테스트 환경|비고|
|----|----|----|---|
|Google Chrome|O|Desktop, Mobile||
|Microsoft Edge|O|Desktop||
|Internet Explorer|△|Desktop|ie 10 버전만 테스트|
|FireFox|O|Desktop||
|Brave Browser|O|Desktop||

## 라이센스
- 이 라이브러리는 [MIT License](https://opensource.org/licenses/MIT)로 배포되었습니다.