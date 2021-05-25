import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { importEntry } from '../index';
test('config entry should return the expect html template', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
  var config, _yield$importEntry, template;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          config = {
            styles: ['http://kuitos.me/umi.css', 'http://kuitos.me/test.css'],
            scripts: ['http://kuitos.me/umi.js', 'http://kuitos.me/test.js'],
            html: '<main>config entry test</main>'
          };
          _context3.next = 3;
          return importEntry(config, {
            fetch: function () {
              var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(url) {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", {
                          text: function () {
                            var _text = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                              return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      return _context.abrupt("return", url);

                                    case 1:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                            function text() {
                              return _text.apply(this, arguments);
                            }

                            return text;
                          }()
                        });

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              function fetch(_x) {
                return _fetch.apply(this, arguments);
              }

              return fetch;
            }()
          });

        case 3:
          _yield$importEntry = _context3.sent;
          template = _yield$importEntry.template;
          expect(template).toBe('<style>/* http://kuitos.me/umi.css */http://kuitos.me/umi.css</style><style>/* http://kuitos.me/test.css */http://kuitos.me/test.css</style><main>config entry test</main><!--  script http://kuitos.me/umi.js replaced by import-html-entry --><!--  script http://kuitos.me/test.js replaced by import-html-entry -->');

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('config entry should return the expect html template with fetch option', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
  var config, _yield$importEntry2, template;

  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          config = {
            styles: ['http://kuitos.me/umi.css', 'http://kuitos.me/test.css'],
            scripts: ['http://kuitos.me/umi.js', 'http://kuitos.me/test.js'],
            html: '<main>config entry test</main>'
          };
          _context6.next = 3;
          return importEntry(config, {
            fetch: {
              fn: function () {
                var _fn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(url) {
                  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          return _context5.abrupt("return", {
                            text: function () {
                              var _text2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                  while (1) {
                                    switch (_context4.prev = _context4.next) {
                                      case 0:
                                        return _context4.abrupt("return", url);

                                      case 1:
                                      case "end":
                                        return _context4.stop();
                                    }
                                  }
                                }, _callee4);
                              }));

                              function text() {
                                return _text2.apply(this, arguments);
                              }

                              return text;
                            }()
                          });

                        case 1:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                function fn(_x2) {
                  return _fn.apply(this, arguments);
                }

                return fn;
              }()
            }
          });

        case 3:
          _yield$importEntry2 = _context6.sent;
          template = _yield$importEntry2.template;
          expect(template).toBe('<style>/* http://kuitos.me/umi.css */http://kuitos.me/umi.css</style><style>/* http://kuitos.me/test.css */http://kuitos.me/test.css</style><main>config entry test</main><!--  script http://kuitos.me/umi.js replaced by import-html-entry --><!--  script http://kuitos.me/test.js replaced by import-html-entry -->');

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));