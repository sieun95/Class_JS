/*
    * async await

*/

const canvas = document.getElementById('myCanvas');

const context = canvas.getContext("2d");


// * 입력값 받아오기
let column = prompt("가로");
let row = prompt("세로")


// * ball 위치 스피드

let arcPosX = 200;
let arcPosY = 370;
let arcMoveDirX = -1;
let arcMoveDirY = -1;
let arcMoveSpd = 5;
const arcRadius = 10;

// * bar 위치 크기 
const barWidth = 200;
const barHeight = 20;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight;

// * 벽돌관련
const brickWidth = 50; //간격은 10
const brickHeight = 25; // 간격 5
const brickColumn = column; //열
const brickRow = row; //행
// const brickColumn = 5; //열
// const brickRow = 4; //행
let bricks; //벽돌 전체
let bricksCount = brickColumn * brickRow

let wallMoveDir = 1;
let wallSpd = 1;


let ball = {
    left:0, right:0, top:0, bottom:0,  
};

let paddle = {
    left:barPosX, right:barPosX + barWidth, top:380, bottom:400,
};

// * 키 함수 추가
document.addEventListener('keydown', keyDownEventHandler);

//* 클래스로 객체의 설계도를 만든다 

class Brick {
    constructor(left, top, right, bottom, color) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.isAlive = true;
        this.color = color;
    }
    draw() {
        if(this.isAlive) 
        { //살아있는 것만 그리기
            context.rect(this.left, this.top, brickWidth, brickHeight);
            context.fillStyle= this.color;
            context.fill();
        }

    }
}

let wall = new Brick(
    200 - (brickWidth/2),      //* left
    200 - (brickHeight/2),     //* top
    200 + (brickWidth/2 ),        //* right
    200 + (brickHeight/2),        //* bottom
    'black'     //* color
)


function setBricks() {
    bricks = []
    for(let i = 0; i < brickRow; i++){ // 세로
        bricks[i] = [];
        for(let j = 0; j < brickColumn; j++){  //가로
            // * 블록 하나의 초기값을 설정하는 실행문 
            bricks[i][j] = new Brick(
                55 + j * (brickWidth +10),      //* left
                30 + i * (brickHeight + 5),     //* top
                55 + j * (brickWidth + 10) + 50,        //* right
                30 + i * (brickHeight + 5) + 25,        //* bottom
                'green'     //* color
            );
        }
    }
    console.log(bricks)
}

function drawBlack()
{
    context.beginPath();
    wall.draw();
    context.closePath();
}




// * 블록 그리는 함수
function drawBricks()
{
    context.beginPath();
    for(let i = 0; i < brickRow; i++){ //위에서부터 4줄
        for(let j = 0; j < brickColumn; j++){  //가로로 5개
            bricks[i][j].draw();   
        }
    }
    context.closePath();
}

async function gameTime(timeout) {
    if(bricksCount == 0) {
        setTimeout(() => {
            window.location.reload(true)
            alert("win")
        }, timeout);
    }
}

// async function gameWin(){
//     await gameTime(3000)
// }

function gameOver(){
    if(arcPosY > 370) {
        window.location.reload(true)
        alert("over")
    }
}

let setStart = true;
let barMove = 1;

// * 키 이벤트 함수 

function keyDownEventHandler(e) {
    if(e.key == " " && setStart){
        setInterval(update, 10)
        setStart = false
    }
    if(e.keyCode == 39) { // && 조건문안에 이렇게 줬었는데 그냥 이중 if를 사용하자...
        if(barPosX + 100 < canvas.width - 100) {
            barMove = 30
        } else if (barPosX + 100 >= canvas.width - 100) {
            barMove = 0;
        }
    }
    else if(e.keyCode == 37) {
        if(barPosX> 0){
            barMove = -30
        } else if (barPosX <= 0) { // 여기선 +100을 안해준다. rect의 끝을 생각했을 때
            barMove = 0;
        }
    }
    if(e.key == " ") {
        return true
    }

    if (e.keyCode == 37 || e.keyCode == 39) {
        barPosX += barMove;
        paddle.left = barPosX;
        paddle.right = barPosX + barWidth;
        paddle.top = barPosY;
        paddle.bottom = barPosY + barHeight;
    }

}
 // * 데이터가 바뀌는 내용을 프레임마다 처리해주는 함수

