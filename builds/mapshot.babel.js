Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LatLng = exports.LatLng = function () {
    function LatLng(lat, lng) {
        _classCallCheck(this, LatLng);

        this.x;
        this.y;

        if (lat != undefined && lng != undefined) {
            this.init(lat, lng);
        }
    }

    _createClass(LatLng, [{
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

    return LatLng;
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NaverTile = exports.NaverTile = function () {
    function NaverTile() {
        _classCallCheck(this, NaverTile);

        this.width;
        this.noLogoHeight; // 로고 없을 때
        this.withLogoHeight; // 로고 있을 때

        this.noLogoValue;
        this.withLogoValue;
        this.correctFix;
    }

    _createClass(NaverTile, [{
        key: "generate",
        value: function generate(latlng) {
            var controlPoint = 37.5668;

            this.noLogoHeight = this.noLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
            this.withLogoHeight = this.withLogoValue + (controlPoint - latlng.getY()) * this.correctFix;
        }
    }, {
        key: "setLevel",
        value: function setLevel(radius) {

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
    }, {
        key: "getWidthBetweenBlock",
        value: function getWidthBetweenBlock() {
            return this.width;
        }
    }, {
        key: "getHeightBetweenBlockNoLogo",
        value: function getHeightBetweenBlockNoLogo() {
            return this.noLogoHeight;
        }
    }, {
        key: "getHeightBetweenBlockWithLogo",
        value: function getHeightBetweenBlockWithLogo() {
            return this.withLogoHeight;
        }
    }, {
        key: "getSE",
        value: function getSE(radius, latlng) {
            this.setLevel(radius);
            this.generate(latlng);

            var Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) - this.noLogoHeight / 2;
            var Lng = latlng.getX() + this.width * parseInt(radius.Naver.sideBlockCount / 2) + this.width / 2;

            return new LatLng(Lat, Lng);
        }
    }, {
        key: "getSW",
        value: function getSW(radius, latlng) {
            this.setLevel(radius);
            this.generate(latlng);

            var Lat = latlng.getY() - this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) - this.noLogoHeight / 2;
            var Lng = latlng.getX() - this.width * parseInt(radius.Naver.sideBlockCount / 2) - this.width / 2;

            return new LatLng(Lat, Lng);
        }
    }, {
        key: "getNE",
        value: function getNE(radius, latlng) {
            this.setLevel(radius);
            this.generate(latlng);

            var Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) + this.noLogoHeight / 2;
            var Lng = latlng.getX() + this.width * parseInt(radius.Naver.sideBlockCount / 2) + this.width / 2;

            return new LatLng(Lat, Lng);
        }
    }, {
        key: "getNW",
        value: function getNW(radius, latlng) {
            this.setLevel(radius);
            this.generate(latlng);

            var Lat = latlng.getY() + this.noLogoHeight * parseInt(radius.Naver.sideBlockCount / 2) + this.noLogoHeight / 2;
            var Lng = latlng.getX() - this.width * parseInt(radius.Naver.sideBlockCount / 2) - this.width / 2;

            return new LatLng(Lat, Lng);
        }
    }, {
        key: "draw",
        value: function draw(centerLatLng, radiusConfig, naverProfile, onSuccess) {
            this.setLevel(radiusConfig);
            var defaultBlockHeight = 1000;
            var logoRemover = 27;

            var sideBlockCount = radiusConfig.Naver.sideBlockCount;
            var canvas = document.createElement("canvas");
            var canvasBlockSize = sideBlockCount <= 11 ? 1000 : 500;

            canvas.width = sideBlockCount * canvasBlockSize;
            canvas.height = sideBlockCount * canvasBlockSize;

            var ctx = canvas.getContext("2d");
            var temp = this.getNW(radiusConfig, centerLatLng);
            var startLatLng = new LatLng(temp.getX() + this.getWidthBetweenBlock() / 2, temp.getY() - this.getHeightBetweenBlockNoLogo() / 2);

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
                        var xPos = _order % sideBlockCount * canvasBlockSize;
                        var yPos = parseInt(_order / sideBlockCount) * canvasBlockSize;

                        _image.onload = function () {
                            ctx.drawImage(_image, 0, 0, _image.width, defaultBlockHeight - logoRemover, xPos, yPos, canvasBlockSize, canvasBlockSize);
                            complete++;
                            document.body.dispatchEvent(naverTileOnProgressEvent);

                            if (complete == total) {
                                onSuccess(canvas);
                            }
                        };

                        _image.onerror = function () {
                            complete++;
                            document.body.dispatchEvent(naverTileOnErrorEvent);

                            if (complete == total) {
                                onSuccess(canvas);
                            }
                        };
                    })(order, image);

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
    }, {
        key: "drawLayers",
        value: async function drawLayers(centerLatLng, radiusConfig, layerProfile, canvas, onSuccess) {
            var _this = this;

            this.setLevel(radiusConfig);
            var defaultBlockHeight = 1000;

            var sideBlockCount = radiusConfig.Naver.sideBlockCount;
            var canvasBlockSize = sideBlockCount <= 11 ? 1000 : 500;

            if (canvas == null) {
                canvas = document.createElement("canvas");

                canvas.width = sideBlockCount * canvasBlockSize;
                canvas.height = sideBlockCount * canvasBlockSize;
            }

            var ctx = canvas.getContext("2d");
            var temp = this.getNW(radiusConfig, centerLatLng);
            var startLatLng = new LatLng(temp.getX() + this.getWidthBetweenBlock() / 2, temp.getY() - this.getHeightBetweenBlockNoLogo() / 2);

            var returnXValue = startLatLng.getX();
            var order = 0;
            var total = sideBlockCount * sideBlockCount;

            layerProfile.setHeight(defaultBlockHeight);

            var naverTileOnLoadStartEvent = new CustomEvent("naverTileOnLoadStart", {
                detail: {
                    total: total
                }

            });

            var naverTileOnProgressEvent = new CustomEvent("naverTileOnProgress");
            var naverTileOnErrorEvent = new CustomEvent("naverTileOnError");

            document.body.dispatchEvent(naverTileOnLoadStartEvent);
            for (var i = 0; i < sideBlockCount; i++) {
                var _loop = async function _loop(j) {

                    var offsetY = _this.getHeightBetweenBlockNoLogo() / 2;
                    var offsetX = _this.getWidthBetweenBlock() / 2;

                    var yMin = startLatLng.getY() - offsetY;
                    var xMin = startLatLng.getX() - offsetX;

                    var yMax = startLatLng.getY() + offsetY;
                    var xMax = startLatLng.getX() + offsetX;

                    layerProfile.setYMin(yMin);
                    layerProfile.setXMin(xMin);
                    layerProfile.setYMax(yMax);
                    layerProfile.setXMax(xMax);

                    var xPos = order % sideBlockCount * canvasBlockSize;
                    var yPos = parseInt(order / sideBlockCount) * canvasBlockSize;

                    _this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, naverTileOnProgressEvent, naverTileOnErrorEvent, 0).then(function (result) {
                        if (!result) {
                            _this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, naverTileOnProgressEvent, naverTileOnErrorEvent, 1);
                        }
                    });

                    order++;
                    startLatLng.init(startLatLng.getX() + _this.getWidthBetweenBlock(), startLatLng.getY());

                    await _this.delay(50);
                };

                for (var j = 0; j < sideBlockCount; j++) {
                    await _loop(j);
                }

                startLatLng.init(returnXValue, startLatLng.getY() - this.getHeightBetweenBlockNoLogo());
            }

            onSuccess(canvas);
        }
    }, {
        key: "processImage",
        value: async function processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, naverTileOnProgressEvent, naverTileOnErrorEvent, retryCount) {
            return new Promise(function (resolve) {
                var image = new Image();
                image.crossOrigin = "*";
                image.src = url;

                image.onload = function () {
                    ctx.drawImage(image, 0, 0, image.width, defaultBlockHeight, xPos, yPos, canvasBlockSize, canvasBlockSize);
                    document.body.dispatchEvent(naverTileOnProgressEvent);

                    resolve(true);
                };

                image.onerror = function () {
                    if (retryCount >= 1) {
                        document.body.dispatchEvent(naverTileOnErrorEvent);
                    }
                    resolve(false);
                };
            });
        }
    }, {
        key: "delay",
        value: function delay(millis) {
            return new Promise(function (resolve) {
                setTimeout(resolve, millis);
            });
        }
    }]);

    return NaverTile;
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = exports.Layer = function () {
    function Layer() {
        _classCallCheck(this, Layer);

        this.layers = [];
        this.yMin;
        this.xMin;
        this.yMax;
        this.xMax;
        this.height;
        this.url;
    }

    _createClass(Layer, [{
        key: "setLayer",
        value: function setLayer(param) {
            this.layers = param;
        }
    }, {
        key: "removeLayer",
        value: function removeLayer() {
            // this.layers = this.layers.filter((i) => i !== param);
            this.layers.length = 0;
        }
    }, {
        key: "setYMin",
        value: function setYMin(param) {
            this.yMin = param;
        }
    }, {
        key: "setXMin",
        value: function setXMin(param) {
            this.xMin = param;
        }
    }, {
        key: "setYMax",
        value: function setYMax(param) {
            this.yMax = param;
        }
    }, {
        key: "setXMax",
        value: function setXMax(param) {
            this.xMax = param;
        }
    }, {
        key: "setHeight",
        value: function setHeight(param) {
            this.height = param;
        }
    }, {
        key: "setUrl",
        value: function setUrl(param) {
            this.url = param;
        }
    }, {
        key: "getUrl",
        value: function getUrl() {
            return this.url + "?layer=" + this.layers.join() + "&ymin=" + this.yMin + "&xmin=" + this.xMin + "&ymax=" + this.yMax + "&xmax=" + this.xMax + "&height=" + this.height;
        }
    }]);

    return Layer;
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Naver = exports.Naver = function () {
    function Naver() {
        _classCallCheck(this, Naver);

        this.mapType;
        this.center;
        this.level;
        this.key;
        this.height;
    }

    _createClass(Naver, [{
        key: "setMapType",
        value: function setMapType(param) {
            this.mapType = param;
        }
    }, {
        key: "setCenter",
        value: function setCenter(param) {
            this.center = param;
        }
    }, {
        key: "setLevel",
        value: function setLevel(radius) {
            this.level = radius.Naver.zoom;
        }
    }, {
        key: "setKey",
        value: function setKey(param) {
            this.key = param;
        }
    }, {
        key: "setHeight",
        value: function setHeight(param) {
            this.height = param;
        }
    }, {
        key: "getUrl",
        value: function getUrl() {
            return "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?" + "w=1000" + "&h=" + this.height + "&center=" + this.center.getX() + "," + this.center.getY() + "&level=" + this.level + "&X-NCP-APIGW-API-KEY-ID=" + this.key + "&maptype=" + this.mapType;
        }
    }]);

    return Naver;
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Proxy = exports.Proxy = function () {
    function Proxy() {
        _classCallCheck(this, Proxy);

        this.center;
        this.level;
        this.mapType;
        this.proxyUrl;
        this.layerMode = false;
        this.companyType;
        this.noLabel = false;
    }

    _createClass(Proxy, [{
        key: "setLayerMode",
        value: function setLayerMode(mode) {
            this.layerMode = mode;
        }
    }, {
        key: "isLayerMode",
        value: function isLayerMode() {
            return this.layerMode;
        }
    }, {
        key: "setNoLabel",
        value: function setNoLabel(mode) {
            this.noLabel = mode;
        }
    }, {
        key: "isNoLabel",
        value: function isNoLabel() {
            return this.noLabel;
        }
    }, {
        key: "setRadius",
        value: function setRadius(radius) {
            if (this.companyType === "google") {
                this.level = radius.Google.level;
            } else if (this.companyType === "kakao") {
                this.level = radius.Kakao.level;
            }
        }
    }, {
        key: "setMapType",
        value: function setMapType(type) {
            this.mapType = type;
        }
    }, {
        key: "setCenter",
        value: function setCenter(center) {
            this.center = center;
        }
    }, {
        key: "setProxyUrl",
        value: function setProxyUrl(proxyUrl) {
            this.proxyUrl = proxyUrl;
        }
    }, {
        key: "setCompanyType",
        value: function setCompanyType(companyType) {
            this.companyType = companyType;
        }
    }, {
        key: "getCompanyType",
        value: function getCompanyType() {
            return this.companyType;
        }
    }, {
        key: "getProxyUrl",
        value: function getProxyUrl() {
            return this.proxyUrl;
        }
    }, {
        key: "getUrlWithParams",
        value: function getUrlWithParams() {
            return this.proxyUrl + this.getQueryString();
        }
    }, {
        key: "getParamsToJson",
        value: function getParamsToJson() {
            var jsonData = {
                layerMode: this.layerMode,
                lat: this.center.getY(),
                lng: this.center.getX(),
                level: this.level,
                type: this.mapType,
                companyType: this.companyType
            };

            return JSON.stringify(jsonData);
        }
    }, {
        key: "getQueryString",
        value: function getQueryString() {
            return "?lat=" + this.center.getY() + "&lng=" + this.center.getX() + "&level=" + this.level + "&type=" + this.mapType + "&layerMode=" + this.layerMode + "&companyType=" + this.companyType + "&noLabel=" + this.noLabel;
        }
    }]);

    return Proxy;
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
var Radius = exports.Radius = {
    // 구글 지도는 계산상 편의를 위해 실제 크기보다 width가 500px 크게 기재되어 있음.
    One: {
        Naver: {
            sideBlockCount: 11,
            zoom: 18
        },
        Kakao: {
            level: 1,
            width: 5000
        },

        Google: {
            level: 1,
            width: 6000
        }

    },
    Two: {
        Naver: {
            sideBlockCount: 17,
            zoom: 18
        },
        Kakao: {
            level: 2,
            width: 4000
        },

        Google: {
            level: 2,
            width: 5000
        }

    },
    Five: {
        Naver: {
            sideBlockCount: 11,
            zoom: 16
        },
        Kakao: {
            level: 5,
            width: 5000
        },

        Google: {
            level: 5,
            width: 6000
        }

    },
    Ten: {
        Naver: {
            sideBlockCount: 21,
            zoom: 16
        },
        Kakao: {
            level: 10,
            width: 5000
        },

        Google: {
            level: 10,
            width: 6000
        }

    }

};
