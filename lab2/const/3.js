/* Lưu ý khi sử dụng const */
// Hằng số không phải bất biến trong mọi trường hợp. Nếu giá trị phức tạp, chẳng hạn như một đối tượng hoặc mảng, giá trị vẫn có thể được thay đổi. Ví dụ:
const a = [1,2,3];
a.push(4);
console.log(a); // output: [ 1, 2, 3, 4 ]
a = 42; // SyntaxError