function testFunc1(){
    console.log('testFunc1()');

    let startTime = new Date().getTime();
    while(new Date().getTime() - startTime < 3000);
    testFunc2();
}                                                                                                              
function testFunc2() {
    console.log('testFunc2()')
    testFunc3();
}

function testFunc3() {
    console.log('testFunc3()')
}
testFunc1();
