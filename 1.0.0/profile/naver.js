"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Naver = /*#__PURE__*/function () {
  function Naver() {
    _classCallCheck(this, Naver);

    this.mapType;
    this.center;
    this.level;
    this.key;
    this.width;
    this.height;
  }

  _createClass(Naver, [{
    key: "setMapType",
    value: function setMapType(param) {
      this.mapType = param;
    }
  }, {
    key: "getMapType",
    value: function getMapType() {
      return this.mapType;
    }
  }, {
    key: "setCenter",
    value: function setCenter(param) {
      this.center = param;
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      return this.center;
    }
  }, {
    key: "setLevel",
    value: function setLevel(param) {
      this.level = param;
    }
  }, {
    key: "getLevel",
    value: function getLevel() {
      return this.level;
    }
  }, {
    key: "setKey",
    value: function setKey(param) {
      this.key = param;
    }
  }, {
    key: "getKey",
    value: function getKey() {
      return this.key;
    }
  }, {
    key: "setWidth",
    value: function setWidth(param) {
      this.width = param;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: "setHeight",
    value: function setHeight(param) {
      this.height = param;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?" + "w=" + this.width + "&h=" + this.height + "&center=" + this.center.getX() + "," + this.center.getY() + "&level=" + this.level + "&X-NCP-APIGW-API-KEY-ID=" + this.key + "&maptype=" + this.mapType;
    }
  }]);

  return Naver;
}();