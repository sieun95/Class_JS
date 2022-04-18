alert("start javaScript!!");

// 숫자형
/*
    10진수
    255
    2진수(0b1111 1111), 
    8진수, 
    16진수
*/

// 변수명 이름 규칙
/*
1. 알파벳, _, -, 숫자 (특수문자, 영어 외 언어 X)
 1_1. 숫자가 제일 앞에 올 수 없다.
2. camel 표기법
 let myVeryLongLongName;
3. 대소문자를 구분한다.
*/


console.log(varName); // 호이스팅
var varName = "varName";     
console.log(varName)       //가장 오래된 버전에서 사용하는 변수 타입

if(true)
{
    let letName = "letName"
    console.log(letName);
}

const constName = "constName";      // 값이 수정될 일이 없는 변수
// 게임에서 1스테이지 맴의 크기
// 1스테이지 보스 이름
// document 를 변수로 선언할때
constName = "kjh";
console.log(constName); 