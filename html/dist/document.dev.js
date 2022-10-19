"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var documentElement = document.documentElement;
var body = document.body;
var head = document.head;

var createElement = function createElement(name) {
  return document.createElement(name);
};

var createImage = function createImage(_) {
  return new Image();
};

var addEventWatcher = function addEventWatcher(ele, event, callback) {
  return ele["on".concat(event)] = callback;
}; // 元素.addEventListener(事件,回调);


var getRect = function getRect(ele) {
  return ele.getBoundingClientRect();
};

var CLICK = 'click';
var 设置等级标题 = 设置等级.children[0];

var 全关闭 = function 全关闭(_) {
  设置等级样式.display = '';
};

var 地区 = document.getElementById('area');
var 数据 = {};

var 获取所有省元素们 = function 获取所有省元素们(_) {
  return _toConsumableArray(地区.children);
};

var 获取所有省等级们 = function 获取所有省等级们(_) {
  return 获取所有省元素们().map(function (元素) {
    return +元素.getAttribute('level') || 0;
  });
};

var 本地存储等级们钥匙 = 'china-ex-levels';

var 保存等级们 = function 保存等级们(_) {
  localStorage.setItem(本地存储等级们钥匙, 获取所有省等级们().join(''));
};

var 省等级们正则 = /^\d{34}$/;

var 获取等级们并生效 = function 获取等级们并生效(_) {
  var 等级们字串 = localStorage.getItem(本地存储等级们钥匙);
  if (!省等级们正则.test(等级们字串)) return;
  var 等级们 = 等级们字串.split('');
  获取所有省元素们().forEach(function (元素, 下标) {
    元素.setAttribute('level', 等级们[下标]);
  });
};

var 图形 = body.children[0];
var 设置等级样式 = 设置等级.style;
var 最小间距 = 6;
var title = document.getElementById('title');

function setScore(score) {
  var domArr = document.getElementsByClassName('分数');

  _toConsumableArray(domArr).forEach(function (i) {
    return i.innerHTML = "\u5206\u6570\uFF1A".concat(score);
  });
}

addEventWatcher(地区, CLICK, function (事件) {
  事件.stopPropagation();
  var 省元素 = 事件.target;
  var 省元素方位 = getRect(省元素);
  var id = 省元素.id;
  数据.省元素 = 省元素;
  数据.id = id;
  设置等级标题.innerHTML = id;
  设置等级样式.display = 'block';
  var 设置等级元素方位 = getRect(设置等级);
  var 左 = Math.round(documentElement.scrollLeft + 省元素方位.left + 省元素方位.width / 2 - 设置等级元素方位.width / 2);
  左 = Math.min(左, body.offsetWidth - 设置等级元素方位.width - 最小间距);
  左 = Math.max(左, 最小间距);
  var 上 = Math.round(documentElement.scrollTop + 省元素方位.top + 省元素方位.height / 2 - 设置等级元素方位.height / 2);
  上 = Math.min(上, body.offsetHeight - 设置等级元素方位.height - 最小间距);
  上 = Math.max(上, 最小间距);
  设置等级样式.left = 左 + 'px';
  设置等级样式.top = 上 + 'px';
});
addEventWatcher(document, CLICK, 全关闭);

var 计分 = function 计分(_) {
  var 分 = 获取所有省等级们().reduce(function (全, 当前) {
    return +全 + 当前;
  }, 0);
  分数.innerHTML = "\u5206\u6570: ".concat(分);
  setScore(分);
};

addEventWatcher(设置等级, CLICK, function (事件) {
  事件.stopPropagation();
  var 等级 = 事件.target.getAttribute('data-level');
  if (!等级) return false;
  数据.省元素.setAttribute('level', 等级);
  计分();
  全关闭();
  保存等级们();
});
获取等级们并生效();
计分();

var 读文件成地址 = function 读文件成地址(原始数据, 回调) {
  var 读 = new FileReader();

  读.onload = function (事件) {
    return 回调(事件.target.result);
  };

  读.readAsDataURL(原始数据);
};

var 获取字体数据地址 = function 获取字体数据地址(地址, 回调) {
  fetch(地址).then(function (资源) {
    return 资源.blob();
  }).then(function (原始数据) {
    return 读文件成地址(原始数据, 回调);
  });
};

