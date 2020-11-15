"use strict";
const startmain = document.querySelector('.con');
const scoreshow = document.querySelector('.score');
const span = document.querySelector('#cntspan');
const countdown = document.querySelector(".count-down");
var counterDown; //定时器

var blocknumall = [];
let score = 0;
let counter = 50;
let startflag = 0; //1 开始 0 为开始


//调整屏幕
(function changescreen() {
    let a = window.screen.width / 1520;
    document.body.style.zoom = a;
})();

function cntdown() {
    if (counter !== 0) {
        counter -= 1;
        span.innerHTML = counter;
        if (counter === 10) {
            countdown.style.backgroundColor = "orange"
        } else if (counter === 5) {
            countdown.style.backgroundColor = "red";
        }
    } else {
        over();
    }
}

function creatfirst(boxnum) {
    const rownew = document.createElement('div');
    const rowold = document.querySelector('.row');
    for (let i = 0; i < boxnum; i++) {
        const box = document.createElement('div');
        box.className = 'box yellow';
        rownew.appendChild(box)
    }
    rownew.className = 'row';
    if (rowold) {
        startmain.insertBefore(rownew, rowold);
    } else {
        startmain.appendChild(rownew);
    }
}

function creatbox(boxnum) {
    const rownew = document.createElement('div');
    const rowold = document.querySelector('.row');
    let blacknum = rannum(0, boxnum - 1, 1)[0]
    blocknumall.push(blacknum);
    for (let i = 0; i < boxnum; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        if (i == blacknum) {
            box.className = 'box black'
        }
        rownew.appendChild(box)
    }
    rownew.className = 'row';

    startmain.insertBefore(rownew, rowold);

}

function move() {
    creatbox(4);
    const rowall = document.querySelectorAll('.row');
    for (let i = 0; i < rowall.length; i++) {
        if (rowall[i].offsetTop > 700) {
            rowall[i].remove()
        }
    }

}


function rannum(min, max, num) {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return arr
}

function init() {
    if (startflag === 0) {
        startflag = 1;
    } else {
        alert('游戏已经开始了');
        return
    }
    score = 0;
    scoreshow.innerHTML = '你的分数为：' + score;
    creatfirst(4);
    move();
    move();
    move();
    counterDown = setInterval(cntdown, 1000);
}

function judge(e) {

    function judge1(i) {
        let blacknum = blocknumall.shift();
        const thirdrow = startmain.querySelectorAll('.row')[2];
        if (blacknum == i) {
            thirdrow.childNodes[i].classList.add('gray');
            score++;
            scoreshow.innerHTML = '你的分数为：' + score;
            move();
        } else {
            over();
        }
    }
    if (e == 'd') {
        judge1(0);
    }
    if (e == 'f') {
        judge1(1);
    }
    if (e == 'j') {
        judge1(2);
    }
    if (e == 'k') {
        judge1(3);
    }
    if (e == ' ') {
        init();
    }
}

function over() {
    alert('你的分数为' + score);
    startflag = 0;
    blocknumall = [];
    score = 0;
    scoreshow.innerHTML = '你的分数为：' + score;
    counter = 50;
    span.innerHTML = counter;
    startmain.innerHTML = '';
    countdown.style.backgroundColor = "darkcyan";
    clearInterval(counterDown);

}
document.addEventListener('keypress', function(e) {
    judge(e.key);
})