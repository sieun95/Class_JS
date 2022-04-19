/* 
    캔버스 설정
    document
    context
*/

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const arcRadius = 20;
let arcPosX = canvas.width / 2 + 150;         // 다른언어는 멤버변수가 들어있어서 오타시 잡아줌  
let arcPosY = canvas.height / 2;
let arcMoveDirX = -1;                    // 원이 이동하는 방향 X축
let arcMoveDirY = -1;                    // 원이 이동하는 방향 Y축
let arcMoveSpd = 6;                     // 이동속도

const barWidth = 100;
const barHeight = 20;

let barPosX = canvas.width / 2 - barWidth / 2 ;
let barPosY = canvas.height - barHeight ;
let barMoveSpeed = 10;

document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('keyup', keyUpEventHandler);

function keyDownEventHandler(e)
{
    if (e.key == 'ArrowRight')
    {
        // 바를 오른쪽으로 이동
        if(barPosX + barWidth < canvas.width)
        {
            barPosX += barMoveSpeed;
        }
        
    }
    else if (e.key == 'ArrowLeft')
    {
        // 바를 왼쪽으로 이동
        if(barPosX)
        barPosX -= barMoveSpeed;
    }
}

function keyUpEventHandler()
{

}

// 실습1. 동그라미가 오른쪽으로 움직이다가 캔버스 끝에 닿으면 왼쪽으로 이동 반대까지

// 실습2. 동그라마가 빠르게 움직이기

// 실습3. 방향키로 방향을 입력하면 네모칸의 방향이 움직인다.


function update()
{
    //데이터 수정 도형의 위치 이동
    if(arcPosX - arcRadius < 0)
    {
        arcMoveDirX = 1;
    }
    else if(arcPosX + arcRadius > canvas.width)
    {
        arcMoveDirX = -1;        
    }
    
    if(arcPosY - arcRadius < 0)
    {
        arcMoveDirY = 1;
    }
    else if(arcPosY + arcRadius > canvas.height)
    {
        arcMoveDirY = -1;
    }
    
    arcPosX += arcMoveDirX * arcMoveSpd;  
    arcPosY += arcMoveDirY * arcMoveSpd;  
}

function drawCanavs()
{
    context.beginPath();
    context.Rect(0, 0, 400, 400);
    context.fillStyle = 'grey';
    context.fill();

    context.closePath();
}

function draw()
{
    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 다른 도형 그리기
    
    drawArc();
    drawRect();
}

function drawArc()                  // 컴파일시 실행준비 함수는 한번씩만 작동하는게 좋다
{    
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();

    context.closePath();
}

function drawRect()
{
    context.beginPath();

    // context.rect(canvas.width / 2 , canvas.heigh / 2, 100, 100);
    context.rect(barPosX , canvas.height - barHeight / 2, 100, 20);
    context.fillStyle = 'red';
    context.fill();

    context.closePath();
}

setInterval(update, 10);
setInterval(draw, 10);           // 런타임시 컴피알된 함수 실행