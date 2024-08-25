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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  }, {
    key: "draw",
    value: function draw(centerLatLng, radius, naverProfile, onSuccess) {
      this.setLevel(radius);
      var defaultBlockHeight = 1000;
      var logoRemover = 27;
      var sideBlockCount = radius.sideBlockCount;
      var canvas = document.createElement("canvas");
      var canvasBlockSize = sideBlockCount <= 11 ? 1000 : 500;
      canvas.width = sideBlockCount * canvasBlockSize;
      canvas.height = sideBlockCount * canvasBlockSize;
      var ctx = canvas.getContext("2d");
      var temp = this.getNW(radius, centerLatLng);
      var startLatLng = new LatLng(temp.getX() + this.width / 2, temp.getY() - this.noLogoHeight / 2);
      var returnXValue = startLatLng.getX();
      var order = 0;
      var isCorner = false;
      var total = sideBlockCount * sideBlockCount;
      var complete = 0;
      naverProfile.setHeight(1000);
      var mapshotTileOnLoadStartEvent = new CustomEvent("mapshotTileOnLoadStart", {
        detail: {
          total: total
        }
      });
      document.body.dispatchEvent(mapshotTileOnLoadStartEvent);
      for (var i = 0; i < sideBlockCount; i++) {
        for (var j = 0; j < sideBlockCount; j++) {
          if (i + 1 === sideBlockCount && j === 0) {
            naverProfile.setHeight(1000 - logoRemover);
            startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.noLogoHeight);
            startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.withLogoHeight);
            isCorner = true;
          }
          naverProfile.setCenter(startLatLng);
          var xPos = order % sideBlockCount * canvasBlockSize;
          var yPos = parseInt(order / sideBlockCount) * canvasBlockSize;
          this.processImage(naverProfile.getUrl(), xPos, yPos, defaultBlockHeight - logoRemover, canvasBlockSize, ctx, 0).then(function (isSuccess) {
            complete++;
            if (complete >= total) {
              onSuccess(canvas);
            }
          });
          order++;
          startLatLng.init(startLatLng.getX() + this.width, startLatLng.getY());
          if (isCorner) {
            naverProfile.setHeight(1000);
            startLatLng.init(startLatLng.getX(), startLatLng.getY() + this.withLogoHeight);
            startLatLng.init(startLatLng.getX(), startLatLng.getY() - this.noLogoHeight);
            isCorner = false;
          }
        }
        startLatLng.init(returnXValue, startLatLng.getY() - this.noLogoHeight);
      }
    }
  }, {
    key: "drawLayers",
    value: function () {
      var _drawLayers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(centerLatLng, radius, layerProfile, canvas, onSuccess) {
        var defaultBlockHeight, sideBlockCount, canvasBlockSize, ctx, temp, startLatLng, returnXValue, order, total, complete, mapshotTileOnLoadStartEvent, i, j, offsetY, offsetX, yMin, xMin, yMax, xMax, xPos, yPos;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.setLevel(radius);
              defaultBlockHeight = 1000;
              sideBlockCount = radius.sideBlockCount;
              canvasBlockSize = sideBlockCount <= 11 ? 1000 : 500;
              if (canvas == null) {
                canvas = document.createElement("canvas");
                canvas.width = sideBlockCount * canvasBlockSize;
                canvas.height = sideBlockCount * canvasBlockSize;
              }
              ctx = canvas.getContext("2d");
              temp = this.getNW(radius, centerLatLng);
              startLatLng = new LatLng(temp.getX() + this.width / 2, temp.getY() - this.noLogoHeight / 2);
              returnXValue = startLatLng.getX();
              order = 0;
              total = sideBlockCount * sideBlockCount;
              complete = 0;
              layerProfile.setHeight(defaultBlockHeight);
              mapshotTileOnLoadStartEvent = new CustomEvent("mapshotTileOnLoadStart", {
                detail: {
                  total: total
                }
              });
              document.body.dispatchEvent(mapshotTileOnLoadStartEvent);
              i = 0;
            case 16:
              if (!(i < sideBlockCount)) {
                _context.next = 43;
                break;
              }
              j = 0;
            case 18:
              if (!(j < sideBlockCount)) {
                _context.next = 39;
                break;
              }
              offsetY = this.noLogoHeight / 2;
              offsetX = this.width / 2;
              yMin = startLatLng.getY() - offsetY;
              xMin = startLatLng.getX() - offsetX;
              yMax = startLatLng.getY() + offsetY;
              xMax = startLatLng.getX() + offsetX;
              layerProfile.setYMin(yMin);
              layerProfile.setXMin(xMin);
              layerProfile.setYMax(yMax);
              layerProfile.setXMax(xMax);
              xPos = order % sideBlockCount * canvasBlockSize;
              yPos = parseInt(order / sideBlockCount) * canvasBlockSize;
              this.processImage(layerProfile.getUrl(), xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, 0).then(function (isSuccess) {
                complete++;
                if (complete >= total) {
                  onSuccess(canvas);
                }
              });
              order++;
              startLatLng.init(startLatLng.getX() + this.width, startLatLng.getY());
              _context.next = 36;
              return this.delay(50);
            case 36:
              j++;
              _context.next = 18;
              break;
            case 39:
              startLatLng.init(returnXValue, startLatLng.getY() - this.noLogoHeight);
            case 40:
              i++;
              _context.next = 16;
              break;
            case 43:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function drawLayers(_x, _x2, _x3, _x4, _x5) {
        return _drawLayers.apply(this, arguments);
      }
      return drawLayers;
    }()
  }, {
    key: "processImage",
    value: function () {
      var _processImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, retryCount) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise(function (resolve) {
                var image = new Image();
                image.crossOrigin = "*";
                image.src = url;
                image.onload = function () {
                  ctx.drawImage(image, 0, 0, image.width, defaultBlockHeight, xPos, yPos, canvasBlockSize, canvasBlockSize);
                  var mapshotTileOnProgressEvent = new CustomEvent("mapshotTileOnProgress");
                  document.body.dispatchEvent(mapshotTileOnProgressEvent);
                  resolve(true);
                };
                image.onerror = function () {
                  if (retryCount >= 1) {
                    var mapshotTileOnErrorEvent = new CustomEvent("mapshotTileOnError");
                    document.body.dispatchEvent(mapshotTileOnErrorEvent);
                    resolve(true);
                  } else {
                    resolve(this.processImage(url, xPos, yPos, defaultBlockHeight, canvasBlockSize, ctx, retryCount + 1));
                  }
                };
              }));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function processImage(_x6, _x7, _x8, _x9, _x10, _x11, _x12) {
        return _processImage.apply(this, arguments);
      }
      return processImage;
    }()
  }, {
    key: "delay",
    value: function delay(millis) {
      return new Promise(function (resolve) {
        setTimeout(resolve, millis);
      });
    }
  }]);
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.External = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var External = exports.External = /*#__PURE__*/function () {
  function External() {
    _classCallCheck(this, External);
    this.center;
    this.level;
    this.mapType;
    this.proxyUrl;
    this.layerMode = false;
    this.companyType;
    this.noLabel = false;
  }
  return _createClass(External, [{
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
      this.level = radius.level;
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
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layer = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Layer = exports.Layer = /*#__PURE__*/function () {
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
  return _createClass(Layer, [{
    key: "setLayer",
    value: function setLayer(param) {
      this.layers = param;
    }
  }, {
    key: "removeLayer",
    value: function removeLayer() {
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
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Naver = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Naver = exports.Naver = /*#__PURE__*/function () {
  function Naver() {
    _classCallCheck(this, Naver);
    this.mapType;
    this.center;
    this.level;
    this.key;
    this.height;
  }
  return _createClass(Naver, [{
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
      this.level = radius.zoom;
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
}();
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
