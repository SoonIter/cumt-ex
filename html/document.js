const documentElement = document.documentElement;
const body = document.body;
const head = document.head;
const createElement = name => document.createElement(name);
const Image = _ => new Image();

const addEventWatcher = (ele, event, callback) =>
  (ele[`on${event}`] = callback); // 元素.addEventListener(事件,回调);
const getRect = ele => ele.getBoundingClientRect();
const CLICK = 'click';

const 设置等级标题 = 设置等级.children[0];

const 全关闭 = _ => {
  设置等级样式.display = '';
};
const 地区 = document.getElementById('area');
const 数据 = {};
const 获取所有省元素们 = _ => [...地区.children];
const 获取所有省等级们 = _ =>
  获取所有省元素们().map(元素 => +元素.getAttribute('level') || 0);
const 本地存储等级们钥匙 = 'china-ex-levels';
const 保存等级们 = _ => {
  localStorage.setItem(本地存储等级们钥匙, 获取所有省等级们().join(''));
};
const 省等级们正则 = /^\d{34}$/;
const 获取等级们并生效 = _ => {
  const 等级们字串 = localStorage.getItem(本地存储等级们钥匙);
  if (!省等级们正则.test(等级们字串)) return;
  const 等级们 = 等级们字串.split('');
  获取所有省元素们().forEach((元素, 下标) => {
    元素.setAttribute('level', 等级们[下标]);
  });
};
const 图形 = body.children[0];
const 设置等级样式 = 设置等级.style;
const 最小间距 = 6;

addEventWatcher(地区, CLICK, 事件 => {
  事件.stopPropagation();

  const { target: 省元素 } = 事件;
  const 省元素方位 = getRect(省元素);
  const { id } = 省元素;
  数据.省元素 = 省元素;
  数据.id = id;

  设置等级标题.innerHTML = id;
  设置等级样式.display = 'block';
  const 设置等级元素方位 = getRect(设置等级);

  let 左 = Math.round(
    documentElement.scrollLeft +
      省元素方位.left +
      省元素方位.width / 2 -
      设置等级元素方位.width / 2,
  );
  左 = Math.min(左, body.offsetWidth - 设置等级元素方位.width - 最小间距);
  左 = Math.max(左, 最小间距);

  let 上 = Math.round(
    documentElement.scrollTop +
      省元素方位.top +
      省元素方位.height / 2 -
      设置等级元素方位.height / 2,
  );
  上 = Math.min(上, body.offsetHeight - 设置等级元素方位.height - 最小间距);
  上 = Math.max(上, 最小间距);

  设置等级样式.left = 左 + 'px';
  设置等级样式.top = 上 + 'px';
});
addEventWatcher(document, CLICK, 全关闭);
const 计分 = _ => {
  const 分 = 获取所有省等级们().reduce((全, 当前) => {
    return +全 + 当前;
  }, 0);
  分数.innerHTML = `分数: ${分}`;
};
addEventWatcher(设置等级, CLICK, 事件 => {
  事件.stopPropagation();
  const 等级 = 事件.target.getAttribute('data-level');
  if (!等级) return false;
  数据.省元素.setAttribute('level', 等级);
  计分();
  全关闭();
  保存等级们();
});

获取等级们并生效();
计分();

const 读文件成地址 = (原始数据, 回调) => {
  const 读 = new FileReader();
  读.onload = 事件 => 回调(事件.target.result);
  读.readAsDataURL(原始数据);
};
const 获取字体数据地址 = (地址, 回调) => {
  fetch(地址)
    .then(资源 => 资源.blob())
    .then(原始数据 => 读文件成地址(原始数据, 回调));
};
const 获取字体样式 = (字体名, 回调) => {
  获取字体数据地址(`${字体名}.woff?v=a`, 地址 =>
    回调(`@font-face {
        font-family: ${字体名};
        src: url(${地址});
    };`),
  );
};
获取字体样式('slice', 样式字串 => {
  图形.querySelector('style').innerHTML = 样式字串;
  const 样式元素 = createElement('style');
  样式元素.innerHTML = 样式字串;
  head.appendChild(样式元素);
  setTimeout(_ => documentElement.removeAttribute('data-loading'), 2e3);
});

const 宽 = 1134;
const 高 = 976;
const 比 = 2;

const canvas = createElement('canvas');

canvas.width = 宽 * 比;
canvas.height = 宽 * 比;

const context = canvas.getContext('2d');

const 从文档文本新建图形文件 = 文档文本 => {
  const 原始数据 = new Blob([文档文本], { type: 'image/svg+xml' });
  return URL.createObjectURL(原始数据);
};
const 是社交媒体 = /weibo|qq/i.test(navigator.userAgent);
// alert(navigator.userAgent)
const 下载文件 = (链接, 文件名, 元素 = createElement('a')) => {
  if (!是社交媒体) {
    元素.download = 文件名;
  }
  元素.href = 链接;
  元素.click();
};
const 地址变图像元素 = (地址, 回调) => {
  const 图 = Image();
  addEventWatcher(图, 'load', _ => setTimeout(_ => 回调(图), 500));
  图.src = 地址;
};
const 日志 = _ => {
  console.log(获取所有省等级们().join(''));
  // Image().src = `https://lab.magiconch.com/api/china-ex/log?levels=${获取所有省等级们().join(
  //   '',
  // )}`;
};


const 输出图像样式 = 输出图像.style;
const 保存图像 = _ => {
  documentElement.setAttribute('data-running', 'true');

  const 文档文本 = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${宽} ${高}" width="${宽}px" height="${高}px">${图形.innerHTML}</svg>`;
  const 数据地址 = 从文档文本新建图形文件(文档文本);
  // open(数据地址);
  // return ;
  地址变图像元素(数据地址, 图 => {
    context.fillStyle = '#efb4b4';
    context.fillRect(0, 0, 宽 * 比, 宽 * 比);
    context.drawImage(
      图,
      0,
      0,
      宽,
      高,
      0,
      ((宽 - 高) * 比) / 2,
      宽 * 比,
      高 * 比,
    );
    // return 下载文件(画板.toDataURL(),`[神奇海螺][中国制霸]${+new Date()}.png`,保存);
    canvas.toBlob(元素数据 => {
      const 地址 = URL.createObjectURL(元素数据);
      输出图像.querySelector('img').src = 地址;
      输出图像样式.display = '';

      setTimeout(_ => {
        下载文件(地址, `[神奇海螺][中国制霸]${+new Date()}.png`);
        documentElement.removeAttribute('data-running');
      }, 50);
    }, 'image/png');
  });
  // 日志();
};

addEventWatcher(保存, CLICK, 保存图像);

addEventWatcher(输出图像.querySelector('a'), CLICK, _ => {
  输出图像样式.display = 'none';
});

// ------------------------------------------
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

  var b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
  // window.atob 用于解码使用 base-64 编码的字符串
  var bin = atob(b64);
  var crc = bin2hex(bin.slice(-16, -12));
  return crc;
}

console.log(getUUID('123'));
