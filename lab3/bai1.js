 const munltiply = (num1, num2) => num1 * num2;
 console.log (munltiply(4,8));

 const toCelsius = (fahrenheit) => (5/9) * (fahrenheit - 23);
 console.log (toCelsius(4));

//  function padZeros (num, totalLen){
//     var numStr = num.toString();
//     var numZeros = totalLen - numStr.length;
//     for (var i =1; i<= numZeros; i++){
//         numStr= "0" + numStr;
//     }
//     return numStr;
//  }


 const padZeros = (num, totalLen) => {
    let numStr = num.toString();
    let numZeros = totalLen - numStr.length;
    for (let i =1; i<= numZeros; i++){
        numStr = "0" +numStr;
    }
    return numStr;
 }
 console.log (padZeros(1,2));



//  function power (base, exponent) {
//     var result = 1;
//     for (var i = 0; i < exponent; i++){
//         result *= base;
//     }
//     return result;

//  }

const power =(base, exponent) => {
    let result = 1;
    for ( let i = 0; i < exponent; i++){
        result *= base;
    }
    return result;
}
console.log (power(1,4));


// function greet (who) {
//     console.log ("Hello" + who);
// }

const greet = (who) => {
    console.log ("Hello" + who);
}
console.log(greet("Hân"));