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

let ball = {
    left:0, 
    right:0, 
    top:0, 
    bottom:0,
};

const barWidth = 100;
const barHight = 20; 
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHight;
let barMoveSpd = 10;

let paddle = {
    left:0, 
    right:0, 
    top:0, 
    bottom:0,
}

// let recPosX = canvas.width / 2 + 150;         // 다른언어는 멤버변수가 들어있어서 오타시 잡아줌  
// let recPosY = canvas.height / 2;
// let recMoveDirX = -1;                    // 원이 이동하는 방향 X축
// let recMoveDirY = -1;                    // 원이 이동하는 방향 Y축
// let recMoveSpd = 6;                     // 이동속도

// let recPosX = canvas.width / 2
// let recPosY = canvas.height / 2;

document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('keyup', keyUpEventHandler);

function keyDownEventHandler(e)
{
    if(e.key == 'ArrowRight')
    {
        // updateRec();
        // 바를 오른쪽으로 이동
        if(barPosX + barWidth < canvas.width)
        {
            barPosX += barMoveSpd;
            //1번씩(2-1)
        }
        else{
        }        
    }    
    else if(e.key == 'ArrowLeft')
    {
        // updateRec();
        // 바를 왼쪽으로 이동
        if(barPosX > 0 )
        {
            barPosX -= barMoveSpd;
            //1번씩(2-2)
        }        
    }

    //2에 1번(1) 연산량이 많을수도 있다. 
    paddle.left = barPosX;
    paddle.right = barPosX + barWidth;
    paddle.top = barPosY;
    paddle.bottom = barPosY + barHight;
}

function keyUpEventHandler(e)
{
    
}



// 실습1. 동그라미가 오른쪽으로 움직이다가 캔버스 끝에 닿으면 왼쪽으로 이동 반대까지

// 실습2. 동그라마가 빠르게 움직이기

// 실습3. 방향키로 방향을 입력하면 네모칸의 방향이 움직인다. // 화면밖으로 이동하는걸 막는다.

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


    ball.left = arcPosX - (arcRadius / 2);
    ball.right = arcPosX + (arcRadius / 2);
    ball.top = arcPosY - (arcRadius / 2);
    ball.bottom = arcPosY + (arcRadius / 2);
    
    // 충돌확인 어떤경우에도 안부딪히는 상황
    if(isCollisionRectToRect(ball, paddle))
    {
        arcMoveDirY = -1;
        arcPosY = paddle.top - arcRadius;
    }
}

function isCollisionRectToRect(rectA, rectB)
{
    // a의 완쪽과 b의 오른쪽
    // a의 오른쪽과 b의 왼쪽
    // a의 아래쪽과 b의 위쪽
    // a의 위쪽과 b의 아래쪽
    if (rectA.letf > rectB.right ||     // a의 왼쪽이 더 클때
        rectA.right < rectB.left ||     // b의 왼쪽이 더 클때
        rectA.top > rectB.bottom ||     // a의 탑이 더 클때
        rectA.bottom < rectB.top )      // b의 탑이 더 클때
        {
            return false;
        }

    return true;
}


// function updateRec()
// {
//     //데이터 수정 도형의 위치 이동
//     if(recPosX < 0)
//     {
//         recMoveDirX = 1;
//     }
//     else if(recPosX > canvas.width)
//     {
//         recMoveDirX = -1;        
//     } 
//     recPosX += recMoveDirX * recMoveSpd;       
// }

function draw()
{
    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 다른 도형 그리기
    
    drawArc();
    drawRect();
}


// function drawCanavs()
// {
//     context.beginPath();
//     context.Rect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = "rgba(10, 10, 10, ,0.1)";
//     context.fill();

//     context.closePath();
// }


function drawArc()                  // 컴파일시 실행준비 함수는 한번씩만 작동하는게 좋다 - 기능하나만 구현하는게 최고다
{    
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'green';
    context.fill();

    context.closePath();
}

function drawRect()
{
    context.beginPath();

    // context.rect(canvas.width / 2 , canvas.heigh / 2, 100, 100);
    context.rect(barPosX , barPosY, barWidth, barHight);
    context.fillStyle = 'red';
    context.fill();

    context.closePath();
}

setInterval(update, 10);
// setInterval(updateRec, 10);
setInterval(draw, 10);           // 런타임시 컴피알된 함수 실행