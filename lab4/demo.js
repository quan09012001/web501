// const asyncFunnc = new Promise ((resolve, reject) => {
//     setTimeout (() =>{
//         resolve ("function bất đồng bộ chạy xong");
//     }, 2000);

// });

// asyncFunnc.then(message) => {

// }





// async function asyncFunnc () {
//     let promise = new Promise (())
// }

const KEY = 'white_rabbit';
if (true) {
const KEY = 'ginger_rabbit';
}
console.log(KEY);


var x = `foo ${y}`,
y = `bar ${x}`;

console.log(x);


var arr = ["Joe", 23, "Male"];
var newArr = [];
newArr[0] = arr[0];
newArr[1] = arr[1];
console.log(newArr);


var arr = ["B", "a"];
var [
first,
second,
...rest
] = arr;

console.log(rest);



var arr = ["B", "a", "c", "k"];

var first, second, third;
[
first,
second,
third
] = arr;

const func1 = (x, y)
=> {
return x + y;
};


(function() {
    return [
    (() => this.x).bind({ x: 'inner' })(),
    (() => this.x)()
    ]
    }).call({ x: 'outer' });


    function* pseudoRandom(seed) {
        let value = seed;
        
        while(true) {
        value = value * 16807 % 2147483647
        yield value;
        }
        
        };
        
        let generator = pseudoRandom(1);
        alert(generator.next().value); // 16807
        alert(generator.next().value); // 282475249
        alert(generator.next().value); // 1622650073