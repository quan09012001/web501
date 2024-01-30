/* Khai báo biến với let */

// let: là từ khoá định nghĩa 1 biến có phạm vi truy cập trong một block - khối code
// cú pháp khai báo let cũng giống như cú pháp var, nhưng phạm vi của let chỉ trong dấu 1 cặp dấu {} bao quanh nó.
// ví dụ:

let a = 1;
if (a === 1) {
    let b = 2;
}
for (let c = 0; c < 3; c++) {
    let d = 4;
}
console.log(a); // Output: 1
console.log(b); // Output: ReferenceError: b is not definel
console.log(c); // Output: ReferenceError: c is not definel 
console.log(d); // Output: ReferenceError: d is not definel 
