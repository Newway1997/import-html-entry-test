import { readFileSync } from 'fs';
import processTpl, { genIgnoreAssetReplaceSymbol, genLinkReplaceSymbol, genModuleScriptReplaceSymbol, genScriptReplaceSymbol } from '../process-tpl';
test('test process-tpl', function () {
  var tpl = '<!DOCTYPE html><html><head>\n' + '\n' + '<link rel="shortcut icon" href="https://t.alipayobjects.com/images/rmsweb/T1pqpiXfJgXXXXXXXX.png" type="image/x-icon">\n' + '<link rel="preload" href="//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js">\n' + '<link rel="prefetch" href="/a3-ie6-polyfill.js">\n' + '<link rel="stylesheet" href="/umi.css">\n' + '<link rel="preload" as="font" href="/static/fonts/iconfont.woff" type="font/woff" crossorigin="anonymous">\n' + '\n' + '<meta charset="utf-8">\n' + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">\n' + '<title>&#x91D1;&#x878D;&#x4E91;&#x63A7;&#x5236;&#x53F0;</title>\n' + '<script data-test>\n' + '  window.routerBase = "/";\n' + '</script>\n' + '<script \n ' + 'data-test>\n' + '  window.routerBase = "/";\n' + '</script>\n' + '<script>\n' + '\n' + '// umi version: 2.2.8\n' + '// build time: Wed Dec 26 2018 17:54:47 GMT+0800 (CST)\n' + '\n' + '</script>\n' + '<script src="//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js"></script>\n' + '<script \n' + '  src="https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js"\n' + '  crossorigin="anonymous"' + '></script>' + '<script \n' + '  src="/main-es2015.js"\n' + '  type="module"' + '></script>' + '<script \n' + '  src="/main-es5.js"\n' + '  nomodule' + '></script>' + '<script src="/test-type.json" type="test"></script>' + '<script type=systemjs-importmap>{"a": 1}</script>' + '<script \n' + '  src="/test-async.js"\n' + '  async' + '></script>' + '<style>\n' + 'body {\n' + 'background-color: red;\n' + '}\n' + '</style>\n' + '</head>\n' + '<body>\n' + '\n' + '<div id="root"></div>\n' + '\n' + '<script src="/umi.js"></script>\n' + '<!-- <script src="/a1.js"></script>' + '-->' + '<script src="/comment.js"></script>\n' + '<!-- <script src="/a2.js"></script>\n' + '-->' + '<!--[if IE 6]>\n' + '<!-- <script src="/a3-ie6-polyfill.js"></script>\n' + '<![endif]-->' + '\n' + '\n' + '</body></html>';

  var _processTpl = processTpl(tpl, 'http://kuitos.me'),
      entry = _processTpl.entry,
      scripts = _processTpl.scripts,
      template = _processTpl.template;

  expect(entry).toBe('http://kuitos.me/comment.js');
  expect(scripts).toEqual(['<script data-test>\n  window.routerBase = "/";\n</script>', '<script \n data-test>\n  window.routerBase = "/";\n</script>', '//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js', 'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js', // Jest/jsdom doesn't support module scripts, so nomodule scripts will be imported in test cases.
  // https://github.com/jsdom/jsdom/issues/2475
  'http://kuitos.me/main-es5.js', {
    async: true,
    src: 'http://kuitos.me/test-async.js'
  }, 'http://kuitos.me/umi.js', 'http://kuitos.me/comment.js']);
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/test-async.js', true)) !== -1).toBeTruthy();
  expect(template.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/umi.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/comment.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/main-es5.js')) !== -1).toBeTruthy();
  expect(template.indexOf('<script src="/test-type.json" type="test"></script>') !== -1).toBeTruthy();
  expect(template.indexOf('<script type=systemjs-importmap>{"a": 1}</script>') !== -1).toBeTruthy(); // link as font ??????????????? ignore

  expect(template.indexOf('<link rel="preload" as="font" href="/static/fonts/iconfont.woff" type="font/woff" crossorigin="anonymous">') !== -1).toBeTruthy(); // preload ??????????????? ignore

  expect(template.indexOf('<link rel="preload" href="//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js">') === -1).toBeTruthy(); // prefetch/preload ?????? replace

  expect(template.indexOf(genLinkReplaceSymbol('/a3-ie6-polyfill.js', true)) !== -1).toBeTruthy(); // prefetch ??????????????? ignore

  expect(template.indexOf('<link rel="prefetch" href="/a3-ie6-polyfill.js">') === -1).toBeTruthy(); // type="module" ????????? ignore

  expect(template.indexOf(genModuleScriptReplaceSymbol('/main-es2015.js', false)) === -1).toBeTruthy();

  var _processTpl2 = processTpl(tpl, 'http://kuitos.me/cdn/'),
      styles = _processTpl2.styles,
      template2 = _processTpl2.template;

  expect(styles[0]).toBe('http://kuitos.me/umi.css');
  expect(template2.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
});
test('test ignore js or css', function () {
  var tpl = readFileSync(require.resolve('./fixtures/ignore-js-css.html'), {
    encoding: 'utf-8'
  });

  var _processTpl3 = processTpl(tpl, 'http://kuitos.me/cdn/'),
      entry = _processTpl3.entry,
      template = _processTpl3.template;

  expect(entry).toBe('http://kuitos.me/cdn/app.js');
  expect(template.indexOf(genIgnoreAssetReplaceSymbol('style file')) !== -1).toBeTruthy();
  expect(template.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) === -1).toBeTruthy();
  expect(template.indexOf(genIgnoreAssetReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js')) === -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/polyfill.js')) === -1).toBeTruthy();
  expect(template.indexOf(genIgnoreAssetReplaceSymbol('http://kuitos.me/polyfill.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genIgnoreAssetReplaceSymbol('js file')) !== -1).toBeTruthy();
});
test('test resource with no quotation marks', function () {
  var tpl = '<!DOCTYPE html><html><head>\n' + '\n' + '<link rel="shortcut icon" href=https://t.alipayobjects.com/images/rmsweb/T1pqpiXfJgXXXXXXXX.png type="image/x-icon">\n' + '<link rel="preload" href=//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js>\n' + '<link rel="prefetch" href=/a3-ie6-polyfill.js>\n' + '<link rel=stylesheet href=/umi.css>\n' + '\n' + '<meta charset="utf-8">\n' + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">\n' + '<title>&#x91D1;&#x878D;&#x4E91;&#x63A7;&#x5236;&#x53F0;</title>\n' + '<script data-test>\n' + '  window.routerBase = "/";\n' + '</script>\n' + '<script \n ' + 'data-test>\n' + '  window.routerBase = "/";\n' + '</script>\n' + '<script>\n' + '\n' + '// umi version: 2.2.8\n' + '// build time: Wed Dec 26 2018 17:54:47 GMT+0800 (CST)\n' + '\n' + '</script>\n' + '<script src=//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js></script>\n' + '<script \n' + '  src=https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js\n' + '  crossorigin="anonymous"' + '></script>' + '<script \n' + '  src=/main-es2015.js\n' + '  type=module' + '></script>' + '<script \n' + '  src=/main-es5.js\n' + '  nomodule' + '></script>' + '<style>\n' + 'body {\n' + 'background-color: red;\n' + '}\n' + '</style>\n' + '</head>\n' + '<body>\n' + '\n' + '<div id="root"></div>\n' + '\n' + '<script src=/umi.js></script>\n' + '<!-- <script src=/a1.js></script>' + '-->' + '<script src=/comment.js></script>\n' + '<!-- <script src=/a2.js></script>\n' + '-->' + '<!--[if IE 6]>\n' + '<!-- <script src=/a3-ie6-polyfill.js></script>\n' + '<![endif]-->' + '\n' + '\n' + '</body></html>';

  var _processTpl4 = processTpl(tpl, 'http://kuitos.me'),
      entry = _processTpl4.entry,
      scripts = _processTpl4.scripts,
      template = _processTpl4.template;

  expect(entry).toBe('http://kuitos.me/comment.js');
  expect(scripts).toEqual(['<script data-test>\n  window.routerBase = "/";\n</script>', '<script \n data-test>\n  window.routerBase = "/";\n</script>', '//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js', 'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js', 'http://kuitos.me/main-es5.js', 'http://kuitos.me/umi.js', 'http://kuitos.me/comment.js']);
  expect(template.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/umi.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/comment.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/main-es5.js')) !== -1).toBeTruthy(); // preload ?????????????????????

  expect(template.indexOf('<link rel="preload" href=//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js>') === -1).toBeTruthy(); // preload/prefetch ????????? replace

  expect(template.indexOf(genLinkReplaceSymbol('/a3-ie6-polyfill.js', true)) !== -1).toBeTruthy();
  expect(template.indexOf('<link rel="prefetch" href=http://kuitos.me/a3-ie6-polyfill.js>') === -1).toBeTruthy(); // type="module" ????????? ignore

  expect(template.indexOf(genModuleScriptReplaceSymbol('/main-es2015.js', false)) === -1).toBeTruthy();

  var _processTpl5 = processTpl(tpl, 'http://kuitos.me/cdn'),
      styles = _processTpl5.styles,
      template2 = _processTpl5.template;

  expect(styles[0]).toBe('http://kuitos.me/umi.css');
  expect(template2.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
});
test('test resource mixing quotation marks', function () {
  var tpl = '<!DOCTYPE html><html><head>\n' + '\n' + '<link rel="shortcut icon" href=https://t.alipayobjects.com/images/rmsweb/T1pqpiXfJgXXXXXXXX.png type="image/x-icon">\n' + '<link rel="preload" href=//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js>\n' + '<link rel="prefetch" href="/a3-ie6-polyfill.js">\n' + '<link rel=stylesheet href="/umi.css">\n' + '\n' + '<meta charset="utf-8">\n' + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">\n' + '<title>&#x91D1;&#x878D;&#x4E91;&#x63A7;&#x5236;&#x53F0;</title>\n' + '<script data-test>\n' + '  window.routerBase = "/";\n' + '</script>\n' + '<script \n ' + 'data-test>\n' + '  window.routerBase = "/";\n' + '</script>\n' + '<script>\n' + '\n' + '// umi version: 2.2.8\n' + '// build time: Wed Dec 26 2018 17:54:47 GMT+0800 (CST)\n' + '\n' + '</script>\n' + '<script src="//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js"></script>\n' + '<script \n' + '  src=https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js\n' + '  crossorigin="anonymous"' + '></script>' + '<script \n' + '  src=/main-es2015.js\n' + '  type=\'module\'' + '></script>' + '<script \n' + '  src=\'/main-es5.js\'\n' + '  nomodule' + '></script>' + '<style>\n' + 'body {\n' + 'background-color: red;\n' + '}\n' + '</style>\n' + '</head>\n' + '<body>\n' + '\n' + '<div id="root"></div>\n' + '\n' + '<script src=./umi.js></script>\n' + '<!-- <script src=/a1.js></script>' + '-->' + '<script src="./comment.js"></script>\n' + '<!-- <script src=/a2.js></script>\n' + '-->' + '<!--[if IE 6]>\n' + '<!-- <script src=/a3-ie6-polyfill.js></script>\n' + '<![endif]-->' + '\n' + '\n' + '</body></html>';

  var _processTpl6 = processTpl(tpl, 'http://kuitos.me'),
      entry = _processTpl6.entry,
      scripts = _processTpl6.scripts,
      template = _processTpl6.template;

  expect(entry).toBe('http://kuitos.me/comment.js');
  expect(scripts).toEqual(['<script data-test>\n  window.routerBase = "/";\n</script>', '<script \n data-test>\n  window.routerBase = "/";\n</script>', '//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js', 'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js', 'http://kuitos.me/main-es5.js', 'http://kuitos.me/umi.js', 'http://kuitos.me/comment.js']);
  expect(template.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/umi.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/comment.js')) !== -1).toBeTruthy();
  expect(template.indexOf(genScriptReplaceSymbol('http://kuitos.me/main-es5.js')) !== -1).toBeTruthy(); // preload/prefetch ??????????????? ignore

  expect(template.indexOf('<link rel="preload" href=//gw.alipayobjects.com/as/g/antcloud-fe/antd-cloud-nav/0.2.22/antd-cloud-nav.min.js>') === -1).toBeTruthy(); // ????????????????????? host

  expect(template.indexOf(genLinkReplaceSymbol('/a3-ie6-polyfill.js', true)) === -1).toBeFalsy();
  expect(template.indexOf('<link rel="prefetch" href="/a3-ie6-polyfill.js">') === -1).toBeTruthy(); // type="module" ????????? ignore

  expect(template.indexOf(genModuleScriptReplaceSymbol('/main-es2015.js', false)) === -1).toBeTruthy();

  var _processTpl7 = processTpl(tpl, 'http://kuitos.me/cdn'),
      styles = _processTpl7.styles,
      template2 = _processTpl7.template;

  expect(styles[0]).toBe('http://kuitos.me/umi.css');
  expect(template2.indexOf(genLinkReplaceSymbol('http://kuitos.me/umi.css')) !== -1).toBeTruthy();
});
test('should work with huge html content', function () {
  var hugeHtmlContent = readFileSync(require.resolve('./fixtures/huge-content.html'), 'utf-8');
  var start = Date.now();
  processTpl(hugeHtmlContent, '//test.com');
  var during = Date.now() - start;
  expect(during < 1000).toBeTruthy();
});