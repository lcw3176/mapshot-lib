"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tile = /*#__PURE__*/function () {
  function Tile() {
    _classCallCheck(this, Tile);
  }

  _createClass(Tile, [{
    key: "getSE",
    value: function getSE(sideBlockCount, NFixLat, coor) {
      var Lat = coor.getY() - NFixLat.getHeightBetweenBlock() * parseInt(sideBlockCount / 2) - NFixLat.getHeightBetweenBlock() / 2;
      var Lng = coor.getX() + NFixLat.getWidthBetweenBlock() * parseInt(sideBlockCount / 2) + NFixLat.getWidthBetweenBlock() / 2;
      return new mapshot.coors.LatLng(Lat, Lng);
    }
  }, {
    key: "getSW",
    value: function getSW(sideBlockCount, NFixLat, coor) {
      var Lat = coor.getY() - NFixLat.getHeightBetweenBlock() * parseInt(sideBlockCount / 2) - NFixLat.getHeightBetweenBlock() / 2;
      var Lng = coor.getX() - NFixLat.getWidthBetweenBlock() * parseInt(sideBlockCount / 2) - NFixLat.getWidthBetweenBlock() / 2;
      return new mapshot.coors.LatLng(Lat, Lng);
    }
  }, {
    key: "getNE",
    value: function getNE(sideBlockCount, NFixLat, coor) {
      var Lat = coor.getY() + NFixLat.getHeightBetweenBlock() * parseInt(sideBlockCount / 2) + NFixLat.getHeightBetweenBlock() / 2;
      var Lng = coor.getX() + NFixLat.getWidthBetweenBlock() * parseInt(sideBlockCount / 2) + NFixLat.getWidthBetweenBlock() / 2;
      return new mapshot.coors.LatLng(Lat, Lng);
    }
  }, {
    key: "getNW",
    value: function getNW(sideBlockCount, NFixLat, coor) {
      var Lat = coor.getY() + NFixLat.getHeightBetweenBlock() * parseInt(sideBlockCount / 2) + NFixLat.getHeightBetweenBlock() / 2;
      var Lng = coor.getX() - NFixLat.getWidthBetweenBlock() * parseInt(sideBlockCount / 2) - NFixLat.getWidthBetweenBlock() / 2;
      return new mapshot.coors.LatLng(Lat, Lng);
    }
  }]);

  return Tile;
}();