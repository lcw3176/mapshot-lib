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

    setLevel(radius) {

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
        this.setLevel(radius);
        this.generate(latlng);

        let Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.sideBlockCount / 2) - this.noLogoHeight / 2;
        let Lng = latlng.getX() + this.width * parseInt(radius.sideBlockCount / 2) + this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getSW(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        let Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.sideBlockCount / 2) - this.noLogoHeight / 2;
        let Lng = latlng.getX() - this.width * parseInt(radius.sideBlockCount / 2) - this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getNE(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        let Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.sideBlockCount / 2) + this.noLogoHeight / 2;
        let Lng = latlng.getX() + this.width * parseInt(radius.sideBlockCount / 2) + this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getNW(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        let Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.sideBlockCount / 2) + this.noLogoHeight / 2;
        let Lng = latlng.getX() - this.width * parseInt(radius.sideBlockCount / 2) - this.width / 2;

        return new LatLng(Lat, Lng);
    }

    draw(centerLatLng, radius, naverProfile, onSuccess) {
        this.setLevel(radius);
        const defaultBlockHeight = 1000;
        const logoRemover = 27;

        let sideBlockCount = radius.sideBlockCount;
        let canvas = document.createElement("canvas");
        let canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        canvas.width = sideBlockCount * canvasBlockSize;
        canvas.height = sideBlockCount * canvasBlockSize;

        let ctx = canvas.getContext("2d");
        let temp = this.getNW(radius, centerLatLng);
        let startLatLng = new LatLng(
            temp.getX() + this.width / 2,
            temp.getY() - this.noLogoHeight / 2
        );

        let returnXValue = startLatLng.getX();
        let order = 0;
        let isCorner = false;
        let total = sideBlockCount * sideBlockCount;
        let complete = 0;
        naverProfile.setHeight(1000);

        let mapshotTileOnLoadStartEvent = new CustomEvent("mapshotTileOnLoadStart", {
            detail: {
                total: total
            }

        });

        document.body.dispatchEvent(mapshotTileOnLoadStartEvent);

        for (let i = 0; i < sideBlockCount; i++) {
            for (let j = 0; j < sideBlockCount; j++) {

                if (i + 1 === sideBlockCount && j === 0) {
                    naverProfile.setHeight(1000 - logoRemover);
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.noLogoHeight);
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.withLogoHeight);
                    isCorner = true;
                }

                naverProfile.setCenter(startLatLng);
                
                let xPos = (order % sideBlockCount) * canvasBlockSize;
                let yPos = parseInt(order / sideBlockCount) * canvasBlockSize;

                this.processImage(naverProfile.getUrl(), xPos, yPos, defaultBlockHeight - logoRemover, canvasBlockSize, ctx, 0)
                    .then((isSuccess) => {
                        complete++;

                        if (complete >= total) {
                            onSuccess(canvas);
                        }
                    });

                order++;
                startLatLng.init(startLatLng.getX() + this.width, startLatLng.getY());

                if (isCorner) {
                    naverProfile.setHeight(1000);
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.withLogoHeight);
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.noLogoHeight);
                    isCorner = false;
                }
            }

            startLatLng.init(returnXValue, startLatLng.getY() - this.noLogoHeight);
        }
    }

    async drawLayers(centerLatLng, radius, layerProfile, canvas, onSuccess) {
        this.setLevel(radius);
        const defaultBlockHeight = 1000;
 
        let sideBlockCount = radius.sideBlockCount;
        let canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        if(canvas == null){
            canvas = document.createElement("canvas");

            canvas.width = sideBlockCount * canvasBlockSize;
            canvas.height = sideBlockCount * canvasBlockSize;
        }

        let ctx = canvas.getContext("2d");
        let temp = this.getNW(radius, centerLatLng);
        let startLatLng = new LatLng(
            temp.getX() + this.width / 2,
            temp.getY() - this.noLogoHeight / 2
        );

        let returnXValue = startLatLng.getX();
        let order = 0;
        let total = sideBlockCount * sideBlockCount;
        let complete = 0;
        layerProfile.setHeight(defaultBlockHeight);

        let mapshotTileOnLoadStartEvent = new CustomEvent("mapshotTileOnLoadStart", {
            detail: {
                total: total
            }

        });

        document.body.dispatchEvent(mapshotTileOnLoadStartEvent);

        for (let i = 0; i < sideBlockCount; i++) {
            for (let j = 0; j < sideBlockCount; j++) {

                let offsetY = this.noLogoHeight / 2;
                let offsetX = this.width / 2;

                let yMin = startLatLng.getY() - offsetY;
                let xMin = startLatLng.getX() - offsetX;

                let yMax = startLatLng.getY() + offsetY;
                let xMax = startLatLng.getX() + offsetX;


                layerProfile.setYMin(yMin);
                layerProfile.setXMin(xMin);
                layerProfile.setYMax(yMax);
                layerProfile.setXMax(xMax);
                
                let xPos = (order % sideBlockCount) * canvasBlockSize;
                let yPos = parseInt(order / sideBlockCount) * canvasBlockSize;
                
                this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, 0)
                    .then((isSuccess) => {
                        complete++;

                        if (complete >= total) {
                            onSuccess(canvas);
                        }
                    });

                order++;
                startLatLng.init(startLatLng.getX() + this.width, startLatLng.getY());
                
                await this.delay(50);
            }

            startLatLng.init(returnXValue, startLatLng.getY() - this.noLogoHeight);
        }

    }

    async processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, retryCount) {
        return new Promise((resolve) => {
            let image = new Image();
            image.crossOrigin = "*";
            image.src = url;
            
            image.onload = function () {
                ctx.drawImage(image, 0, 0, image.width, defaultBlockHeight, xPos, yPos, canvasBlockSize, canvasBlockSize);
                let mapshotTileOnProgressEvent = new CustomEvent("mapshotTileOnProgress");

                document.body.dispatchEvent(mapshotTileOnProgressEvent);

                resolve(true);
            };
    
            image.onerror = function () {
                if(retryCount >= 1){
                    let mapshotTileOnErrorEvent = new CustomEvent("mapshotTileOnError");

                    document.body.dispatchEvent(mapshotTileOnErrorEvent);
                    resolve(true);
                } else {
                    resolve(this.processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, retryCount + 1));
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