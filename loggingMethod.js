const string = 'ass';
const number = 1;
const boolean = true;
const obj = {
    outside : {
        inside : {
            key : 'value',
        }
    }
}

console.time('전체시간');
console.error('에러메세지')
console.dir( obj, {colors : false, depth: 2})
console.dir( obj, {colors : true, depth: 1})

console.time('time check')

for( let i =0 ; i<= 100000; i ++){
    continue;
}

console.timeEnd('time check end');
function b(){
    console.trace('where error occured')
}

function a(){
    b();
}

a();
console.timeEnd('total time')