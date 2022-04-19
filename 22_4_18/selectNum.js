// 이시은
// const selectNum = prompt("숫자를 입력하세요");

// let randomNum = Math.random() * 7 + 3; //3.0 ~ 10.0 사이의 랜덤한 값(난수)
// randomNum = Math.floor(randomNum);

// if (selectNum == randomNum) {
//   alert("정답");
// } else {
//   alert("오답");
// }

// 교수님
let inputNum = prompt("숫자를 입력하세요");

let correctNum = Math.floor((Math.random() * 10)) % 8 + 3;    //3 + 0 ~ 3 + 7
if(inputNum == correctNum){
    alert("정답!!")
}else{
    alert("오답!")
}