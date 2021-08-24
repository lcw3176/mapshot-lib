class Tile{
    constructor(){
        this.width;
        this.height; // 로고 없을 때
        this.logoHeight; // 로고 있을 때

        const defaultHeight = 1000;
        const logoRemover = 26;
    }

    generate(latlng, quality){
        var correctFix;

        const controlPoint = 37.5668;

        if(quality.HIGH){
            correctFix = 0.00002833;
            this.width = 0.00268;
            this.height = 0.002070; 
            this.logoHeight = 0.00204;

        } else if(quality.NORMAL){
            correctFix = 0.00011633;
            this.width = 0.01072;
            this.height = 0.00829;
            this.logoHeight = 0.00817;

        } else{
            throw "Parameter is not QUALITY";
        }

        this.height += (controlPoint - latlng.getY()) * correctFix;
        this.logoHeight += (controlPoint - latlng.getY()) * correctFix;
    }

    getWidthBetweenBlock(){
        return this.width;
    }

    getHeightBetweenBlockNoLogo(){
        return this.height;
    }

    getHeightBetweenBlockWithLogo(){
        return this.logoHeight;
    }


    getSE(sideBlockCount, coor){
        var Lat = coor.getY() - this.height * parseInt(sideBlockCount / 2) - this.height / 2;
        var Lng = coor.getX() + this.width * parseInt(sideBlockCount / 2) + this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getSW(sideBlockCount, coor){
        var Lat = coor.getY() - this.height * parseInt(sideBlockCount / 2) - this.height / 2;
        var Lng = coor.getX() - this.width * parseInt(sideBlockCount / 2) - this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getNE(sideBlockCount, coor){
        var Lat = coor.getY() + this.height * parseInt(sideBlockCount / 2) + this.height / 2;
        var Lng = coor.getX() + this.width * parseInt(sideBlockCount / 2) + this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }


    getNW(sideBlockCount, coor){
        var Lat = coor.getY() + this.height * parseInt(sideBlockCount / 2) + this.height / 2;
        var Lng = coor.getX() - this.width * parseInt(sideBlockCount / 2) - this.width / 2;

        return new mapshot.coors.LatLng(Lat, Lng);
    }

    drawTile(canvas, sideBlockCount){
        var canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

        var temp = tile.getNW(blockCount, nFix, coor);
        var startCoor = new mapshot.coors.LatLng(
            temp.getX() + getWidthBetweenBlock() / 2,
            temp.getY() - getHeightBetweenBlock() / 2
        );

        var returnXValue = startCoor.getX();

    }
}