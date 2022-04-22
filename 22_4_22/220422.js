/*
*비동기 처리
    Promise



    동기 처리
*/


//* 동기

// function testFunc1(){
//     console.log('testFunc1()');

//     let startTime = new Date().getTime();
//     while(new Date().getTime() - startTime < 3000);

//     testFunc2();
// }                                                                                                              
// function testFunc2() {
//     console.log('testFunc2()')
// }
// testFunc1();

/* 
* 비동기
    new Promise 호출과 동시에 비동기 처리 시작
    async await
*/

//async await

async function asyncTimeoutCheckAdult(age, timeout) {
    if (age >= 20) {
        setTimeout(() => {
            console.log(`asyncTimeoutCheckAult()`)
            return age;
        }, timeout);
    }
    else throw new Error(age);
    // else throw new Error(age);
    // else if(age < 20) return age;
    // else throw new Error(age); 
}

async function asyncCheckAdult(age) {
    if (age >= 20) {
        return age;
    }
    else throw new Error(age);
    
}

async function asyncCheckAdulet() {
    await asyncTimeoutCheckAdult(100, 3000);
    const promiseCheckAdult = asyncCheckAdult(10);
    promiseCheckAdult.then((age) => {
        console.log(`${age} is adult!!`);
    }).catch((age) => {
        console.log(`${age} is adult!!`);
    });
    
    const promiseCheckAdult1 = asyncCheckAdult(21);
    promiseCheckAdult1.then((age) => {
        console.log(`${age} is adult!!`);
    }).catch((age) => {
        console.log(`${age} is not adult!!`);
    });
}

asyncCheckAdulet();
// await : async 함수가 종료될 때까지 기다린다.

 

  




// function asyncCheckAdult(age) {
//     return new Promise((resolve, reject) => {
//         if (age >= 20) resolve(age);
//         else reject(age);
//     })
// }
// function test()
// {
//     const promiseCheckAdult = asyncCheckAdult(10);
//     promiseCheckAdult.then((age) => {
//         console.log(`${age} is adult!!`);
//     }).catch((age) => {
//         console.log(`${age} is adult!!`);
//     });
    
//     const promiseCheckAdult1 = asyncCheckAdult(21);
//     promiseCheckAdult1.then((age) => {
//         console.log(`${age} is adult!!`);
//     }).catch((age) => {
//         console.log(`${age} is not adult!!`);
//     });
// }



// const promise = new Promise((resolve, reject) => {          // * 인자이지만 resolve, reject는 함수의 이름
/*
    * 시간이 오래 걸리는 실행문 ... 5초
*/
    // resolve(); // * 성공  둘중 하나만 실행할되는건 규칙 그래서 순서가 중요함
    // reject();   // * 실패
// });
// promise.then(() => {
    // console.log('1. promise()');
// }).catch(() => {
    // console.log('2. promise catch()')
// })

// promise.then().catch();

// function testFunc1(){
//     console.log('testFunc1()');

//     let startTime = new Date().getTime();
//     while(new Date().getTime() - startTime < 3000);

//     testFunc2();
// }
// function testFunc2() {
//     console.log('testFunc2()')
// }
// testFunc1();