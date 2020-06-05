"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var fn = function fn() {
  console.log('a');
};

var list = [1, 2, 3];

for (var _i = 0, _list = list; _i < _list.length; _i++) {
  var i = _list[_i];
  console.log(i);
}

var React = /*#__PURE__*/function () {
  function React() {
    (0, _classCallCheck2.default)(this, React);
    this.name = 'react';
  }

  (0, _createClass2.default)(React, [{
    key: "init",
    value: function init() {
      console.log(this.name);
    }
  }]);
  return React;
}();

var react = new React();
react.init();

var Vue = /*#__PURE__*/function () {
  function Vue() {
    (0, _classCallCheck2.default)(this, Vue);
    this.name = 'vue';
  }

  (0, _createClass2.default)(Vue, [{
    key: "init",
    value: function init() {
      console.log(this.name);
    }
  }]);
  return Vue;
}();

var vue = new Vue();
vue.init();
var isHas = [1, 2, 3].includes(2);
var result = new Promise(function (resovle, reject) {
  resovle('success');
});

var fetchData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var a;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return result();

          case 2:
            a = _context.sent;
            console.log(a);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchData() {
    return _ref.apply(this, arguments);
  };
}();