function update() {
// * arcPosx는 원의 중심이다.
    if(keyDownEventHandler)
    {   
        //* 벽에 부딪혔을때 방향전환
        if(arcPosX - arcRadius < 0) {
            arcMoveDirX *= -1;

        } else if(arcPosX + arcRadius > canvas.width) {
            arcMoveDirX *= -1;
        }
    
        if(arcPosY - arcRadius < 0) {
            arcMoveDirY *= -1;
        } else if(arcPosY + arcRadius > canvas.height) {
            arcMoveDirY *= -1;
        }
    
        arcPosX += arcMoveDirX * arcMoveSpd;
        arcPosY += arcMoveDirY * arcMoveSpd;
    
        ball.left = arcPosX -arcRadius;
        ball.right = arcPosX +arcRadius;
        ball.top = arcPosY - arcRadius;
        ball.bottom = arcPosY +arcRadius;

        if(wall.left + brickWidth > canvas.width) {
            wallMoveDir = -1
        }else if(wall.left < 0) {
            wallMoveDir = 1
        }
        wall.left += wallSpd * wallMoveDir;
        wall.right += wallSpd * wallMoveDir;

    
        // * 충돌확인
        if(isCollisionRectToRect(ball, paddle)) {
            arcMoveDirY *= -1;
            arcPosY = paddle.top - arcRadius;
        }
        if(isCollisionRectToRect(ball, wall)) {
            // || arcPosX < wall.left) {
            if (arcPosX > wall.right ) {
                arcMoveDirX *= -1 ; 
                arcPosX = wall.right + arcRadius;
            }
            else if (arcPosX < wall.left) {
                arcMoveDirX *= -1 ; 
                arcPosX = wall.left - arcRadius;
            }
            else if (arcPosY < wall.top) {
                arcMoveDirY *= -1 ; 
                arcPosY = wall.top - arcRadius;
            }
            else if (arcPosY > wall.bottom) {
                arcMoveDirY *= -1 ; 
                arcPosY = wall.bottom + arcRadius;
            }
            // else arcMoveDirY *= - 1;

        }
        // * 벽돌과 공 충돌확인
    

        for(let i = 0; i < brickRow; i++){
            for(let j = 0; j < brickColumn; j++) {
                if(bricks[i][j].isAlive && isCollisionRectToRect(ball, bricks[i][j])) {
                    //벽돌 안보이게, 위치를 바뀌던지 볼 방향변경
                    // arcMoveDirY = -1 * arcMoveDirY;
                    console.log("i: ", i , "j:", j);            
                    bricks[i][j].isAlive = false;
                    arcMoveDirY =  -arcMoveDirY;
                    bricksCount--;
                }
            }
        }
        gameTime(3000)
        // gameOver()
    }
}

function isCollisionRectToRect(rectA, rectB) {
    //a의 왼쪽과 b의 오른쪽
    //aㅁ의 ㅇ른쪽과 b의 왼쪽
    //a의 아래쪽과 b의 위
    //a의 위와 b의 아래
    if (rectA.left > rectB.right ||
        rectA.right < rectB.left ||
        rectA.top > rectB.bottom ||
        rectA.bottom < rectB.top) {
            return false;
        } //안겹친다

    return true; // 겹친다
}

//* 화면 갱신
function draw() {
    // *화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height) //사각형 지우기

    drawRect();
    drawArc();
    drawBricks();
    drawBlack();
}

//* bar 부분
function drawRect() {
    context.beginPath();
    context.rect(barPosX, barPosY, barWidth, barHeight);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

//* ball 부분

function drawArc() {

    context.beginPath();
    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}

setBricks();
// * 자바스크립트 내부에 있는 내장함수 매개변수를 뒤에 시간마다 반복 호출
setInterval(draw, 1)


