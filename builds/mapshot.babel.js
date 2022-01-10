var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LatLng = function () {
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
// ie CustomEvent 추가 코드

(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

var mapshot = {
    maps: {
        NaverTile: NaverTile,
        KakaoTile: KakaoTile
    },

    coors: {
        LatLng: LatLng
    },

    profile: {
        Naver: Naver,
        Kakao: Kakao
    },

    radius: {
        One: {
            sideBlockCount: 11,
            zoom: 18
        },
        Two: {
            sideBlockCount: 17,
            zoom: 18
        },
        Five: {
            sideBlockCount: 11,
            zoom: 16
        },
        Ten: {
            sideBlockCount: 21,
            zoom: 16
        }
    }
};
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KakaoTile = function () {
    function KakaoTile() {
        _classCallCheck(this, KakaoTile);
    }

    _createClass(KakaoTile, [{
        key: "wakeUp",
        value: function wakeUp(wakeUpUrl, onSuccess) {
            var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        onSuccess();
                    } else {
                        document.body.dispatchEvent(kakaoTileOnErrorEvent);
                    }
                }
            };

            xhr.open('GET', wakeUpUrl);
            xhr.send();
        }
    }, {
        key: "drawGet",
        value: function drawGet(kakaoProfile, onSuccess) {
            var kakaoTileOnProgressEvent = new CustomEvent("kakaoTileOnProgress", {
                detail: {
                    percentage: 0
                }
            });

            var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

            var xhr = new XMLHttpRequest();
            xhr.open('GET', kakaoProfile.getUrlWithParams(), true);

            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.responseType = 'arraybuffer';

            xhr.onload = function (e) {
                var blob = new Blob([this.response]);
                onSuccess(blob);
            };

            xhr.onprogress = function (e) {
                kakaoTileOnProgressEvent.detail.percentage = parseInt(e.loaded / e.total * 100);
                document.body.dispatchEvent(kakaoTileOnProgressEvent);
            };

            xhr.onerror = function () {
                document.body.dispatchEvent(kakaoTileOnErrorEvent);
            };

            xhr.send();
        }
    }, {
        key: "drawPost",
        value: function drawPost(kakaoProfile, onSuccess) {
            var kakaoTileOnProgressEvent = new CustomEvent("kakaoTileOnProgress", {
                detail: {
                    percentage: 0
                }
            });

            var kakaoTileOnErrorEvent = new CustomEvent("kakaoTileOnError");

            var xhr = new XMLHttpRequest();
            xhr.open('POST', kakaoProfile.getProxyUrl(), true);

            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.responseType = 'arraybuffer';

            xhr.onload = function (e) {
                var blob = new Blob([this.response]);
                onSuccess(blob);
            };

            xhr.onprogress = function (e) {
                kakaoTileOnProgressEvent.detail.percentage = parseInt(e.loaded / e.total * 100);
                document.body.dispatchEvent(kakaoTileOnProgressEvent);
            };

            xhr.onerror = function () {
                document.body.dispatchEvent(kakaoTileOnErrorEvent);
            };

            xhr.send(kakaoProfile.getParamsToJson());
        }
    }, {
        key: "wait",
        value: function wait(waitUrl, onSucessResponseText, repeatMilliSeconds, onWait, onSuccess) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.responseText == onSucessResponseText) {
                        onSuccess();
                    } else {
                        onWait();

                        setTimeout(function () {
                            xhr.open('GET', waitUrl, true);
                            xhr.send(null);
                        }, repeatMilliSeconds);
                    }
                }
            };

            xhr.open('GET', waitUrl, true);
            xhr.send(null);
        }
    }]);

    return KakaoTile;
}();
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NaverTile = function () {
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
        value: function setLevel(config) {

            if (config.zoom == mapshot.radius.One.zoom || config.zoom == mapshot.radius.Two.zoom) {
                this.correctFix = 0.00002833;
                this.width = 0.00268;
                this.noLogoValue = 0.002070;
                this.withLogoValue = 0.00204;
            } else if (config.zoom == mapshot.radius.Five.zoom || config.zoom == mapshot.radius.Ten.zoom) {
                this.correctFix = 0.00011633;
                this.width = 0.01072;
                this.noLogoValue = 0.00829;
                this.withLogoValue = 0.00817;
            } else {
                throw "Parameter is not mapshot.radius Type";
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
        value: function getSE(config, latlng) {
            this.setLevel(config);
            this.generate(latlng);

            var Lat = latlng.getY() - this.noLogoHeight * parseInt(config.sideBlockCount / 2) - this.noLogoHeight / 2;
            var Lng = latlng.getX() + this.width * parseInt(config.sideBlockCount / 2) + this.width / 2;

            return new mapshot.coors.LatLng(Lat, Lng);
        }
    }, {
        key: "getSW",
        value: function getSW(config, latlng) {
            this.setLevel(config);
            this.generate(latlng);

            var Lat = latlng.getY() - this.noLogoHeight * parseInt(config.sideBlockCount / 2) - this.noLogoHeight / 2;
            var Lng = latlng.getX() - this.width * parseInt(config.sideBlockCount / 2) - this.width / 2;

            return new mapshot.coors.LatLng(Lat, Lng);
        }
    }, {
        key: "getNE",
        value: function getNE(config, latlng) {
            this.setLevel(config);
            this.generate(latlng);

            var Lat = latlng.getY() + this.noLogoHeight * parseInt(config.sideBlockCount / 2) + this.noLogoHeight / 2;
            var Lng = latlng.getX() + this.width * parseInt(config.sideBlockCount / 2) + this.width / 2;

            return new mapshot.coors.LatLng(Lat, Lng);
        }
    }, {
        key: "getNW",
        value: function getNW(config, latlng) {
            this.setLevel(config);
            this.generate(latlng);

            var Lat = latlng.getY() + this.noLogoHeight * parseInt(config.sideBlockCount / 2) + this.noLogoHeight / 2;
            var Lng = latlng.getX() - this.width * parseInt(config.sideBlockCount / 2) - this.width / 2;

            return new mapshot.coors.LatLng(Lat, Lng);
        }
    }, {
        key: "draw",
        value: function draw(centerLatLng, radiusConfig, naverProfile, onSuccess) {
            this.setLevel(radiusConfig);
            var defaultBlockHeight = 1000;
            var logoRemover = 27;

            var sideBlockCount = radiusConfig.sideBlockCount;
            var canvas = document.createElement("canvas");
            var canvasBlockSize = sideBlockCount <= 11 ? 1000 : 500;

            canvas.width = sideBlockCount * canvasBlockSize;
            canvas.height = sideBlockCount * canvasBlockSize;

            var ctx = canvas.getContext("2d");
            var temp = this.getNW(radiusConfig, centerLatLng);
            var startLatLng = new mapshot.coors.LatLng(temp.getX() + this.getWidthBetweenBlock() / 2, temp.getY() - this.getHeightBetweenBlockNoLogo() / 2);

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
    }]);

    return NaverTile;
}();
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kakao = function () {
    function Kakao() {
        _classCallCheck(this, Kakao);

        this.center;
        this.level;
        this.mapType;
        this.proxyUrl;
        this.layerMode = false;
    }

    _createClass(Kakao, [{
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
        key: "setLevel",
        value: function setLevel(level) {
            this.level = level;
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
        key: "getProxyUrl",
        value: function getProxyUrl() {
            return this.proxyUrl;
        }
    }, {
        key: "getUrlWithParams",
        value: function getUrlWithParams() {
            var queryString = "?lat=" + this.center.getY() + "&lng=" + this.center.getX() + "&level=" + this.level + "&type=" + this.mapType;

            return this.proxyUrl + queryString;
        }
    }, {
        key: "getParamsToJson",
        value: function getParamsToJson() {
            var jsonData = {
                layerMode: this.layerMode,
                lat: this.center.getY(),
                lng: this.center.getX(),
                level: this.level,
                type: this.mapType
            };

            return JSON.stringify(jsonData);
        }
    }]);

    return Kakao;
}();
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Naver = function () {
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
        value: function setLevel(config) {
            this.level = config.zoom;
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
