//B1. Viết hàm sử dụng rest parameter để tính tổng của bất kì dãy nào
//B2. Khai báo 1 mảng số bất kỳ, sd rest parameter
//a. Tìm só nhỏ nhất trong mảng
//b. Tìm só lớn nhất trong mảng

//Bài 1
function tinhTong(...numbers){
    return numbers.reduce((total, num) => total + num, 0);
};

console.log(tinhTong(2, 3, 6, 9, 8));