export class NaverTile {
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

        if (radius.Naver.zoom === Radius.One.Naver.zoom || radius.Naver.zoom === Radius.Two.Naver.zoom) {
            this.correctFix = 0.00002833;
            this.width = 0.00268;
            this.noLogoValue = 0.002070;
            this.withLogoValue = 0.00204;

        } else if (radius.Naver.zoom === Radius.Five.Naver.zoom || radius.Naver.zoom === Radius.Ten.Naver.zoom) {
            this.correctFix = 0.00011633;
            this.width = 0.01072;
            this.noLogoValue = 0.00829;
            this.withLogoValue = 0.00817;
        } else {
            throw "Parameter is not radius Type";
        }
    }

    getWidthBetweenBlock() {
        return this.width;
    }

    getHeightBetweenBlockNoLogo() {
        return this.noLogoHeight;
    }

    getHeightBetweenBlockWithLogo() {
        return this.withLogoHeight;
    }


    getSE(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        var Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) - this.noLogoHeight / 2;
        var Lng = latlng.getX() + this.width * parseInt(radius.Naver.sideBlockCount / 2) + this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getSW(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        var Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) - this.noLogoHeight / 2;
        var Lng = latlng.getX() - this.width * parseInt(radius.Naver.sideBlockCount / 2) - this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getNE(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        var Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) + this.noLogoHeight / 2;
        var Lng = latlng.getX() + this.width * parseInt(radius.Naver.sideBlockCount / 2) + this.width / 2;

        return new LatLng(Lat, Lng);
    }


    getNW(radius, latlng) {
        this.setLevel(radius);
        this.generate(latlng);

        var Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) + this.noLogoHeight / 2;
        var Lng = latlng.getX() - this.width * parseInt(radius.Naver.sideBlockCount / 2) - this.width / 2;

        return new LatLng(Lat, Lng);
    }

    draw(centerLatLng, radiusConfig, naverProfile, onSuccess) {
        this.setLevel(radiusConfig);
        const defaultBlockHeight = 1000;
        const logoRemover = 27;

        var sideBlockCount = radiusConfig.Naver.sideBlockCount;
        var canvas = document.createElement("canvas");
        var canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        canvas.width = sideBlockCount * canvasBlockSize;
        canvas.height = sideBlockCount * canvasBlockSize;

        var ctx = canvas.getContext("2d");
        var temp = this.getNW(radiusConfig, centerLatLng);
        var startLatLng = new LatLng(
            temp.getX() + this.getWidthBetweenBlock() / 2,
            temp.getY() - this.getHeightBetweenBlockNoLogo() / 2
        );

        var returnXValue = startLatLng.getX();
        var order = 0;
        var isCorner = false;
        var total = sideBlockCount * sideBlockCount;
        var complete = 0;
        naverProfile.setHeight(1000);

        var naverTileOnLoadStartEvent = new CustomEvent("naverTileOnLoadStart", {
            detail: {
                total: total
            }

        });

        var naverTileOnProgressEvent = new CustomEvent("naverTileOnProgress");
        var naverTileOnErrorEvent = new CustomEvent("naverTileOnError");

        document.body.dispatchEvent(naverTileOnLoadStartEvent);
        for (var i = 0; i < sideBlockCount; i++) {
            for (var j = 0; j < sideBlockCount; j++) {

                if (i + 1 === sideBlockCount && j === 0) {
                    naverProfile.setHeight(1000 - logoRemover);
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.getHeightBetweenBlockNoLogo());
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.getHeightBetweenBlockWithLogo());
                    isCorner = true;
                }

                naverProfile.setCenter(startLatLng);

                var image = new Image();
                image.crossOrigin = "*";
                image.src = naverProfile.getUrl();

                (function (_order, _image) {
                    var xPos = (_order % sideBlockCount) * canvasBlockSize;
                    var yPos = parseInt(_order / sideBlockCount) * canvasBlockSize;

                    _image.onload = function () {
                        ctx.drawImage(_image, 0, 0, _image.width, defaultBlockHeight - logoRemover, xPos, yPos, canvasBlockSize, canvasBlockSize);
                        complete++;
                        document.body.dispatchEvent(naverTileOnProgressEvent);

                        if (complete == total) {
                            onSuccess(canvas);
                        }
                    }

                    _image.onerror = function () {
                        complete++;
                        document.body.dispatchEvent(naverTileOnErrorEvent);

                        if (complete == total) {
                            onSuccess(canvas);
                        }
                    }

                })(order, image)

                order++;
                startLatLng.init(startLatLng.getX() + this.getWidthBetweenBlock(), startLatLng.getY());

                if (isCorner) {
                    naverProfile.setHeight(1000);
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.getHeightBetweenBlockWithLogo());
                    startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.getHeightBetweenBlockNoLogo());
                    isCorner = false;
                }
            }

            startLatLng.init(returnXValue, startLatLng.getY() - this.getHeightBetweenBlockNoLogo());
        }
    }

    async drawLayers(centerLatLng, radiusConfig, layerProfile, canvas, onSuccess) {
        this.setLevel(radiusConfig);
        const defaultBlockHeight = 1000;
 
        let sideBlockCount = radiusConfig.Naver.sideBlockCount;
        let canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        if(canvas == null){
            canvas = document.createElement("canvas");

            canvas.width = sideBlockCount * canvasBlockSize;
            canvas.height = sideBlockCount * canvasBlockSize;
        }

        let ctx = canvas.getContext("2d");
        let temp = this.getNW(radiusConfig, centerLatLng);
        let startLatLng = new LatLng(
            temp.getX() + this.getWidthBetweenBlock() / 2,
            temp.getY() - this.getHeightBetweenBlockNoLogo() / 2
        );

        let returnXValue = startLatLng.getX();
        let order = 0;
        let total = sideBlockCount * sideBlockCount;

        layerProfile.setHeight(defaultBlockHeight);

        let naverTileOnLoadStartEvent = new CustomEvent("naverTileOnLoadStart", {
            detail: {
                total: total
            }

        });

        let naverTileOnProgressEvent = new CustomEvent("naverTileOnProgress");
        let naverTileOnErrorEvent = new CustomEvent("naverTileOnError");

        document.body.dispatchEvent(naverTileOnLoadStartEvent);
        for (let i = 0; i < sideBlockCount; i++) {
            for (let j = 0; j < sideBlockCount; j++) {

                let offsetY = this.getHeightBetweenBlockNoLogo() / 2;
                let offsetX = this.getWidthBetweenBlock() / 2;

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
                
                let result = await this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, naverTileOnProgressEvent, naverTileOnErrorEvent, 0);
                
                if(!result){
                    await this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, naverTileOnProgressEvent, naverTileOnErrorEvent, 1);
                }

                order++;
                startLatLng.init(startLatLng.getX() + this.getWidthBetweenBlock(), startLatLng.getY());

            }

            startLatLng.init(returnXValue, startLatLng.getY() - this.getHeightBetweenBlockNoLogo());
        }

        onSuccess(canvas);
    }

    async processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, naverTileOnProgressEvent, naverTileOnErrorEvent, retryCount) {
        return new Promise((resolve) => {
            let image = new Image();
            image.crossOrigin = "*";
            image.src = url;

            image.onload = function () {
                ctx.drawImage(image, 0, 0, image.width, defaultBlockHeight, xPos, yPos, canvasBlockSize, canvasBlockSize);
                document.body.dispatchEvent(naverTileOnProgressEvent);

                resolve(true);
            };
    
            image.onerror = function () {
                if(retryCount >= 1){
                    document.body.dispatchEvent(naverTileOnErrorEvent);
                }
                resolve(false);
            };
        });
    }

    delay(millis){
        return new Promise(function(resolve){
            setTimeout(resolve,millis);
        });
    }
}