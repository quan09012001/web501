/* Khai báo biến với const */

// const: là từ khoá định nghĩa 1 biến sẽ là hằng số. Biến const lưu trữ giá trị không thể thay đổi được trong suốt vòng đời của biến.
// const là một biến chỉ đọc sau khi trị ban đầu của nó được đặt
const a = 2;
console.log(a); // output: 2
a = 3; // Báo lỗi Uncaught TypeError: Assignment to constant variable


// Gía trị của biến được khai báo bằng const không thể thay đổi sau khi đặt. Vì lý do này, mọi biến const phải được khởi tạo và gán giá trị khi khai báo:
const maxItems = 30; // đúng cú pháp
const name; // Báo lỗi SyntaxError: Missing initializer in const declaration