class NFixLat{
    constructor(){
        this.width;
        this.height; // 로고 없을 때
        this.logoHeight; // 로고 있을 때
    }

    generate(latlng, naverProfile){
        var correctFix;

        const controlPoint = 37.5668;"use strict";

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
        
        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
        
        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
        
        var NFixLat = /*#__PURE__*/function () {
          function NFixLat() {
            _classCallCheck(this, NFixLat);
        
            this.width;
            this.height; // 로고 없을 때
        
            this.logoHeight; // 로고 있을 때
          }
        
          _createClass(NFixLat, [{
            key: "generate",
            value: function generate(latlng, naverProfile) {
              var correctFix;
              var controlPoint = 37.5668;
        
              switch (naverProfile.getLevel()) {
                case 16:
                  correctFix = 0.00011633;
                  this.width = 0.01072;
                  this.height = 0.00829;
                  this.logoHeight = 0.00817;
                  break;
        
                case 18:
                  correctFix = 0.00002833;
                  this.width = 0.00268;
                  this.height = 0.002070;
                  this.logoHeight = 0.00204;
                  break;
        
                default:
                  break;
              }
        
              this.height += (controlPoint - latlng.getY()) * correctFix;
              this.logoHeight += (controlPoint - latlng.getY()) * correctFix;
            }
          }, {
            key: "getWidthBetweenBlock",
            value: function getWidthBetweenBlock() {
              return this.width;
            }
          }, {
            key: "getHeightBetweenBlock",
            value: function getHeightBetweenBlock() {
              return this.height;
            }
          }, {
            key: "getHeightBetweenBlockWithLogo",
            value: function getHeightBetweenBlockWithLogo() {
              return this.logoHeight;
            }
          }]);
        
          return NFixLat;
        }();

        switch(naverProfile.getLevel()){
            case 16:
                correctFix = 0.00011633;
                this.width = 0.01072;
                this.height = 0.00829;
                this.logoHeight = 0.00817;
                break;
            
            case 18:
                correctFix = 0.00002833;
                this.width = 0.00268;
                this.height = 0.002070; 
                this.logoHeight = 0.00204;             
                break;

            default:
                break;
        }

        this.height += (controlPoint - latlng.getY()) * correctFix;
        this.logoHeight += (controlPoint - latlng.getY()) * correctFix;
    }

    getWidthBetweenBlock(){
        return this.width;
    }

    getHeightBetweenBlock(){
        return this.height;
    }

    getHeightBetweenBlockWithLogo(){
        return this.logoHeight;
    }
}