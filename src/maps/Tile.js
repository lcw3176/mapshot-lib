export class Tile {
    constructor() {
        this.width;
        this.noLogoHeight; // 로고 없을 때
        this.withLogoHeight; // 로고 있을 때

        this.noLogoValue;
        this.withLogoValue;
        this.correctFix;

    }

    generate(latlng) {
        const controlPoint = 37.5668;

        this.noLogoHeight = this.noLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
        this.withLogoHeight = this.withLogoValue + (controlPoint - latlng.getY()) * this.correctFix;

    }

    refineValues(radius) {

        if (radius.zoom === Radius.One.zoom || radius.zoom === Radius.Two.zoom) {
            this.correctFix = 0.00002833;
            this.width = 0.00268;
            this.noLogoValue = 0.002070;
            this.withLogoValue = 0.00204;

        } else if (radius.zoom === Radius.Five.zoom || radius.zoom === Radius.Ten.zoom) {
            this.correctFix = 0.00011633;
            this.width = 0.01072;
            this.noLogoValue = 0.00829;
            this.withLogoValue = 0.00817;
        } else {
            throw "Parameter is not radius Type";
        }
    }


    getSE(radius, latlng) {
        this.refineValues(radius);
        this.generate(latlng);

        let Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.sideBlockCount / 2) - this.noLogoHeight / 2;
        let Lng = latlng.getX() + this.width * parseInt(radius.sideBlockCount / 2) + this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getSW(radius, latlng) {
        this.refineValues(radius);
        this.generate(latlng);

        let Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.sideBlockCount / 2) - this.noLogoHeight / 2;
        let Lng = latlng.getX() - this.width * parseInt(radius.sideBlockCount / 2) - this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getNE(radius, latlng) {
        this.refineValues(radius);
        this.generate(latlng);

        let Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.sideBlockCount / 2) + this.noLogoHeight / 2;
        let Lng = latlng.getX() + this.width * parseInt(radius.sideBlockCount / 2) + this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getNW(radius, latlng) {
        this.refineValues(radius);
        this.generate(latlng);

        let Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.sideBlockCount / 2) + this.noLogoHeight / 2;
        let Lng = latlng.getX() - this.width * parseInt(radius.sideBlockCount / 2) - this.width / 2;

        return new LatLng(Lat, Lng);
    }


    async drawLayers(centerLatLng, nwLatLng, canvas, width, layerProfile) {
        const defaultBlockHeight = 500;
 
        canvas.width = width;
        canvas.height = width;

        let heightOffset =  (((nwLatLng.getY() - centerLatLng.getY()) * 2) / (width / defaultBlockHeight)) / 2;
        let widthOffset =  (((centerLatLng.getX() - nwLatLng.getX()) * 2) / (width / defaultBlockHeight)) / 2;
        
        let ctx = canvas.getContext("2d");
        let startLatLng = new LatLng(
            nwLatLng.getY() - heightOffset,
            nwLatLng.getX() + widthOffset,
        );

        let sideBlockCount = width / defaultBlockHeight;
        let fisrtXValue = startLatLng.getX();
        let order = 0;
        layerProfile.setHeight(defaultBlockHeight);

        for (let i = 0; i < sideBlockCount; i++) {
            for (let j = 0; j < sideBlockCount; j++) {
                let yMin = startLatLng.getY() - heightOffset;
                let xMin = startLatLng.getX() - widthOffset;

                let yMax = startLatLng.getY() + heightOffset;
                let xMax = startLatLng.getX() + widthOffset;


                layerProfile.setYMin(yMin);
                layerProfile.setXMin(xMin);
                layerProfile.setYMax(yMax);
                layerProfile.setXMax(xMax);
                
                let xPos = (order % sideBlockCount) * defaultBlockHeight;
                let yPos = parseInt(order / sideBlockCount) * defaultBlockHeight;
                
                await this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, ctx, 0);

                order++;
                startLatLng.init(startLatLng.getX() + widthOffset * 2, startLatLng.getY());
                
                await this.delay(100);
            }

            startLatLng.init(fisrtXValue, startLatLng.getY() - heightOffset * 2);
        }

    }

    async processImage(url, xPos, yPos, defaultBlockHeight, ctx, retryCount) {
        return new Promise((resolve) => {
            let image = new Image();
            image.crossOrigin = "*";
            image.src = url;
            
            image.onload = function () {
                ctx.drawImage(image, 0, 0, image.width, defaultBlockHeight, xPos, yPos, defaultBlockHeight, defaultBlockHeight);
                resolve(true);
            };
    
            image.onerror = function () {
                if(retryCount >= 1){
                    resolve(true);
                } else {
                    resolve(this.processImage(url, xPos, yPos, defaultBlockHeight, ctx, retryCount + 1));
                }
            };
        });
    }

    delay(millis){
        return new Promise(function(resolve){
            setTimeout(resolve,millis);
        });
    }
}