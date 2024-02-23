export const ProductRow = (product) => {
  const { id, productName, price, discount, inventory } = product;
  let statusHTML = "";
  if (inventory > 0) {
    statusHTML += `<span>Còn hàng</span>`;
  } else {
    statusHTML += `<span style="color: rgb(255, 55, 55)">Hết hàng</span>`;
  }
  return `
  <tr>
    <td>${id}</td>
    <td>${productName}</td>
    <td>${price.toLocaleString("vi-VN")}đ</td>
    <td>${discount}%</td>
    <td>${inventory}</td>
    <td>${statusHTML}</td>
    <td>
      <div>
        <a class="EditProduct" data-id="${id}">Sửa <ion-icon name="create-outline" role="img" class="md hydrated"></ion-icon></a>
        <a class="DeleteProduct" data-id="${id}">Xóa <ion-icon name="close-outline" role="img" class="md hydrated"></ion-icon></a>
      </div>
    </td>
  </tr>
  `;
};
