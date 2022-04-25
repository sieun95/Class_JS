// 2개를 담을수 있는 배열을 만들었다.
let classes = new Array(2);

// 각각 방에 5개를 넣을수있는 배열을 다시 넣어준다
// 한 배열당 5개가 들어갈수있는 2개의 배열이 만들어졌다.
classes[0] = new Array(5);
classes[1] = new Array(5);

// [0[0]], [0[1]] ... 이런식이다 느낌은
classes[0][0] = '1'
classes[0][1] = '2'
classes[0][2] = '3'
classes[0][3] = '4'
classes[0][4] = '5'

classes[1][0] = '6'
classes[1][1] = '7'
classes[1][2] = '8'
classes[1][3] = '9'
classes[1][4] = '10'
// 2차원 배열의 접근방법 앞에가 처음 선언해둔 큰방이고 뒤에가 다시 선언해준 배열이다.
console.log("classes[0] : ",classes[0][3], " classes[1] : ",classes[1])