var arr =[1,2,3,4,5,6,7];


const sum = (array) => {
    let s = array.reduce((acc, curr) => acc + curr, 0)
    return s;
};

const result = sum(arr);

console.log ("Tổng là " + result);