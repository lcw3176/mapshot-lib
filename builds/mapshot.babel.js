"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LatLng = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LatLng = exports.LatLng = /*#__PURE__*/function () {
  function LatLng(lat, lng) {
    _classCallCheck(this, LatLng);
    this.x;
    this.y;
    if (lat != undefined && lng != undefined) {
      this.init(lat, lng);
    }
  }
  return _createClass(LatLng, [{
    key: "init",
    value: function init(lat, lng) {
      if (lat > lng) {
        this.x = lat;
        this.y = lng;
      } else {
        this.x = lng;
        this.y = lat;
      }
    }
  }, {
    key: "getX",
    value: function getX() {
      return this.x;
    }
  }, {
    key: "getY",
    value: function getY() {
      return this.y;
    }
  }]);
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tile = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Tile = exports.Tile = /*#__PURE__*/function () {
  function Tile() {
    _classCallCheck(this, Tile);
    this.width;
    this.noLogoHeight; // 로고 없을 때
    this.withLogoHeight; // 로고 있을 때

    this.noLogoValue;
    this.withLogoValue;
    this.correctFix;
  }
  return _createClass(Tile, [{
    key: "generate",
    value: function generate(latlng) {
      var controlPoint = 37.5668;
      this.noLogoHeight = this.noLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
      this.withLogoHeight = this.withLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
    }
  }, {
    key: "setLevel",
    value: function setLevel(radius) {
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
  }, {
    key: "getSE",
    value: function getSE(radius, latlng) {
      this.setLevel(radius);
      this.generate(latlng);
      var Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.sideBlockCount / 2) - this.noLogoHeight / 2;
      var Lng = latlng.getX() + this.width * parseInt(radius.sideBlockCount / 2) + this.width / 2;
      return new LatLng(Lat, Lng);
    }
  }, {
    key: "getSW",
    value: function getSW(radius, latlng) {
      this.setLevel(radius);
      this.generate(latlng);
      var Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.sideBlockCount / 2) - this.noLogoHeight / 2;
      var Lng = latlng.getX() - this.width * parseInt(radius.sideBlockCount / 2) - this.width / 2;
      return new LatLng(Lat, Lng);
    }
  }, {
    key: "getNE",
    value: function getNE(radius, latlng) {
      this.setLevel(radius);
      this.generate(latlng);
      var Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.sideBlockCount / 2) + this.noLogoHeight / 2;
      var Lng = latlng.getX() + this.width * parseInt(radius.sideBlockCount / 2) + this.width / 2;
      return new LatLng(Lat, Lng);
    }
  }, {
    key: "getNW",
    value: function getNW(radius, latlng) {
      this.setLevel(radius);
      this.generate(latlng);
      var Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.sideBlockCount / 2) + this.noLogoHeight / 2;
      var Lng = latlng.getX() - this.width * parseInt(radius.sideBlockCount / 2) - this.width / 2;
      return new LatLng(Lat, Lng);
    }

    // async draw(centerLatLng, radius, naverProfile, onSuccess) {
    //     this.setLevel(radius);
    //     const defaultBlockHeight = 1000;
    //     const logoRemover = 27;

    //     let sideBlockCount = radius.sideBlockCount;
    //     let canvas = document.createElement("canvas");
    //     let canvasBlockSize = (sideBlockCount <= 11) ? 1000 : 500;

    //     canvas.width = sideBlockCount * canvasBlockSize;
    //     canvas.height = sideBlockCount * canvasBlockSize;

    //     let ctx = canvas.getContext("2d");
    //     let temp = this.getNW(radius, centerLatLng);
    //     let startLatLng = new LatLng(
    //         temp.getX() + this.width / 2,
    //         temp.getY() - this.noLogoHeight / 2
    //     );

    //     let returnXValue = startLatLng.getX();
    //     let order = 0;
    //     let isCorner = false;
    //     let total = sideBlockCount * sideBlockCount;
    //     let complete = 0;
    //     naverProfile.setHeight(1000);

    //     let mapshotTileOnLoadStartEvent = new CustomEvent("mapshotTileOnLoadStart", {
    //         detail: {
    //             total: total
    //         }

    //     });

    //     document.body.dispatchEvent(mapshotTileOnLoadStartEvent);

    //     for (let i = 0; i < sideBlockCount; i++) {
    //         for (let j = 0; j < sideBlockCount; j++) {

    //             if (i + 1 === sideBlockCount && j === 0) {
    //                 naverProfile.setHeight(1000 - logoRemover);
    //                 startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.noLogoHeight);
    //                 startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.withLogoHeight);
    //                 isCorner = true;
    //             }

    //             naverProfile.setCenter(startLatLng);

    //             let xPos = (order % sideBlockCount) * canvasBlockSize;
    //             let yPos = parseInt(order / sideBlockCount) * canvasBlockSize;

    //             this.processImage(naverProfile.getUrl(), xPos, yPos, defaultBlockHeight - logoRemover, canvasBlockSize, ctx, 0)
    //                 .then((isSuccess) => {
    //                     complete++;

    //                     if (complete >= total) {
    //                         onSuccess(canvas);
    //                     }
    //                 });

    //             order++;
    //             startLatLng.init(startLatLng.getX() + this.width, startLatLng.getY());

    //             if (isCorner) {
    //                 naverProfile.setHeight(1000);
    //                 startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.withLogoHeight);
    //                 startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.noLogoHeight);
    //                 isCorner = false;
    //             }

    //             await this.delay(100);
    //         }

    //         startLatLng.init(returnXValue, startLatLng.getY() - this.noLogoHeight);
    //     }
    // }

    // async processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, retryCount) {
    //     return new Promise((resolve) => {
    //         let image = new Image();
    //         image.crossOrigin = "*";
    //         image.src = url;

    //         image.onload = function () {
    //             ctx.drawImage(image, 0, 0, image.width, defaultBlockHeight, xPos, yPos, canvasBlockSize, canvasBlockSize);
    //             let mapshotTileOnProgressEvent = new CustomEvent("mapshotTileOnProgress");

    //             document.body.dispatchEvent(mapshotTileOnProgressEvent);

    //             resolve(true);
    //         };

    //         image.onerror = function () {
    //             if(retryCount >= 1){
    //                 let mapshotTileOnErrorEvent = new CustomEvent("mapshotTileOnError");

    //                 document.body.dispatchEvent(mapshotTileOnErrorEvent);
    //                 resolve(true);
    //             } else {
    //                 resolve(this.processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, retryCount + 1));
    //             }
    //         };
    //     });
    // }
  }, {
    key: "delay",
    value: function delay(millis) {
      return new Promise(function (resolve) {
        setTimeout(resolve, millis);
      });
    }
  }]);
}();
// export class Naver {
//     constructor() {
//         this.mapType;
//         this.center;
//         this.level;
//         this.key;
//         this.height;
//     }

//     setMapType(param) {
//         this.mapType = param;
//     }

//     setCenter(param) {
//         this.center = param;
//     }

//     setLevel(radius) {
//         this.level = radius.zoom;
//     }

//     setKey(param) {
//         this.key = param;
//     }

//     setHeight(param) {
//         this.height = param;
//     }

//     getUrl() {
//         return "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?"
//             + "w=1000"
//             + "&h=" + this.height
//             + "&center=" + this.center.getX() + "," + this.center.getY()
//             + "&level=" + this.level
//             + "&X-NCP-APIGW-API-KEY-ID=" + this.key
//             + "&maptype=" + this.mapType;
//     }

// }
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radius = void 0;
var Radius = exports.Radius = {
  One: {
    sideBlockCount: 11,
    zoom: 18,
    level: 1
  },
  Two: {
    sideBlockCount: 17,
    zoom: 18,
    level: 2
  },
  Five: {
    sideBlockCount: 11,
    zoom: 16,
    level: 5
  },
  Ten: {
    sideBlockCount: 21,
    zoom: 16,
    level: 10
  }
};
