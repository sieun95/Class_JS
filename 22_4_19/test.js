const canvas = document.getElementById('testCanvas');
const context = canvas.getContext('2d');

let arcPosX = canvas.width / 2 + 20;
let arcPosY = canvas.height / 2 + 4;
let arcMoveDirX = -1;
let arcMoveDirY = -1
let arcSpeed = 1;

// 실습. 동그라미가 오른쪽으로 움직이다가 캔버스 끝에 닿으면 왼쪽으로 이동

function update() {
    // 데이터 수정 (도형의 위치 이동)
    if(arcPosX - 50 < 0)
    {
        arcMoveDirX = 1;
        arcSpeed = 6;
        
    }
    else if(arcPosX + 50 > canvas.width)
    {
        arcMoveDirX = -1;
        arcSpeed = 6;
    }

    if (arcPosY -50 < 0)
    {
        arcMoveDirY = 1;
    }
    else if (arcPosY +50 > canvas.height)
    {
        arcMoveDirY = -1;
    }

    arcPosX += arcMoveDirX * arcSpeed
    arcPosY += arcMoveDirX * arcSpeed
}

function draw() {
    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
    // 다른 도형 그리기
    drawArc();
}

function drawCanvas() {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(10, 10, 10, 0.1)";
    context.fill();
    context.closePath();
}

function drawArc() {
    context.beginPath()

    context.arc(arcPosX, arcPosY, 50, 0, 2 * Math.PI)
    context.fillStyle = 'blue';
    context.fill();

    context.closePath();
}

setInterval(update, 10)
setInterval(draw, 10) // 1000분의 1