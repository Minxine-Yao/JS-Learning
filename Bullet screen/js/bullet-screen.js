const maxLengthOfCache = 1000;
const maxHeightOfScreen = 500;
var recentWords = []; //存储最近弹幕内容，上限暂设1000条
var curWords = []; //目前正在屏幕上滑动的弹幕(span)
var curColor = "yellow";

window.onload = function(){
    // 选择颜色
    var colors = document.querySelector("#color-selection").childNodes;
    for(var n=0;n<colors.length;n++){
        (function(){
            var i = n;
            colors[i].onclick = function(){
                document.getElementById(curColor).className = "";
                colors[i].className = "color-selected";
                curColor = colors[i].id;
            }
        })();
    }
    // 按下发送按钮
    document.getElementById("send").onclick = function(e){
        sendWords();
    }
    // 焦点在输入框时按下Enter键
    document.onkeydown = function(e){
        var inputWords = document.getElementById("input-words");
        if(document.activeElement === inputWords){
            // 焦点在input框内
            var keyCode;
            if(window.event){
                keyCode = e.keyCode;
            }else if(e.which){
                keyCode = e.which;
            }

            if(keyCode === 13){
                //按下Enter
                sendWords();
            } 
        }
    }
    // 按下清屏按钮
    document.getElementById("clear").onclick = function(e){
        clearCurWords();
    }
}

function sendWords(){
    var inputWords = document.getElementById("input-words");
    var word = inputWords.value;
    inputWords.value = "";
    // 将该条弹幕内容放入缓存中
    if(recentWords.length === maxLengthOfCache){
        recentWords.shift();
    }
    recentWords.push(word);
    // 创建弹幕为span
    var bullet = document.createElement("span");
    bullet.innerHTML = word; 
    bullet.className = "word " + curColor;
    var heightDist = Math.random()*maxHeightOfScreen/2;
    var coin = Math.random()*2;
    if(coin >= 1)
        bullet.style.top = heightDist + "px";
    else
        bullet.style.bottom = heightDist + "px";
    var screen = document.getElementById("screen");
    // 送入“正在飞行弹幕”数组
    curWords.push(bullet);
    // 插入为screen的首个子节点
    if(screen.firstChild)
        screen.insertBefore(bullet,screen.firstChild);
    else
        screen.appendChild(bullet);
    // 添加CSS3动画播放停止处理事件
    bullet.addEventListener("webkitAnimationEnd",function(){
        doOnAnimationEnd(curWords.length - 1);
    });
    bullet.addEventListener("animationEnd",function(){
        doOnAnimationEnd(curWords.length - 1);
    });
}

function doOnAnimationEnd(bulletIndex){
    // 在DOM中删除该节点
    var span = curWords[bulletIndex];
    span.parentNode.removeChild(span);
    // 从“正在飞行弹幕”数组中移除该元素
    curWords.splice(bulletIndex,1);
}

function clearCurWords(){
    // 清屏
    curWords.forEach(function(span){
        span.parentNode.removeChild(span);
    });
    curWords = [];
}