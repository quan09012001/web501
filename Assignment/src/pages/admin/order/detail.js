import Layout from "../layout";
import { getData, getDataByID, useEffect } from "@/util";
import API from "@/api";

const Order_Detail = (data) => {
  return Layout(() => OrderDetail(data));
};

function OrderDetail({ id }) {
  useEffect(() => {
    const renderOrderDetail = async (id) => {
      const rdOrderDetail = document.querySelector(".rd-orderDetail");
      const url = `${API.get("orderDetail")}?orderID=${id}`;
      const res = await fetch(url);
      const orderDetail = await res.json();

      let stt = 1;
      for (const detail of orderDetail) {
        const product = await getDataByID(detail.productID, "products");
        const { productName } = product;
        rdOrderDetail.innerHTML += `
        <tr>
          <td>${stt++}</td>
          <td>
            ${productName}
          </td>
          <td>${detail.price.toLocaleString("vi-VN")}đ</td>
          <td>${detail.quantity}</td>
          <td>${detail.subtotal.toLocaleString("vi-VN")}đ</td>
          <td>
            <div>
              <a>Xóa <ion-icon name="trash-outline" role="img" class="md hydrated"></ion-icon></a>
            </div>
          </td>
        </tr>
        `;
      }
    };

    renderOrderDetail(id);
  });

  return `
  <div class="order-detail">
    <div class="titlebar">Admin / Thanh toán / Chi tiết hóa đơn</div>
    <div class="search">
      <input type="text" placeholder="Tìm kiếm..." />
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Giá tiền</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody class="rd-orderDetail">
        
      </tbody>
    </table>
  </div>
  `;
}

export default Order_Detail;
