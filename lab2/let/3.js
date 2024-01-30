/* Khai báo let trong vòng lặp */

// ví dụ với vòng lặp for...in

var funcs = [],
    object = { a: true, b: true, c: true };
for (let key in object) {
    funcs.push(function () {
        console.log(`${key} : ${object[key]}`);
    });
}
funcs.forEach(function (func) {
    func(); // output: a : true ; output: b : true ; output: c : true
});
// Mỗi lần chạy vòng lặp, biến key sẽ được khởi tạo mới do đó mỗi hàm sẽ có giá trị của biến key riêng. Kết quả là mỗi hàm xuất ra một giá trị khác nhau.
// Nếu sử dụng var để khai báo cho key, tất cả các hàm sẽ hiển thị ra c.