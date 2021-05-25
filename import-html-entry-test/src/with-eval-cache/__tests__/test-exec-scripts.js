import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { execScripts, importEntry } from '../index';
describe('execScripts', function () {
  it('should support exec inline script correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var spyInstance, dummyContext;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // arrange
            spyInstance = jest.spyOn(console, 'log');
            spyInstance.mockImplementation(jest.fn());
            dummyContext = {
              foo: 5
            };
            _context.prev = 3;
            _context.next = 6;
            return execScripts(null, ['<script>console.log(this.foo, window.foo)</script>'], dummyContext);

          case 6:
            // assert
            expect(spyInstance).toHaveBeenCalledTimes(1);
            expect(spyInstance).toHaveBeenCalledWith(5, 5);

          case 8:
            _context.prev = 8;
            spyInstance.mockRestore();
            return _context.finish(8);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3,, 8, 11]]);
  })));
  it('should support exec inline script with hooks correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var spyInstance, afterExecHook, dummyContext, expectCode, script;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // arrange
            spyInstance = jest.spyOn(console, 'log');
            spyInstance.mockImplementation(jest.fn());
            afterExecHook = jest.fn();
            dummyContext = {
              hello: 'world'
            };
            expectCode = 'console.log("updated")';
            script = "<script>".concat(expectCode, "</script>");
            _context2.prev = 6;
            _context2.next = 9;
            return execScripts(null, [script], dummyContext, {
              beforeExec: function beforeExec(code, scriptSource) {
                expect(code).toBe(expectCode);
                expect(scriptSource).toBe(script);
                return 'console.log("updated")';
              },
              afterExec: afterExecHook
            });

          case 9:
            // assert
            expect(spyInstance).toHaveBeenCalledTimes(1);
            expect(spyInstance).toHaveBeenCalledWith('updated');
            expect(afterExecHook).toHaveBeenCalledWith(expectCode, script);

          case 12:
            _context2.prev = 12;
            spyInstance.mockRestore();
            return _context2.finish(12);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6,, 12, 15]]);
  })));
  it('should support exec remote script correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
    var spyInstance, fetch, dummyContext;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // arrange
            spyInstance = jest.spyOn(console, 'log');
            spyInstance.mockImplementation(jest.fn());

            fetch = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt("return", {
                          text: function () {
                            var _text = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                              return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      return _context3.abrupt("return", 'console.log(window.foo)');

                                    case 1:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            }));

                            function text() {
                              return _text.apply(this, arguments);
                            }

                            return text;
                          }()
                        });

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function fetch() {
                return _ref4.apply(this, arguments);
              };
            }();

            dummyContext = {
              foo: 6
            };
            _context5.prev = 4;
            _context5.next = 7;
            return execScripts(null, ['./foo.js'], dummyContext, {
              fetch: fetch
            });

          case 7:
            // assert
            expect(spyInstance).toHaveBeenCalledTimes(1);
            expect(spyInstance).toHaveBeenCalledWith(6);

          case 9:
            _context5.prev = 9;
            spyInstance.mockRestore();
            return _context5.finish(9);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4,, 9, 12]]);
  })));
  it('should support exec remote script with hooks correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
    var spyInstance, afterExecHook, dummyContext, expectCode, script, fetch;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // arrange
            spyInstance = jest.spyOn(console, 'log');
            spyInstance.mockImplementation(jest.fn());
            afterExecHook = jest.fn();
            dummyContext = {
              hello: 'world'
            };
            expectCode = 'console.log(this.hello, window.hello)';
            script = './bar.js';

            fetch = /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
                return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        return _context7.abrupt("return", {
                          text: function () {
                            var _text2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
                              return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                                while (1) {
                                  switch (_context6.prev = _context6.next) {
                                    case 0:
                                      return _context6.abrupt("return", expectCode);

                                    case 1:
                                    case "end":
                                      return _context6.stop();
                                  }
                                }
                              }, _callee6);
                            }));

                            function text() {
                              return _text2.apply(this, arguments);
                            }

                            return text;
                          }()
                        });

                      case 1:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function fetch() {
                return _ref6.apply(this, arguments);
              };
            }();

            _context8.prev = 7;
            _context8.next = 10;
            return execScripts(null, [script], dummyContext, {
              fetch: fetch,
              beforeExec: function beforeExec(code, scriptSource) {
                expect(code).toBe(expectCode);
                expect(scriptSource).toBe(script);
                return 'console.log("updated")';
              },
              afterExec: afterExecHook
            });

          case 10:
            // assert
            expect(spyInstance).toHaveBeenCalledTimes(1);
            expect(spyInstance).toHaveBeenCalledWith('updated');
            expect(afterExecHook).toHaveBeenCalledWith(expectCode, script);

          case 13:
            _context8.prev = 13;
            spyInstance.mockRestore();
            return _context8.finish(13);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[7,, 13, 16]]);
  })));
  it('should support exec script with importEntry correctly(html url)', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
    var spyInstance, afterExecHook, dummyContext, expectCode, script, fetch, result;
    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            // arrange
            spyInstance = jest.spyOn(console, 'log');
            spyInstance.mockImplementation(jest.fn());
            afterExecHook = jest.fn();
            dummyContext = {
              hello: 'world'
            };
            expectCode = 'console.log(this.hello, window.hello)';
            script = "<script>".concat(expectCode, "</script>");

            fetch = /*#__PURE__*/function () {
              var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10() {
                return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        return _context10.abrupt("return", {
                          text: function () {
                            var _text3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
                              return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                                while (1) {
                                  switch (_context9.prev = _context9.next) {
                                    case 0:
                                      return _context9.abrupt("return", script);

                                    case 1:
                                    case "end":
                                      return _context9.stop();
                                  }
                                }
                              }, _callee9);
                            }));

                            function text() {
                              return _text3.apply(this, arguments);
                            }

                            return text;
                          }()
                        });

                      case 1:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function fetch() {
                return _ref8.apply(this, arguments);
              };
            }();

            _context11.prev = 7;
            _context11.next = 10;
            return importEntry('./dummy.html', {
              fetch: fetch
            });

          case 10:
            result = _context11.sent;
            _context11.next = 13;
            return result.execScripts(dummyContext, true, {
              beforeExec: function beforeExec(code, scriptSource) {
                expect(code).toBe(expectCode);
                expect(scriptSource).toBe(script);
                return 'console.log("updated")';
              },
              afterExec: afterExecHook
            });

          case 13:
            // assert
            expect(spyInstance).toHaveBeenCalledTimes(1);
            expect(spyInstance).toHaveBeenCalledWith('updated');
            expect(afterExecHook).toHaveBeenCalledWith(expectCode, script);

          case 16:
            _context11.prev = 16;
            spyInstance.mockRestore();
            return _context11.finish(16);

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[7,, 16, 19]]);
  })));
  it('should support exec script with importEntry correctly(html object)', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14() {
    var spyInstance, afterExecHook, dummyContext, expectCode, script, fetch, result;
    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            // arrange
            spyInstance = jest.spyOn(console, 'log');
            spyInstance.mockImplementation(jest.fn());
            afterExecHook = jest.fn();
            dummyContext = {
              hello: 'world'
            };
            expectCode = 'console.log(this.hello, window.hello)';
            script = './html-object-script.js';

            fetch = /*#__PURE__*/function () {
              var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13() {
                return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        return _context13.abrupt("return", {
                          text: function () {
                            var _text4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12() {
                              return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                                while (1) {
                                  switch (_context12.prev = _context12.next) {
                                    case 0:
                                      return _context12.abrupt("return", expectCode);

                                    case 1:
                                    case "end":
                                      return _context12.stop();
                                  }
                                }
                              }, _callee12);
                            }));

                            function text() {
                              return _text4.apply(this, arguments);
                            }

                            return text;
                          }()
                        });

                      case 1:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              }));

              return function fetch() {
                return _ref10.apply(this, arguments);
              };
            }();

            _context14.prev = 7;
            _context14.next = 10;
            return importEntry({
              scripts: [script]
            }, {
              fetch: fetch
            });

          case 10:
            result = _context14.sent;
            _context14.next = 13;
            return result.execScripts(dummyContext, true, {
              beforeExec: function beforeExec(code, scriptSource) {
                expect(code).toBe(expectCode);
                expect(scriptSource).toBe(script);
                return 'console.log(this.hello, window.hello, "updated")';
              },
              afterExec: afterExecHook
            });

          case 13:
            // assert
            expect(spyInstance).toHaveBeenCalledTimes(1);
            expect(spyInstance).toHaveBeenCalledWith('world', 'world', 'updated');
            expect(afterExecHook).toHaveBeenCalledWith(expectCode, script);

          case 16:
            _context14.prev = 16;
            spyInstance.mockRestore();
            return _context14.finish(16);

          case 19:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[7,, 16, 19]]);
  })));
});