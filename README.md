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
// 반경 1키로 설정
var radius = mapshot.radius.One;

var naverProfile = new mapshot.profile.Naver();
naverProfile.setLevel(radius);
naverProfile.setMapType("satellite_base");
naverProfile.setKey(dev-key);
```

- tile 클래스
```javascript
// 지도 관련 기능 클래스
var tile = new mapshot.maps.Tile();

// 2km 반경 타일의 사각형 남동쪽 좌표 가져오기
var radius = mapshot.radius.Two; 

var seLatLng = tile.getSE(radius, centerLatLng);
seLatLng.getX();
seLatLng.getY();

// 5km 반경 타일의 사각형 북서쪽 좌표 가져오기
radius = mapshot.radius.Five; 

var nwLatLng = tile.getNW(radius, centerLatLng);
// LatLng 클래스 리턴

// 그 외 정의된 함수
// tile.getSW();
// tile.getNE();
// tile.draw();
```
- 사용 예시
```javascript
var radius = mapshot.radius.Ten;
var tile = new mapshot.maps.Tile();

tile.draw(coor, radius, naverProfile, function(canvas){
    canvas.toBlob(function (blob) {
        // do something...
    }, "image/jpeg");
});
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