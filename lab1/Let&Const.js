// Sử dụng var
console.log('Sử dụng var:');
function foo(count) {
    var i; // hoisting
    for (i = 0; i < count; i++) {
        console.log(i);
    }
}
foo(5); // In ra: 0 1 2 3 4


// Sử dụng let
console.log('Sử dụng let:');
function foo(count) {
    for (let y = 0; y < count; y++) {
        console.log(y);
    }
}
foo(5); // In ra: 0 1 2 3 4

// Const: Hằng số
const a = `a không thể gán 1 giá trị khác
ví dụ: gán a = 'admin'; // báo lỗi`;
console.log(a);
