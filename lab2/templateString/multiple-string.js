/* Multiple string */
// Trong ES5, khi sử dụng dấu ngoặc kép hoặc dấu nháy đơn, các chuỗi phải được chứa hoàn toàn trên một dòng.
// Cách giải quyết cho thiếu sót này là sử dụng join và \n

var message1_ES5 = [
    "Multiline ",
    "string"
].join("\n");
console.log(message1_ES5);

let message2_ES5 = "Multiline \n" + "string";
console.log(message2_ES5);

// Trong ES6, các ký tự mẫu làm cho các chuỗi nhiều dòng trở nên dễ dàng vì không có cú pháp đặc biệt. Chỉ cần bao gồm xuống dòng nơi bạn muốn.
let message1_ES6 = `Multiline
string`;
console.log(message1_ES6); // output: Multiline
                           // output: string

// Tất cả các khoảng trắng bên trong dấu `` đều là được chấp nhận của chuỗi, vì vậy cần lưu ý khi canh lề.
let message2_ES6 = `Mutiline
                    string`; // output: Multiline
                             // output:                     string
console.log(message2_ES6);