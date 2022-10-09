/**
 * 移动端字体大小适配
 */
function resize() {
    // 获取设备的宽度
    const devicCilent = document.documentElement.clientWidth || window.innerWidth

    if (devicCilent >= 750) {
        devicCilent = 750
    }
    if (devicCilent <= 320) {
        devicCilent = 320
    }


    // 750px --> 1rem=100px  375px--> 1rem=50px
    document.documentElement.style.fontSize = (devicCilent / 7.5) + 'px'

    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

/**
 *  window.onresize 调整窗口大小加载事件，当触发时就调用的处理函数
 *  我们经常利用这个事件完成响应式布局。window.innerWidth为当前屏幕的宽度
 * */
resize()
window.onresize = function () {
    // console.log(12);
    resize()
}