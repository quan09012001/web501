// Tham số mặc định: cung cấp giá trị mặc định cho một tham số nếu nó không được chỉ định

let tinhTien = 0;
function tang(soLuong = 1) {
    return tinhTien += soLuong;
}
console.log(tang()) ; // output: 1
console.log(tang(2)); // output: 3
console.log(tang()) ; // output: 4