import Layout from "../layout";
import { getData, getDataByID, useEffect } from "@/util";
import API from "@/api";

const Order_List = () => {
  return Layout(OrderList);
};

function OrderList() {
  useEffect(() => {
    const renderOrder = async () => {
      const rdOrder = document.querySelector(".rd-order");
      const listOrder = await getData("order");

      let stt = 1;

      for (const order of listOrder) {
        let statusHTML = "";
        const {
          id,
          status,
          anmount,
          transactionfree,
          method,
          date,
          time,
          userID,
        } = order;

        if (status !== 1) {
          statusHTML = `              
          <div class="input-status" style="color: #29b474">
            Đã thanh toán
          </div>`;
        } else {
          statusHTML = `              
          <div class="input-status" style="color: rgb(255, 95, 32)">
            Đang chờ xác nhận
          </div>`;
        }
        const user = await getDataByID(userID, "account");

        rdOrder.innerHTML += `
        <tr>
          <td>${stt++}</td>
          <td>${user.fullname}</td>
          <td>#${id}</td>
          <td>${(anmount + transactionfree).toLocaleString("vi-VN")}đ</td>
          <td>${
            method === 0 ? "Số dư tài khoản" : "Chuyển khoản ngân hàng"
          }</td>
          <td>
            <div class="dropdown pointer-events">
                ${statusHTML}
            </div>
          </td>
          <td>${date}</td>
          <td>
            <div>
              <a href="/admin/orderDetail/${id}"
                class="OrderDetail"
                style="color: rgb(99, 55, 255)"
                >Chi tiết
                <ion-icon
                  name="alert-outline"
                  role="img"
                  class="md hydrated"
                ></ion-icon
              ></a>
            </div>
          </td>
        </tr>
        `;
      }
    };

    renderOrder();
  });

  return `
  <div class="order">
    <div class="titlebar">Admin / Đơn hàng / Danh sách đơn hàng</div>
    <div class="search">
      <input type="text" placeholder="Tìm kiếm..." />
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên người dùng</th>
          <th>Mã đơn hàng</th>
          <th>Tổng đơn hàng</th>
          <th>Hình thức thanh toán</th>
          <th>Trạng thái đơn hàng</th>
          <th>Ngày</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody class="rd-order">
      </tbody>
    </table>
  </div>
  `;
}

export default Order_List;
