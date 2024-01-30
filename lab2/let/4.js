/* Lưu ý khí sử dụng let */
// Việc truy cập biến khai báo let sớm hơn so với khai báo của nó sẽ gây ra lỗi, trong khai báo với var, thứ tự không quan trọng.

console.log(a); // undefined
console.log(b); // ReferenceError!
var a;
let b;