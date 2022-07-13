let maxImgIndex = 15; // 最大的索引值
let curTargetIndex = null; // 当前的索引
let isGameOver = false; // 游戏是否结束



// 获取 DOM 节点
let panel = document.querySelector('.panel'); // 获取整个魔盘
let initImg = document.querySelector('#initImg'); // 获取魔盘的圆心
let resultImg = document.querySelector('#resultImg'); // 获取结果图片
let dictionary = document.querySelector('.dictionary'); // 获取右侧的字典表

// 返回从 min 到 max 的随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 初始化字典表
function init() {
    curTargetIndex = Math.floor(Math.random() * 16); // 得到一个从 0 到 15 的随机数

    // 首先清空上一次的字典表结果
    dictionary.innerHTML = '';

    // 生成新的字典表

    // 一共是 100 张图片，如果是 9 的倍数，那么图片的索引应该为 curTargetIndex
    // 否则的话就从 0～15 之间随便选择一张

    for(let i=0; i<100; i++){
        let imgIndex = null; // 用于存储图片的索引值
        if(i % 9 === 0){
            // 结果为 9 的倍数，该位置放置索引为 curTargetIndex 值的图片
            imgIndex = curTargetIndex;
        } else {
            // 否则，从 0 到 15 中随机选择一张图片
            imgIndex = Math.floor(Math.random() * 16);
        }

        // 将结果图片添加到圆盘中心 
        dictionary.innerHTML += `
            <div class="item">
                <span class="number">${i}</span>
                <span class="value">
                    <img src="../images/values/${imgIndex}.png"/>
                </span>
            </div>
        `;
    }

}

init();


// 绑定点击事件
panel.onclick = function(e){
    if(isGameOver){ // 判断游戏是否结束
        // 游戏已结束，询问是否再玩一次
        if(window.confirm('再玩一次？')){
            init(); // 重新初始化魔盘
            initImg.style.opacity = 1; // 显示魔盘圆心
            resultImg.style.opacity = 0; // 隐藏结果图片
            isGameOver = false;
            // 移除样式和事件，以便再次触发
            e.currentTarget.setAttribute('style', '');
            panel.removeEventListener('transitionend', transitionendHandle)
        }
    } else {
        // 首次玩，将结果显示出来
        e.currentTarget.style.transition = 'all 2s'
        e.currentTarget.style.transform = 'rotate(1800deg)';
        // transitionend 事件，判断过渡效果是否结束
        panel.addEventListener('transitionend', transitionendHandle);
    }
}

// 旋转完成后
function transitionendHandle(){
    initImg.style.opacity = 0; // 将魔盘圆心修改为透明
    resultImg.src = `../images/values/${curTargetIndex}.png`; // 设置结果图片
    resultImg.style.opacity = 1; // 将结果图片显示出来
    isGameOver = true;
}