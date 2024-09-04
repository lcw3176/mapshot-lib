export class Tile {
    constructor() {
        this.imageHeight = 1000;
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


    async drawLayers(ne, sw, center, canvas, templateWidth, layerProfile) {
        canvas.width = templateWidth;
        canvas.height = templateWidth;

        let ctx = canvas.getContext("2d");
   
        
        let radiusMeter = this.calculateRadiusFromBounds(sw.getY(), sw.getX(), ne.getY(), ne.getX()); 
        let fixedCoord = this.getBoundingBox(center.getY(), center.getX(), radiusMeter)
        const tiles = this.generateTilesByBounds(fixedCoord.latMin, fixedCoord.lngMin, fixedCoord.latMax, fixedCoord.lngMax, templateWidth);

        layerProfile.setHeight(this.imageHeight);

        let index = 0;
        
        for(const tile of tiles) {

            layerProfile.setYMin(tile.latMin);
            layerProfile.setXMin(tile.lngMin);
            layerProfile.setYMax(tile.latMax);
            layerProfile.setXMax(tile.lngMax);

            let xPos = parseInt(index * this.imageHeight % templateWidth);
            let yPos = parseInt(index * this.imageHeight / templateWidth) * this.imageHeight;
            

            let success = await this.processImage(layerProfile.getUrl(), xPos, yPos, this.imageHeight, ctx);

            if(!success){
                await this.processImage(layerProfile.getUrl(), xPos, yPos, this.imageHeight, ctx);
            }

            await this.delay(100);
            index++;
        };

    }

    async processImage(url, xPos, yPos, defaultBlockHeight, ctx) {
        return new Promise((resolve) => {
            let image = new Image();
            image.crossOrigin = "*";
            image.src = url;
            
            console.log(xPos, yPos, defaultBlockHeight);
            image.onload = function () {
                ctx.drawImage(image, xPos, yPos, defaultBlockHeight, defaultBlockHeight);
                resolve(true);
            };
    
            image.onerror = function () {
                resolve(false);
            };
        });
    }


    generateTilesByBounds(latMin, lngMin, latMax, lngMax, templateWidth) {
        let divide = templateWidth / this.imageHeight;

        const boundsMin = this.latLonToMercator(latMin, lngMin);
        const boundsMax = this.latLonToMercator(latMax, lngMax);

        let latOffset = (boundsMax.y - boundsMin.y) / divide;
        let lngOffset = (boundsMax.x - boundsMin.x) / divide;

        let startLat = boundsMax.y - latOffset / 2;
        let startLng = boundsMin.x + lngOffset / 2;
     
        let movingLat = startLat;
        let movingLng = startLng;

        const tiles = [];

        for (let y = 0; y < divide; y++) {
            for (let x = 0; x < divide; x++) {
                
                const tileMinLat = movingLat - latOffset / 2;
                const tileMaxLat = movingLat + latOffset / 2;
                const tileMinLng = movingLng - lngOffset / 2;
                const tileMaxLng = movingLng + lngOffset / 2;
                
                let ne = this.mercatorToLatLon(tileMaxLng, tileMaxLat);
                let sw = this.mercatorToLatLon(tileMinLng, tileMinLat);

                tiles.push({
                    latMin: sw.lat,
                    lngMin: sw.lng,
                    latMax: ne.lat,
                    lngMax: ne.lng
                });

                movingLng = movingLng + lngOffset;
            }

            movingLng = startLng;
            movingLat = movingLat - latOffset;
        }

        return tiles;
    }


    getBoundingBox(lat, lon, radius) {
        const R = 6378137;
    
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
        const R = 6378137;

        const x = R * (lon * Math.PI / 180);
        const y = R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));

        return { x: x, y: y };
    }

    mercatorToLatLon(x, y) {
        const R = 6378137;
    
        const lon = (x / R) * (180 / Math.PI);
    
        const lat = (Math.atan(Math.exp(y / R)) * 2 - Math.PI / 2) * (180 / Math.PI);
    
        return { lat: lat, lng: lon };
    }


    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const radLat1 = lat1 * Math.PI / 180;
        const radLat2 = lat2 * Math.PI / 180;
        const deltaLat = (lat2 - lat1) * Math.PI / 180;
        const deltaLon = (lon2 - lon1) * Math.PI / 180;
    
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(radLat1) * Math.cos(radLat2) *
                  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = R * c;
        return distance;
    }
    
    calculateRadiusFromBounds(latMin, lonMin, latMax, lonMax) {
        const centerLat = (latMin + latMax) / 2;
        const centerLon = (lonMin + lonMax) / 2;

        const radius = Math.max(this.calculateDistance(centerLat, centerLon, centerLat, lonMax), this.calculateDistance(centerLat, centerLon, latMax, centerLon));

        return radius;
    }

    delay(millis){
        return new Promise(function(resolve){
            setTimeout(resolve,millis);
        });
    }
}