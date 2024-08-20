export class LatLng {
    constructor() {
        this.x;
        this.y;
    }

    init(lat, lng) {
        this.y = lat;
        this.x = lng; 
        // if (lat > lng) {
        //     this.x = lat
        //     this.y = lng
        // } else {
        //     this.x = lng
        //     this.y = lat;
        // }
    }


    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}