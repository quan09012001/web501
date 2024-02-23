import Header from "@/components/header";
import layout from "./layout";
import Footer from "@/components/footer";
import API from "@/api";
import { showImageEmpty, useEffect } from "@/util";

const order = () => {
  return `
    ${Header()}
    ${layout(Order)}
    ${Footer()}
  `;
};

function Order() {
  useEffect(() => {
    const renderOrders = async () => {
      const userID = JSON.parse(localStorage.getItem("userID"));
      const url = `${API.get("order")}?userID=${userID}`;
      const res = await fetch(url);
      const orders = await res.json();

      const trOrder = (order) => {
        const { id, anmount, status, date, time, method, transactionfree } =
          order;
        return `
        <tr>
          <td>${date} ${time}</td>
          <td>#${id}</td>
          <td class="flex">${
            method === 0 ? "Số dư tài khoản" : "Chuyển khoản ngân hàng"
          }</td>
          <td>${(anmount + transactionfree).toLocaleString("vi-VN")}đ</td>
          ${
            status === 0
              ? '<td style="color: #29b474">Đã xử lý</td>'
              : '<td style="color: rgb(255, 95, 32)">Đang xử lý</td>'
          }
          <td class="underline orderdetail" style="cursor: pointer; color: #2579f2">
            <a href="/order/${id}">Chi tiết</a>
          </td>
        </tr>
        `;
      };

      const rdOrder = document.getElementById("rd-order");
      if (orders.length === 0) {
        const node = document.querySelector(".rd-empty");
        showImageEmpty(node);
      } else {
        rdOrder.innerHTML = "";
        for (const order of orders) {
          if (order.userID === userID) {
            rdOrder.innerHTML += trOrder(order);
          }
        }
      }
    };

    renderOrders();
  });

  return `
  <div class="account-title">Lịch sử đơn hàng</div>
    <div class="account-describe">
      Hiển thị thông tin các sản phẩm bạn đã mua tại Account Shop
    </div>
    <div class="account-hr"></div>
    <div class="rd-empty">
      <div class="account-filter account-filter-5">
        <div>
          <input type="text" placeholder="" />
          <label for="">Mã đơn hàng</label>
        </div>
        <div>
          <input type="text" placeholder="" />
          <label for="">Số tiền từ</label>
        </div>
        <div>
          <input type="text" placeholder="" />
          <label for="">Số tiền đến</label>
        </div>
        <div>
          <input type="date" placeholder="" />
          <label for="">Từ ngày</label>
        </div>
        <div>
          <input type="date" placeholder="" />
          <label for="">Đến ngày</label>
        </div>
      </div>
      <div class="account-table">
        <table>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Mã đơn hàng</th>
              <th>Hình thức thanh toán</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="rd-order"></tbody>
        </table>
      </div>
    </div>
  `;
}

export default order;
