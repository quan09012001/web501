/* Biểu thức trong chuỗi template string */
// Template string cho phép sử dụng biểu thức trong chuỗi, thông qua cú pháp ${...}
// Ví dụ:
var name = "Max";
console.log(`Hello, ${name}!`); // output: Hello, Max!

var a = 10;
var b = 10;
console.log(`The number of JS MVC frameworks is ${2 * (a + b)} and not ${10 * (a + b)}.`); // output: The number of JS MVC frameworks is 40 and not 200.

// ${...} có thể làm việc tốt với bất kì biểu thức nào bao gồm: hàm, phương thức
// Ví dụ:
function fn() {
    return "FPT Polytechnic.";
}
console.log(`Chào mừng bạn đến ${fn()}`); // output: Chào mừng bạn đến FPT Polytechnic.
var user = {
    name: 'Max'
};
console.log(`Chúc mừng sinh nhật, ${user.name.toUpperCase()}.`); // output: Chúc mừng sinh nhật, MAX.; toUpperCase(): chuyển đổi một chuỗi thành in hoa
