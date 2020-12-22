(function (win, doc) {
  // win, doc
  let resizeEvt = 'orientationchange' in win ?'orientationchange' : 'resize';
  function recalc() {
    // 1.获取屏幕宽度
    let nWidth = win.innerWidth || document.documentElement.clientWidth;
    document.documentElement.style.fontSize = nWidth * 100/ 750 + 'px';
  }
  // dom结构加载完成，就触发一下该函数
  doc.addEventListener('DOMContentLoaded', recalc);
  win.addEventListener(resizeEvt, recalc);
})(window, document);
