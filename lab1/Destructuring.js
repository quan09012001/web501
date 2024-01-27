// Đơn giản hoá việc giải nén các giá trị khỏi một mảng

const thang = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'];
let [t1, t2, t3, t4] = thang;
console.log(t1); // output: Tháng 1

// Đơn giản hoá việc giải nén các giá trị khỏi một đối tượng

let {ho} = {ten: 'Quân', ho: 'Nguyễn'};
console.log(ho); // output: Nguyễn
// console.log(ten); // báo lỗi