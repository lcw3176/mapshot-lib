"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LatLng = /*#__PURE__*/function () {
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