import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import iconv from 'iconv-lite';
import { defaultGetPublicPath, readResAsString, evalCode } from '../utils';
describe('utils', function () {
  it('defaultGetPublicPath', function () {
    // "testURL": "http://test.com/path/"
    var publicPaths = ['/a/b/c/index.html', './a/b/index.html', '../a/b/index.html', '../index.html', './index.html', '/index.html' // '/index.html/?abc=asdf',
    ].map(defaultGetPublicPath);
    expect(publicPaths).toEqual(['http://test.com/a/b/c/', 'http://test.com/path/a/b/', 'http://test.com/a/b/', 'http://test.com/', 'http://test.com/path/', 'http://test.com/' // 'http://test.com/',
    ]);
    var publicPaths2 = ['//kuitos.me/index.html', // '//kuitos.me/index.html/#/a/c/d',
    '//kuitos.me/a/b/c/index.html', '//kuitos.me/index.html?test=2', '//kuitos.me/test/vm/'].map(defaultGetPublicPath);
    expect(publicPaths2).toEqual(['http://kuitos.me/', // 'http://kuitos.me/',
    'http://kuitos.me/a/b/c/', 'http://kuitos.me/', 'http://kuitos.me/test/vm/']);
  });
  describe('readResAsString', function () {
    it('should invoke text method when autoDetectCharset option is not enabled', function () {
      // arrange
      var fn = jest.fn();
      var response = {
        text: fn
      }; // act

      readResAsString(response); // assert

      expect(fn).toBeCalledTimes(1);
    });
    it('should invoke text method when no headers found', function () {
      // arrange
      var fn = jest.fn();
      var response = {
        text: fn
      }; // act

      readResAsString(response, true); // assert

      expect(fn).toBeCalledTimes(1);
    });
    it('should invoke text method when content-type is not in response headers', function () {
      // arrange
      var fn = jest.fn();
      var response = {
        headers: {
          get: function get() {
            return null;
          }
        },
        text: fn
      }; // act

      readResAsString(response, true); // assert

      expect(fn).toBeCalledTimes(1);
    });
    it('should invoke text method when content-type has utf-8 charset', function () {
      // arrange
      var fn = jest.fn();
      var response = {
        headers: {
          get: function get() {
            return 'text/html;charset=UTf-8';
          }
        },
        text: fn
      }; // act

      readResAsString(response, true); // assert

      expect(fn).toBeCalledTimes(1);
    });
    it('should parse stream correctly with non-utf-8 charset', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var runner, _runner;

      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _runner = function _runner3() {
                _runner = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(encoding, expected) {
                  var type, decoded, response, actual;
                  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          // arrage
                          type = "text/html;charset=".concat(encoding);
                          decoded = iconv.encode(expected, encoding);
                          response = {
                            headers: {
                              get: function get() {
                                return type;
                              }
                            },
                            blob: function () {
                              var _blob = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        return _context.abrupt("return", new Blob([decoded], {
                                          type: type
                                        }));

                                      case 1:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              function blob() {
                                return _blob.apply(this, arguments);
                              }

                              return blob;
                            }()
                          }; // act

                          _context2.next = 5;
                          return readResAsString(response, true);

                        case 5:
                          actual = _context2.sent;
                          // assert
                          expect(actual).toBe(expected);

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _runner.apply(this, arguments);
              };

              runner = function _runner2(_x, _x2) {
                return _runner.apply(this, arguments);
              };

              _context3.next = 4;
              return runner('gbk', '你好，李磊，中國');

            case 4:
              _context3.next = 6;
              return runner('gb2312', '你好，李磊');

            case 6:
              _context3.next = 8;
              return runner('BIG5', '中華人民共和國');

            case 8:
              _context3.next = 10;
              return runner('GB18030', '대한민국|中華人民共和國|にっぽんこく、にほんこく');

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('evalCode', function () {
    it('should eval script correctly', function () {
      var logSpyInstance = jest.spyOn(console, 'log');
      logSpyInstance.mockImplementation(jest.fn());
      var expectCode = 'console.log("hello")';
      var scriptSrc = "<script>".concat(expectCode, "</script>");
      evalCode(scriptSrc, expectCode);
      expect(logSpyInstance).toHaveBeenCalledTimes(1);
      expect(logSpyInstance).toHaveBeenCalledWith('hello');
      logSpyInstance.mockRestore();
    });
    it('should eval script once but exec code twice when cache hit', function () {
      var evalSpyInstance = jest.spyOn(window, 'eval');
      var logSpyInstance = jest.spyOn(console, 'log');
      logSpyInstance.mockImplementation(jest.fn());
      var expectCode = 'console.log("hello, China")';
      var scriptSrc1 = "<script>".concat(expectCode, "</script>");
      var scriptSrc2 = "<script>".concat(expectCode, "</script>");
      evalCode(scriptSrc1, expectCode);
      evalCode(scriptSrc2, expectCode); //use cache, eval once

      expect(evalSpyInstance).toHaveBeenCalledTimes(1); //exec code twice by cache function

      expect(logSpyInstance).toHaveBeenCalledTimes(2);
      evalSpyInstance.mockRestore();
      logSpyInstance.mockRestore();
    });
    it('should eval script twice and exec code twice when cache not hit', function () {
      var evalSpyInstance = jest.spyOn(window, 'eval');
      var logSpyInstance = jest.spyOn(console, 'log');
      var infoSpyInstance = jest.spyOn(console, 'info');
      logSpyInstance.mockImplementation(jest.fn());
      infoSpyInstance.mockImplementation(jest.fn());
      var expectCode1 = 'console.log("hello, friend")';
      var expectCode2 = 'console.info("hello, friend")';
      var scriptSrc1 = "<script>".concat(expectCode1, "</script>");
      var scriptSrc2 = "<script>".concat(expectCode2, "</script>");
      evalCode(scriptSrc1, expectCode1);
      evalCode(scriptSrc2, expectCode2); //not use cache, eval twice

      expect(evalSpyInstance).toHaveBeenCalledTimes(2); //exec code by no cache twice

      expect(logSpyInstance).toHaveBeenCalledTimes(1);
      expect(infoSpyInstance).toHaveBeenCalledTimes(1);
      evalSpyInstance.mockRestore();
      logSpyInstance.mockRestore();
    });
  });
});