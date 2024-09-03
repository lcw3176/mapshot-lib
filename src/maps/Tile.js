export class Tile {
    constructor() {

    }

    
    getSE(radius, latlng) {
        let bbox = this.getBoundingBox(latlng.getY(), latlng.getX(), radius.level * 1000);

        let Lat = bbox.latMin;
        let Lng = bbox.lngMax;

        return new LatLng(Lat, Lng);
    }


    getSW(radius, latlng) {
        let bbox = this.getBoundingBox(latlng.getY(), latlng.getX(), radius.level * 1000);

        let Lat = bbox.latMin;
        let Lng = bbox.lngMin;

        return new LatLng(Lat, Lng);
    }


    getNE(radius, latlng) {
        let bbox = this.getBoundingBox(latlng.getY(), latlng.getX(), radius.level * 1000);

        let Lat = bbox.latMax;
        let Lng = bbox.lngMax;

        return new LatLng(Lat, Lng);
    }


    getNW(radius, latlng) {
        let bbox = this.getBoundingBox(latlng.getY(), latlng.getX(), radius.level * 1000);

        let Lat = bbox.latMax;
        let Lng = bbox.lngMin;

        return new LatLng(Lat, Lng);
    }


    async drawLayers(neLat, neLng, swLat, swLng, canvas, templateWidth, layerProfile) {
        canvas.width = templateWidth * 2;
        canvas.height = templateWidth * 2;

        let ctx = canvas.getContext("2d");
   
        
        let radiusMeter = this.calculateRadiusFromBounds(swLat, swLng, neLat, neLng);

        const defaultBlockCount = 2;
        const defaultBlockRangeMeter = radiusMeter / defaultBlockCount;

        const tiles = this.generateTilesByBounds(swLat, swLng, neLat, neLng, defaultBlockRangeMeter);

        layerProfile.setHeight(Math.floor(defaultBlockRangeMeter / 2));

        console.log("지름", defaultBlockRangeMeter);
        
        let index = 0;

        // 결과 출력
        for(const tile of tiles) {

            let value = this.getBoundingBox(tile.lat, tile.lng, defaultBlockRangeMeter / 2)

            layerProfile.setYMin(value.latMin);
            layerProfile.setXMin(value.lngMin);
            layerProfile.setYMax(value.latMax);
            layerProfile.setXMax(value.lngMax);
            

            let xPos = (index % (defaultBlockCount * 2)) * defaultBlockRangeMeter;
            let yPos = parseInt(index / (defaultBlockCount * 2)) * defaultBlockRangeMeter;
            
            let success = await this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockRangeMeter, ctx, 0);

            if(!success){
                await this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockRangeMeter, ctx, 1);
            }

            await this.delay(100);
            index++;
        };

    }

    async processImage(url, xPos, yPos, defaultBlockHeight, ctx, retryCount) {
        return new Promise((resolve) => {
            let image = new Image();
            image.crossOrigin = "*";
            image.src = url;
            
            image.onload = function () {
                ctx.drawImage(image, xPos, yPos, defaultBlockHeight, defaultBlockHeight);
                resolve(true);
            };
    
            image.onerror = function () {
                resolve(false);
            };
        });
    }

    generateTilesByBounds(latMin, lonMin, latMax, lonMax, tileSize) {
        // 중심점과 경계의 좌표를 EPSG:3857로 변환
        const boundsMin = this.latLonToMercator(latMin, lonMin);
        const boundsMax = this.latLonToMercator(latMax, lonMax);

        const tiles = [];

        // X 방향 타일 수 계산 (왼쪽에서 오른쪽)
        const numXTiles = Math.ceil((boundsMax.x - boundsMin.x) / tileSize);
        // Y 방향 타일 수 계산 (위쪽에서 아래쪽)
        const numYTiles = Math.ceil((boundsMax.y - boundsMin.y) / tileSize);

        // 타일 그리드 생성
        for (let y = 0; y < numYTiles; y++) {
            for (let x = 0; x < numXTiles; x++) {
                // 타일의 중심점 계산
                const tileCenterX = boundsMin.x + x * tileSize + tileSize / 2;
                const tileCenterY = boundsMax.y - y * tileSize - tileSize / 2;

                // 타일 중심점을 위도/경도로 변환
                const tileLatLon = this.mercatorToLatLon(tileCenterX, tileCenterY);

                tiles.push(tileLatLon);

                console.log(tileLatLon);
            }
        }

        return tiles;
    }

    getBoundingBox(lat, lon, radius) {
        const R = 6378137; // 지구의 반지름 (미터 단위)
    
        const dLat = radius / R;
        const dLon = radius / (R * Math.cos(Math.PI * lat / 180));
    
        const latMin = lat - dLat * (180 / Math.PI);
        const latMax = lat + dLat * (180 / Math.PI);
        const lonMin = lon - dLon * (180 / Math.PI);
        const lonMax = lon + dLon * (180 / Math.PI);
    
        return {
            latMin: latMin,
            latMax: latMax,
            lngMin: lonMin,
            lngMax: lonMax
        };
    }

    latLonToMercator(lat, lon) {
        // 지구의 반지름 (미터 단위)
        const R = 6378137;
    
        // 경도(lon) -> x 좌표 변환 (단위: 미터)
        const x = R * (lon * Math.PI / 180);
    
        // 위도(lat) -> y 좌표 변환 (단위: 미터)
        const y = R * Math.log(Math.tan((Math.PI / 4) + (lat * Math.PI / 360)));
    
        return { x: x, y: y };
    }


    mercatorToLatLon(x, y) {
        // 지구의 반지름 (미터 단위)
        const R = 6378137;
    
        // x 좌표 -> 경도(lon) 변환
        const lon = (x / R) * (180 / Math.PI);
    
        // y 좌표 -> 위도(lat) 변환
        const lat = (Math.atan(Math.exp(y / R)) * 2 - Math.PI / 2) * (180 / Math.PI);
    
        return { lat: lat, lng: lon };
    }


    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // 지구의 반지름 (미터 단위)
        const radLat1 = lat1 * Math.PI / 180;
        const radLat2 = lat2 * Math.PI / 180;
        const deltaLat = (lat2 - lat1) * Math.PI / 180;
        const deltaLon = (lon2 - lon1) * Math.PI / 180;
    
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(radLat1) * Math.cos(radLat2) *
                  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = R * c; // 두 지점 사이의 거리 (미터 단위)
        return distance;
    }
    
    // 중심점과 경계점 사이의 반경을 계산
    calculateRadiusFromBounds(latMin, lonMin, latMax, lonMax) {
        const centerLat = (latMin + latMax) / 2;
        const centerLon = (lonMin + lonMax) / 2;
    
        // 중심점에서 경계점까지의 거리 (반경)
        const radius = this.calculateDistance(centerLat, centerLon, latMax, lonMax);
        return radius;
    }

    delay(millis){
        return new Promise(function(resolve){
            setTimeout(resolve,millis);
        });
    }
}