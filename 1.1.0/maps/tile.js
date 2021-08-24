class Tile{
    constructor(){
        this.width;
        this.noLogoHeight; // 로고 없을 때
        this.withLogoHeight; // 로고 있을 때
    }

    generate(latlng, quality){
        var correctFix;

        const controlPoint = 37.5668;

        if(quality.HIGH){
            correctFix = 0.00002833;
            this.width = 0.00268;
            this.noLogoHeight = 0.002070; 
            this.withLogoHeight = 0.00204;

        } else if(quality.NORMAL){
            correctFix = 0.00011633;
            this.width = 0.01072;
            this.noLogoHeight = 0.00829;
            this.withLogoHeight = 0.00817;

        } else{
            throw "Parameter is not QUALITY";
        }

        this.noLogoHeight += (controlPoint - latlng.getY()) * correctFix;
        this.withLogoHeight += (controlPoint - latlng.getY()) * correctFix;
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


    getSE(sideBlockCount, coor){
        var Lat = coor.getY() - this.withLogoHeight * parseInt(sideBlockCount / 2) - this.withLogoHeight / 2;
        var Lng = coor.getX() + this.width * parseInt(sideBlockCount / 2) + this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getSW(sideBlockCount, coor){
        var Lat = coor.getY() - this.withLogoHeight * parseInt(sideBlockCount / 2) - this.withLogoHeight / 2;
        var Lng = coor.getX() - this.width * parseInt(sideBlockCount / 2) - this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getNE(sideBlockCount, coor){
        var Lat = coor.getY() + this.withLogoHeight * parseInt(sideBlockCount / 2) + this.withLogoHeight / 2;
        var Lng = coor.getX() + this.width * parseInt(sideBlockCount / 2) + this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getNW(sideBlockCount, coor){
        var Lat = coor.getY() + this.withLogoHeight * parseInt(sideBlockCount / 2) + this.withLogoHeight / 2;
        var Lng = coor.getX() - this.width * parseInt(sideBlockCount / 2) - this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }

    drawTile(canvas, coor, sideBlockCount, naverProfile, callback){
        const defaultBlockHeight = 1000;
        const logoRemover = 27;

        var canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        canvas.width = sideBlockCount * canvasBlockSize;
        canvas.height = sideBlockCount * (defaultBlockHeight - logoRemover);

        var ctx = canvas.getContext("2d");
        var temp = this.getNW(sideBlockCount, coor);
        var startCoor = new mapshot.coors.LatLng(
            temp.getX() + getWidthBetweenBlock() / 2,
            temp.getY() - getHeightBetweenBlock() / 2
        );

        var returnXValue = startCoor.getX();
        var order = 0;
        var isCorner = false;

        for (var i = 0; i < sideBlockCount; i++) {
            for (var j = 0; j < sideBlockCount; j++) {

                if (i + 1 === sideBlockCount && j === 0) {
                    naverProfile.setHeight(1000 - logoRemover);
                    startCoor.init(startCoor.getX(), startCoor.getY() + this.getHeightBetweenBlockNoLogo());
                    startCoor.init(startCoor.getX(), startCoor.getY() - this.getHeightBetweenBlockWithLogo());
                    isCorner = true;
                }

                naverProfile.setCenter(startCoor);

                var image = new Image();
                image.crossOrigin = "*";
                image.src = naverProfile.getUrl();

                (function (_order, _image) {
                    var xPos = (_order % sideBlockCount) * canvasBlockSize;
                    var yPos = parseInt(_order / sideBlockCount) * canvasBlockSize;

                    _image.onload = function () {
                        ctx.drawImage(_image, 0, 0, _image.width, defaultBlockHeight - logoRemover, xPos, yPos, canvasBlockSize, canvasBlockSize);
                        imageLoadCount++;

                        if (imageLoadCount == sideBlockCount * sideBlockCount) {
                            callback();
                        }
                    }

                    _image.onerror = function () {
                        imageLoadCount++;

                        if (imageLoadCount == sideBlockCount * sideBlockCount) {
                            mcallback();
                        }
                    }

                })(order, image)

                order++;
                startCoor.init(startCoor.getX() + this.getHeightBetweenBlockNoLogo(), startCoor.getY());

                if (isCorner) {
                    naverProfile.setHeight(1000);
                    startCoor.init(startCoor.getX(), startCoor.getY() + this.getHeightBetweenBlockWithLogo());
                    startCoor.init(startCoor.getX(), startCoor.getY() - this.getHeightBetweenBlockNoLogo());
                    isCorner = false;
                }
            }

            startCoor.init(returnXValue, startCoor.getY() - this.getHeightBetweenBlockNoLogo());
        }
    }
}