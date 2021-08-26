class Tile{
    constructor(){
        this.width;
        this.noLogoHeight; // 로고 없을 때
        this.withLogoHeight; // 로고 있을 때

        this.noLogoValue;
        this.withLogoValue;
        this.correctFix;

        this.total = 0;
        this.complete = 0;

        this.tileImageLoadStartEvent = new CustomEvent("tileImageLoadStart",{
            total:this.total
        });

        this.tileImageOnLoadEvent = new CustomEvent("tileImageOnLoad",{
            complete:this.complete
        });
        this.tileImageOnErrorEvent = new CustomEvent("tileImageOnError", {
            complete:this.complete
        });
    }

    generate(latlng){
        const controlPoint = 37.5668;

        this.noLogoHeight = this.noLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
        this.withLogoHeight = this.withLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
        
    }

    setQuality(quality){

        if(quality == mapshot.Quality.HIGH){
            this.quality = quality;
            this.correctFix = 0.00002833;
            this.width = 0.00268;
            this.noLogoValue = 0.002070; 
            this.withLogoValue = 0.00204;

        } else if(quality == mapshot.Quality.NORMAL){
            this.correctFix = 0.00011633;
            this.width = 0.01072;
            this.noLogoValue = 0.00829;
            this.withLogoValue = 0.00817;
        } else{
            throw "Parameter is not Quality Type";
        }   
    }

    getWidthBetweenBlock(){
        return this.width;
    }

    getHeightBetweenBlockNoLogo(){
        return this.noLogoHeight;
    }

    getHeightBetweenBlockWithLogo(){
        return this.withLogoHeight;
    }


    getSE(sideBlockCount, latlng){
        this.generate(latlng);

        var Lat = latlng.getY() - this.noLogoHeight * parseInt(sideBlockCount / 2) - this.noLogoHeight / 2;
        var Lng = latlng.getX() + this.width * parseInt(sideBlockCount / 2) + this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getSW(sideBlockCount, latlng){
        this.generate(latlng);

        var Lat = latlng.getY() - this.noLogoHeight * parseInt(sideBlockCount / 2) - this.noLogoHeight / 2;
        var Lng = latlng.getX() - this.width * parseInt(sideBlockCount / 2) - this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getNE(sideBlockCount, latlng){
        this.generate(latlng);

        var Lat = latlng.getY() + this.noLogoHeight * parseInt(sideBlockCount / 2) + this.noLogoHeight / 2;
        var Lng = latlng.getX() + this.width * parseInt(sideBlockCount / 2) + this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getNW(sideBlockCount, latlng){
        this.generate(latlng);

        var Lat = latlng.getY() + this.noLogoHeight * parseInt(sideBlockCount / 2) + this.noLogoHeight / 2;
        var Lng = latlng.getX() - this.width * parseInt(sideBlockCount / 2) - this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }

    draw(centerLatLng, sideBlockCount, naverProfile, callback){
        const defaultBlockHeight = 1000;
        const logoRemover = 27;

        var canvas = document.createElement("canvas");
        var canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        canvas.width = sideBlockCount * canvasBlockSize;
        canvas.height = sideBlockCount * (defaultBlockHeight - logoRemover);

        var ctx = canvas.getContext("2d");
        var temp = this.getNW(sideBlockCount, centerLatLng);
        var startLatLng = new mapshot.coors.LatLng(
            temp.getX() + this.getWidthBetweenBlock() / 2,
            temp.getY() - this.getHeightBetweenBlockNoLogo() / 2
        );

        var returnXValue = startLatLng.getX();
        var order = 0;
        var isCorner = false;
        this.total = sideBlockCount * sideBlockCount;
        this.complete = 0;

        document.body.dispatchEvent(this.tileImageLoadStartEvent);
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
                        this.complete++;
                        document.body.dispatchEvent(this.tileImageLoadEvent);

                        if (this.complete == this.total) {
                            callback(canvas);
                        }
                    }

                    _image.onerror = function () {
                        this.complete++;
                        document.body.dispatchEvent(this.tileImageErrorEvent);

                        if (this.complete == this.total) {
                            callback(canvas);
                        }
                    }

                })(order, image)

                order++;
                startLatLng.init(startLatLng.getX() + this.getHeightBetweenBlockNoLogo(), startLatLng.getY());

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
}