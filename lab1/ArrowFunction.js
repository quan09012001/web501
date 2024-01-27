// Hàm mũi tên là hàm ẩn danh (expression function) sử dụng "mũi tên" =>

let arr = [1, 7, 5, 6, 2, 4];

//ES5
arr.sort(function sorter(a, b){
    return(a - b);
});
console.log(arr);

//ES6
arr.sort((a,b) => { return a - b });