var 获取字体样式 = function 获取字体样式(字体名, 回调) {
  获取字体数据地址("".concat(字体名, ".woff?v=a"), function (地址) {
    return 回调("@font-face {\n        font-family: ".concat(字体名, ";\n        src: url(").concat(地址, ");\n    };"));
  });
};

获取字体样式('slice', function (样式字串) {
  图形.querySelector('style').innerHTML = 样式字串;
  var 样式元素 = createElement('style');
  样式元素.innerHTML = 样式字串;
  head.appendChild(样式元素);
  setTimeout(function (_) {
    return documentElement.removeAttribute('data-loading');
  }, 2e3);
});
var 宽 = 1134;
var 高 = 976;
var 比 = 2;
var canvas = createElement('canvas');
canvas.width = 宽 * 比;
canvas.height = 宽 * 比;
var context = canvas.getContext('2d');

var 从文档文本新建图形文件 = function 从文档文本新建图形文件(文档文本) {
  var 原始数据 = new Blob([文档文本], {
    type: 'image/svg+xml'
  });
  return URL.createObjectURL(原始数据);
};

var 是社交媒体 = /weibo|qq/i.test(navigator.userAgent); // alert(navigator.userAgent)

var 下载文件 = function 下载文件(链接, 文件名) {
  var 元素 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : createElement('a');

  if (!是社交媒体) {
    元素.download = 文件名;
  }

  元素.href = 链接;
  元素.click();
};

var 地址变图像元素 = function 地址变图像元素(地址, 回调) {
  var 图 = createImage();
  addEventWatcher(图, 'load', function (_) {
    return setTimeout(function (_) {
      return 回调(图);
    }, 500);
  });
  图.src = 地址;
};

var 日志 = function 日志(_) {
  var levels = 获取所有省等级们().join('');
  requestIdleCallback(function () {
    fetch("http://42.192.180.126:8080/share?levels=".concat(levels)).then(function (res) {// console.log(res.json());
    });
  });
};

var 输出图像样式 = 输出图像.style;

var 保存图像 = function 保存图像(_) {
  title.style.display = 'block';
  title.offsetHeight;
  documentElement.setAttribute('data-running', 'true');
  var 文档文本 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 ".concat(宽, " ").concat(高, "\" width=\"").concat(宽, "px\" height=\"").concat(高, "px\">").concat(图形.innerHTML, "</svg>");
  var 数据地址 = 从文档文本新建图形文件(文档文本); // open(数据地址);
  // return ;

  地址变图像元素(数据地址, function (图) {
    context.fillStyle = '#989cc7';
    context.fillRect(0, 0, 宽 * 比, 宽 * 比);
    context.drawImage(图, 0, 0, 宽, 高, 0, (宽 - 高) * 比 / 2, 宽 * 比, 高 * 比);
    canvas.toBlob(function (元素数据) {
      var 地址 = URL.createObjectURL(元素数据);
      输出图像.querySelector('img').src = 地址;
      输出图像样式.display = '';
      setTimeout(function (_) {
        下载文件(地址, "[\u77FF\u5927\u5236\u9738(\u5357\u6E56)]".concat(+new Date(), ".png"));
        documentElement.removeAttribute('data-running');
        title.style.display = 'none';
      }, 50);
    }, 'image/png');
  });
  日志();
};

addEventWatcher(保存, CLICK, 保存图像);
addEventWatcher(输出图像.querySelector('a'), CLICK, function (_) {
  输出图像样式.display = 'none';
}); // ------------------------------------------
// 埋点

function bin2hex(s) {
  var i,
      l,
      o = '',
      n;
  s += '';

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? '0' + n : n;
  }

  return o;
}

function getUUID(domain) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var txt = domain;
  ctx.textBaseline = 'top';
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = 'tencent';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText(txt, 4, 17);
  var b64 = canvas.toDataURL().replace('data:image/png;base64,', ''); // window.atob 用于解码使用 base-64 编码的字符串

  var bin = atob(b64);
  var crc = bin2hex(bin.slice(-16, -12));
  return crc;
} // console.log(getUUID('123'));


function visit() {
  requestIdleCallback(function () {
    var id = getUUID('123');
    fetch("http://42.192.180.126:8080/visit?id=".concat(id)).then(function (res) {//   console.log(res.json());
    });
  });
}

window.addEventListener('load', visit);