
const selectNum = prompt("숫자를 입력하세요", );

let randomNum = Math.random() * 7 + 3;    //3.0 ~ 10.0 사이의 랜덤한 값(난수)
randomNum = Math.floor(randomNum); 

if(selectNum == randomNum) {
     console.log("정답")
}else {
    console.log("오답")
}