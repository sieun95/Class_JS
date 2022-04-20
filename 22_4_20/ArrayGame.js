/*
  배열
*/

// let testArray=[1,2,3,4,5];
// let testArray2 = new Array(5);

// testArray[0] = 100;

// for(let i = 0; i < testArray.length; i++){
//     testArray[i];
// }

// testArray.unshift(300);
// testArray.forEach(function(number, index, arr){
//     console.log("4. number:" , number, "index",  index, "arr:", arr);
// })

// testArray.shift();
// testArray.forEach(function(number, index, arr){
//     console.log("5. number:" , number, "index",  index, "arr:", arr);
// })

// let arrayMultiple = testArray.map(x => x * 2); //배열의 요소들을 x에 담아서 하ㅏ하나 다 곱해준다.
// arrayMultiple.forEach(function(number, index, arr){
//     console.log("6. number:" , number, "index",  index, "arr:", arr);
// })

// arrayMultiple.forEach(x => console.log(x));


///↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 배열 공부 pop과 다르게 맨 앞 배열 인덱스에 붙이는 함수이기때문에 메모리가 많이 든다.
const canvas = document.getElementById('myCanvas');

const context = canvas.getContext("2d");


function bricksColumn() {
    let column = document.getElementById('column');
    console.log(column.value)
}

// * ball 위치 스피드

let arcPosX = 200;
let arcPosY = 370;
let arcMoveDirX = -1;
let arcMoveDirY = -1;
let arcMoveSpd = 3;

// * 
let rectPosX = canvas.width / 2 - 50;
let rectPosY = canvas.height - 20;
let rectMoveDirX = 1;


const barWidth = 200;
const barHeight = 20;
const arcRadius = 10;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight;

// * 벽돌관련
const brickWidth = 50; //간격은 10
const brickHeight = 25; // 간격 5
const brickColumn = 2; //열
const brickRow = 2; //행
let bricks = [];
let bricksCount = brickColumn * brickRow


let ball = {
    left:0, right:0, top:0, bottom:0,  
};

let paddle = {
    left:barPosX, right:barPosX + barWidth, top:380, bottom:400,
};

// * 키 함수 추가
document.addEventListener('keydown', keyDownEventHandler);

function setBricks() {

    for(let i = 0; i < brickRow; i++){ //위에서부터 5줄
        bricks[i] = [];
        for(let j = 0; j < brickColumn; j++){  //가로로 4개
            bricks[i][j] = {//todo: right = left+ 50
                left:55 + j * (brickWidth + 10),
                right:55 + j * (brickWidth + 10) + 50,
                top:30 + i * (brickHeight + 5),
                bottom:30 + i * (brickHeight + 5) + 25,
                column:i, row:j, 
                isAlive: true //벽돌 생존 확인
            };
        }
    }
}

function drawBricks()
{
    context.beginPath();
    for(let i = 0; i < brickRow; i++){ //위에서부터 4줄
        for(let j = 0; j < brickColumn; j++){  //가로로 5개
            if(bricks[i][j].isAlive) { //살아있는 것만 그리기
                context.rect(bricks[i][j].left, bricks[i][j].top, brickWidth, brickHeight);
                context.fillStyle='green';
                context.fill();
            }
        }
    }
    context.closePath();
}

function gameWin(){
    if(bricksCount == 0)
    {
        window.location.reload(true)
        alert("win")
    }
}

function gameOver(){
    if(arcPosY > 370) {
        window.location.reload(true)
        alert("over")
    }
}

let setStart = true;

function keyDownEventHandler(e) {
    if(e.key == " " && setStart){
        setInterval(update, 10)
        setStart = false
    }
    if(e.key == 'ArrowRight') { // && 조건문안에 이렇게 줬었는데 그냥 이중 if를 사용하자...
        if(barPosX + 100 < canvas.width) {
            rectMoveDirX = 10;
        } else if (barPosX + 100 >= canvas.width) {
            rectMoveDirX = 0;
        }
    }
    else if(e.key == 'ArrowLeft') {
        if(barPosX> 0){
            rectMoveDirX = -10;
        } else if (barPosX <= 0) { // 여기선 +100을 안해준다. rect의 끝을 생각했을 때
            rectMoveDirX = 0;
        }
    }
    if(e.key == " ") {
        return true
    }

    barPosX += rectMoveDirX;
    paddle.left = barPosX;
    paddle.right = barPosX + barWidth;
    paddle.top = barPosY;
    paddle.bottom = barPosY + barHeight;
}

context.clearRect(0, 0, canvas.width, canvas.height) //화면을 네모난 모양

function update() {
// * arcPosx는 원의 중심이다.
    if(keyDownEventHandler)
    {
        if(arcPosX - arcRadius < 0) {
            arcMoveDirX = 1;
        } else if(arcPosX + arcRadius > canvas.width) {
            arcMoveDirX = -1;
        }
    
        if(arcPosY - arcRadius < 0) {
            arcMoveDirY = 1;
        } else if(arcPosY + arcRadius > canvas.height) {
            arcMoveDirY = -1;
        }
    
        arcPosX += arcMoveDirX * arcMoveSpd;
        arcPosY += arcMoveDirY * arcMoveSpd;
    
        ball.left = arcPosX -arcRadius;
        ball.right = arcPosX +arcRadius;
        ball.top = arcPosY - arcRadius;
        ball.bottom = arcPosY +arcRadius;
    
        // * 충돌확인
        if(isCollisionRectToRect(ball, paddle)) {
            arcMoveDirY = -1;
            arcPosY = paddle.top - arcRadius;
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
        gameWin()
        gameOver()
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

function draw() {
    // *화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height) //사각형 지우기

    drawRect();
    drawArc();
    drawBricks();
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
setInterval(draw, 10)
