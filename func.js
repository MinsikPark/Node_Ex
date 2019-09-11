const {odd, even} =  require('./var');

function checkOddOrEven( num){
    if( num%2){
        return odd;
    } else {
        return even;
    }
}

console.log(checkOddOrEven(1))
console.log(checkOddOrEven(2))