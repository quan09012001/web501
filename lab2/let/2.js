/* Khai báo let trong vòng lặp */
// Với var: Khi hết vòng lặp giá trị của i sẽ bằng 5. Trong phần thân hàm, các giá trị được gọi sẽ lấy giá trị sau cùng của i nên i = 5 trong các trường hợp.
var funcs = [];
for (var i = 0; i < 5; i++) {
    funcs.push(function () {
        console.log(i);
    });
}
funcs[3](); // sử dụng var sẽ có kết quả 5

// Với let: Với let trên mỗi lần lặp, vòng lặp tạo ra một biến mới i, điều này là nhờ phạm vi của let có hiệu lực trong khối {}
var funcs = [];
for (let i = 0; i < 5; i++) {
    funcs.push(function () {
        console.log(i);
    });
}
funcs[3](); // sử dụng let sẽ có kết quả 3
