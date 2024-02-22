/* Khai báo const trong vòng lặp */
// Hằng số cũng có thể sử dụng trong vòng lặp

var funcs = [],
    object = { a: true, b: true, c: true };
// không gây ra lỗi
for (const key in object) {
    funcs.push(function () {
        console.log(key);
    });
}
funcs.forEach(function (func) {
    func(); // output: a; output: b; output: c
});


// Lưu ý: giá trị của key không thể thay đổi bên trong vòng lặp