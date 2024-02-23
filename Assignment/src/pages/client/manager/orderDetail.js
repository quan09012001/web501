import Header from "@/components/header";
import Footer from "@/components/footer";
import layout from "./layout";
import API from "@/api";
import { updateCart } from "@/models/cartModel";
import { useEffect, getDataByID, router, showToast } from "@/util";

const orderDetail = (data) => {
  return `
    ${Header()}
    ${layout(() => OrderDetail(data))}
    ${Footer()}
  `;
};

function OrderDetail({ id }) {
  useEffect(() => {
    const el = document.getElementById("rd-orderDetail");

    const productRow = (product, orderDetail) => {
      const { id, productName, image } = product;
      const { price, quantity } = orderDetail;
      return `
      <div style="display: flex; flex-direction: column; gap: 10px 0">
        <div class="detail1-product">
          <div class="detail1-image">
            <img
              src="${image}"
              alt=""
            />
          </div>
          <div class="detail1-sp">
            <a href="/product/${id}" class="name underline">
              ${productName}
            </a>
            <div class="quantity">Số lượng: <span>${quantity}</span></div>
            <span>${price.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      </div>
      `;
    };

    const renderOrderDetail = async (id) => {
      const urlOrderDetail = `${API.get("orderDetail")}?orderID=${id}`;
      const resOrderDetail = await fetch(urlOrderDetail);

      const dataOrder = await getDataByID(id, "order");
      const dataOrderDetail = await resOrderDetail.json();

      const { anmount, status, date, time, method, email, transactionfree } =
        dataOrder;

      const template = `
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          grid-column: 2 span;
        "
      >
        <div class="account-title">Chi tiết đơn hàng <span>#${
          dataOrder.id
        }</span></div>
        <a class="btn-order order-reset" id="buyBack" data-orderID="${
          dataOrder.id
        }" style="color: #2579f2;">
        <svg style="height: 17.5px; fill: #2579f2;" class="od Cb Da" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64s64-28.654 64-64c0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM464 424c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm-256 0c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm279.438-152H184.98l-31.31-160h368.548l-34.78 160zM272 200v-16c0-6.627 5.373-12 12-12h32v-32c0-6.627 5.373-12 12-12h16c6.627 0 12 5.373 12 12v32h32c6.627 0 12 5.373 12 12v16c0 6.627-5.373 12-12 12h-32v32c0 6.627-5.373 12-12 12h-16c-6.627 0-12-5.373-12-12v-32h-32c-6.627 0-12-5.373-12-12z"></path>
        </svg> Mua lại đơn hàng</a>
      </div>
      <div class="account-describe">
        Hiển thị thông tin các sản phẩm bạn đã mua tại Account Shop
      </div>
      <div class="account-hr"></div>
      <div class="order-detail">
        <div class="order-info">
          <div>
            <div class="order-title">Thông tin đơn hàng</div>
            <ul>
              <li>Mã đơn hàng: <span>#${dataOrder.id}</span></li>
              <li>Ngày tạo: <span>${date}</span></li>
              <li>Thời gian: <span>${time}</span></li>
              <li>
                Trạng thái đơn hàng:
                ${
                  status === 0
                    ? '<span style="color: #29b474">Đã thanh toán</span>'
                    : '<span style="color: rgb(255, 95, 32)">Đang xử lý</span>'
                }
              </li>
              <li>Người nhận: <span>${email}</span></li>
              <li>Hình thức thanh toán: <span>${
                method === 0 ? "Số dư tài khoản" : "Chuyển khoản ngân hàng"
              }</span></li>
            </ul>
          </div>
          <div>
            <div class="order-title">Giá trị đơn hàng</div>
            <ul>
              <li>Thành tiền: <span>${anmount.toLocaleString(
                "vi-VN"
              )}đ</span></li>
              <li>Phí giao dịch: <span>${transactionfree.toLocaleString(
                "vi-VN"
              )}đ ${method === 1 ? "(5%)" : ""}</span></li>
              <li>Tổng thành tiền: <span>${(
                anmount + transactionfree
              ).toLocaleString("vi-VN")}đ</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="account-hr"></div>
      <div class="rd-productOrderDetail"></div>
      `;

      el.innerHTML = template;

      const rdProductOrderDetail = document.querySelector(
        ".rd-productOrderDetail"
      );

      for (const orderDetail of dataOrderDetail) {
        const product = await getDataByID(orderDetail.productID, "products");
        rdProductOrderDetail.innerHTML += productRow(product, orderDetail);
      }

      // Mua lại
      const buyBack = document.getElementById("buyBack");
      buyBack.addEventListener("click", async () => {
        const userID = JSON.parse(localStorage.getItem("userID"));
        const orderID = buyBack.dataset.orderid;
        const url = `${API.get("orderDetail")}?orderID=${orderID}`;
        const res = await fetch(url);
        const data = await res.json();

        const cartList = [];

        for (const order of data) {
          const productID = order.productID;
          const product = await getDataByID(productID, "products");
          product.quantity = order.quantity;

          cartList.push(product);
        }

        localStorage.setItem(`cart_${userID}`, JSON.stringify(cartList));
        router.navigate("/cart");
        updateCart();
        showToast("success", "Đã thêm tất cả sản phẩm vào giỏ hàng");
      });
    };

    renderOrderDetail(id);
  });

  return `<div id="rd-orderDetail"></div>`;
}

export default orderDetail;
