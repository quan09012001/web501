// your_module.js

// Hàm chuyển chuỗi thành chữ in hoa
const uppercaseString = (string) => {
    return string.toUpperCase();
  };
  
  // Hàm chuyển chuỗi thành chữ thường
  const lowercaseString = (string) => {
    return string.toLowerCase();
  };
  
  // Xuất (export) hai hàm để có thể sử dụng ở nơi khác
  export { uppercaseString, lowercaseString };
  