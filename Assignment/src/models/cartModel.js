import API from "@/api";
import CartEmpty from "@/components/cartEmpty";
import CartItem from "@/components/cartItem";
import { showToast, showModal, getDataByID } from "@/util";
import moment from "moment/moment";
import { loadHeader } from "./baseModel";

// * Xử lý thêm vào giỏ hàng
export const handleAddToCart = async (id) => {
  const userID = localStorage.getItem("userID");
  const cartQuantityEl = document.querySelector(".header-cart span");

  const res = await fetch(`${API.get("products")}/${id}`);

  const product = await res.json();
  product.quantity = 1;

  let cart = localStorage.getItem(`cart_${userID}`)
    ? JSON.parse(localStorage.getItem(`cart_${userID}`))
    : [];

  let exists = false;
  let countQuantity = 1;

  for (const item of cart) {
    countQuantity += item.quantity;
    if (item.id === product.id) {
      item.quantity += 1;
      exists = true;
      break;
    }
  }

  if (!exists) {
    cart.push(product);
  }

  localStorage.setItem(`cart_${userID}`, JSON.stringify(cart));
  cartQuantityEl.innerText = countQuantity;
  showToast("success", "Sản phẩm đã được thêm vào giỏ hàng.");
};

// * Load giỏ hàng
export const renderCart = () => {
  const userID = localStorage.getItem("userID");
  const cartEl = document.querySelector(".cart-list");
  if (!cartEl) return;
  const cart = localStorage.getItem(`cart_${userID}`)
    ? JSON.parse(localStorage.getItem(`cart_${userID}`))
    : [];

  cartEl.innerHTML = "";
  if (cart.length !== 0) {
    cart.forEach((product) => {
      cartEl.insertAdjacentHTML("beforeend", CartItem(product));
    });
  } else {
    cartEl.insertAdjacentHTML("beforeend", CartEmpty());
  }
};

// * Cập nhật số lượng
const updateQuantity = (cart) => {
  let countQuantity = 0;

  for (const product of cart) {
    const { quantity } = product;
    countQuantity += quantity;
  }

  const cartQuantityEl = document.querySelector(".header-cart span");
  cartQuantityEl.innerText = countQuantity;
};

// * Cập nhật đơn giá
const updateMoney = (cart) => {
  const totalAmountEl = document.querySelectorAll(".totalAmount");
  const title = document.querySelector(".cart-title");
  const btns = document.querySelector(".cart-group-btn");

  let totalAmount = 0;
  let countQuantity = 0;

  if (cart.length === 0) {
    if (!btns) return;
    btns.style.display = "none";
    title.style.display = "none";
    document.querySelector(".cart-right .ul").style.display = "none";
  } else {
    if (!btns) return;
    btns.style.display = "block";
    title.style.display = "flex";
    document.querySelector(".cart-right .ul").style.display = "block";
  }

  for (const product of cart) {
    const { price, quantity, discount } = product;
    countQuantity += quantity;
    totalAmount += (price - (price * discount) / 100) * quantity;
  }

  totalAmountEl.forEach((item) => {
    item.innerText = totalAmount.toLocaleString("vi-VN") + "đ";
  });

  if (!title) return;
  title.querySelector("span").innerText = `(${countQuantity} sản phẩm)`;
};

const checkCartGuest = async (userID) => {
  const cartPayMoney = document.querySelector(".cart-pay-money");
  const cartBuyMoney = document.querySelector(".cart-pay-buymoney");
  const cartPayLogin = document.querySelector(".cart-pay-login");

  if (userID == 999) {
    if (!cartPayMoney) return;
    cartPayLogin.style.display = "flex";
    cartPayMoney.style.display = "none";
    cartBuyMoney.style.display = "none";
  } else {
    if (!cartPayLogin) return;
    cartPayLogin.style.display = "none";
    cartPayMoney.style.display = "flex";

    let userID = localStorage.getItem("userID");
    let totalAmount = 0;
    const user = await getDataByID(userID, "account");
    const carts = localStorage.getItem(`cart_${userID}`)
      ? JSON.parse(localStorage.getItem(`cart_${userID}`))
      : [];

    for (const item of carts) {
      const { price, discount, quantity } = item;
      totalAmount += (price - (price * discount) / 100) * quantity;
    }

    if (user.money >= totalAmount) {
      cartBuyMoney.style.display = "none";
    } else {
      cartPayMoney.style.display = "none";
      cartBuyMoney.style.display = "flex";
    }
  }
};

// * Cập nhật giỏ hàng
export const updateCart = () => {
  let userID = localStorage.getItem("userID");
  const carts = localStorage.getItem(`cart_${userID}`)
    ? JSON.parse(localStorage.getItem(`cart_${userID}`))
    : [];
  updateQuantity(carts);
  updateMoney(carts);
  checkCartGuest(userID);
};

// * Xóa sản phẩm khỏi giỏ hàng
export const handleDeleteCart = (e) => {
  const cartEl = document.querySelector(".cart-list");
  const userID = localStorage.getItem("userID");
  const cartKey = `cart_${userID}`;
  const idToRemove = e.target.dataset.id;

  showModal("Bạn có chắc chắn xóa sản phẩm này khỏi giỏ hàng!", () => {
    let cart = JSON.parse(localStorage.getItem(cartKey));
    cart = cart.filter((product) => product.id !== +idToRemove);

    localStorage.setItem(cartKey, JSON.stringify(cart));
    e.target.closest(".cart-item").remove();

    showToast("success", "Sản phẩm đã được xóa khỏi giỏ hàng.");

    if (cart.length === 0) {
      cartEl.insertAdjacentHTML("beforeend", CartEmpty());
    }

    updateCart();
  });
};

// * Cập nhật số lượng
export const handleChangeQuantity = (id, dir, node) => {
  let userID = localStorage.getItem("userID");
  const carts = localStorage.getItem(`cart_${userID}`)
    ? JSON.parse(localStorage.getItem(`cart_${userID}`))
    : [];

  for (const product of carts) {
    if (product.id == id) {
      if (dir === "plus") {
        product.quantity += 1;
        node.innerText = product.quantity;
        showToast("success", "Cập nhật số lượng thành công.");
      } else if (dir === "minus") {
        if (product.quantity > 1) {
          product.quantity -= 1;
          node.innerText = product.quantity;
          showToast("success", "Cập nhật số lượng thành công.");
        } else {
          showToast("error", "Số lượng tối thiểu là 1 sản phẩm");
        }
      }
    }
  }

  localStorage.setItem(`cart_${userID}`, JSON.stringify(carts));
  updateCart();
};

// * Chi tiết đơn hàng
const addOrderDetail = (cart, OTP) => {
  for (const product of cart) {
    const { price, quantity, discount } = product;

    const priceNew = price - (price * discount) / 100;
    const subtotal = priceNew * quantity;

    const data = {
      id: 0,
      orderID: OTP,
      productID: product.id,
      price: priceNew,
      quantity,
      subtotal,
    };

    API.post(API.get("orderDetail"), data);
  }
};

// * Bill
const billOrder = async (OTP) => {
  const urlOrder = `${API.get("order")}/${OTP}`;
  const resOrder = await fetch(urlOrder);

  const order = await resOrder.json();

  const { id, anmount, transactionfree, method, date, time, email, status } =
    order;

  const urlOrderDetail = `${API.get("orderDetail")}?orderID=${id}`;
  const resOrderDetai = await fetch(urlOrderDetail);
  const orderDetail = await resOrderDetai.json();

  let statusOrder = "";
  let methodOrder = "";

  status === 0
    ? (statusOrder = '<span style="color: #29b474;">Đã xử lý</span>')
    : (statusOrder = '<span style="color: #f0942f;">Đang chờ xác nhận</span>');
  method === 0
    ? (methodOrder = "Thanh toán bằng số dư")
    : (methodOrder = "Chuyển khoản ngân hàng");

  const renderProductOrderDetail = async (orderDetail) => {
    let html = "";
    for (const item of orderDetail) {
      const { productID, price, quantity } = item;

      // Sản phẩm theo ID
      const urlProduct = `${API.get("products")}/${productID}`;
      const res = await fetch(urlProduct);
      const product = await res.json();

      const { id, productName, image } = product;

      html += `
      <div>
        <div style="display: flex; flex-direction: column; gap: 10px 0">
        <div class="detail1-product" style="margin-top: 15px;">
        <div class="detail1-image">
          <img src="${image}" alt="">
        </div>
        <div class="detail1-sp">
          <a href="product/${id}" class="name underline">${productName}</a>
          <div class="quantity">Số lượng: <span>${quantity}</span></div>
          <span>${price.toLocaleString("vi-VN")}đ</span>
        </div>
      </div>
      `;
    }

    return html;
  };

  return `
  <div class="account-title">Chi tiết đơn hàng <span>#${id}</span></div>
      <a class="btn-order order-reset" style="color: #2579f2;">
      <div>
        <svg style="height: 17.5px; fill: #2579f2;" class="od Cb Da" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64s64-28.654 64-64c0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM464 424c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm-256 0c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm279.438-152H184.98l-31.31-160h368.548l-34.78 160zM272 200v-16c0-6.627 5.373-12 12-12h32v-32c0-6.627 5.373-12 12-12h16c6.627 0 12 5.373 12 12v32h32c6.627 0 12 5.373 12 12v16c0 6.627-5.373 12-12 12h-32v32c0 6.627-5.373 12-12 12h-16c-6.627 0-12-5.373-12-12v-32h-32c-6.627 0-12-5.373-12-12z"></path>
        </svg> Mua lại đơn hàng
          </div>
          </a>
      </div>
      <div class="account-describe">Hiển thị thông tin các sản phẩm bạn đã mua tại Account Shop</div>
      <div class="account-hr"></div>
      <div class="order-detail" style="margin-top: 20px">
        <div class="order-info">
          <div>
            <div class="order-title">Thông tin đơn hàng</div>
            <ul>
              <li>Mã đơn hàng: <span>#${id}</span></li>
              <li>Ngày tạo: <span>${date}</span></li>
              <li>Thời gian: <span>${time}</span></li>
              <li>Trạng thái đơn hàng: ${statusOrder}</li>
              <li>Người nhận: <span>${email}</span></li>
              <li>Hình thức thanh toán: <span>${methodOrder}</span></li>
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
              )}đ</span></li>
              <li>Tổng thành tiền: <span>${anmount.toLocaleString(
                "vi-VN"
              )}đ</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="account-hr"></div>
      ${await renderProductOrderDetail(orderDetail)}
    </div>
  `;
};

const billOrderPay = async (OTP) => {
  const urlOrder = `${API.get("order")}/${OTP}`;
  const resOrder = await fetch(urlOrder);
  const order = await resOrder.json();

  let subtotal = 0;

  const { anmount, transactionfree } = order;
  subtotal = anmount + transactionfree;

  return `
  <div class="pays">
    <div class="pays-head">
      <div class="img">
        <img src="https://cdn.divineshop.vn/image/catalog/Logo-bank/Momo.png?hash=1604888771" alt="">
      </div>
      <div class="b1">
        <h3>Nạp số dư trực tiếp bằng Momo Payment</h3>
        <p>Nạp Dcoin tự động liên kết với Momo, hoàn thành tức thì. Phí 5%</p>
      </div>
    </div>
    <div class="pays-info">
      <span>Số tiền: ${anmount.toLocaleString("vi-VN")}đ</span>
      <span>Phí giao dịch: ${transactionfree.toLocaleString(
        "vi-VN"
      )}đ (5%)</span>
      <span>Tổng tiền: ${subtotal.toLocaleString("vi-VN")}đ</span>
    </div>
    <div class="pays-instruct">
      <div class="pays-qr">
        <img src="https://chart.googleapis.com/chart?cht=qr&amp;chld=L|1&amp;choe=UTF-8&amp;chs=250x250&amp;chl=momo%3A%2F%2Fapp%3Faction%3DpayWithApp%26isScanQR%3Dtrue%26serviceType%3Dqr%26sid%3DTU9NT1hGUE4yMDE5MDUzMHxNTTExNDI0NDk%26v%3D3.0" alt="">
      </div>
      <div class="pays-content">
        <h3>Thực hiện theo hướng dẫn sau để thanh toán:</h3>
        <ul>
          <li><span>Bước 1</span>: Mở ứng dụng <span>MoMo</span> để thanh toán</li>
          <li><span>Bước 2</span>: Chọn <span>"Thanh toán"</span> và quét mã QR hướng dẫn này</li>
          <li><span>Bước 3</span>: Hoàn tất các bước thanh toán theo hướng dẫn và đợi Account Shop xử lý trong giây lát</li>
        </ul>
      </div>
    </div>
  </div>
  `;
};

// * Thêm vào đơn hàng
export const addOrder = (userID, cart, OTP, email, method) => {
  let anmount = 0;
  let transactionfree = 0;
  let date = moment().format("YYYY-MM-DD");
  let time = moment().format("HH:mm:ss");
  let status = 0;

  for (const product of cart) {
    const { price, discount, quantity } = product;
    anmount += (price - (price * discount) / 100) * quantity;
  }

  method === 0 ? (status = 0) : (status = 1);
  method === 0 ? (transactionfree = 0) : (transactionfree = anmount * 0.05);

  if (method === 0) {
    (async () => {
      const user = await getDataByID(userID, "account");
      const data = { ...user, money: user.money - anmount };
      API.put(`${API.get("account")}/${userID}`, data, () => {
        loadHeader();
      });
    })();
  }

  const data = {
    id: OTP,
    userID,
    status,
    anmount,
    transactionfree,
    method,
    date,
    time,
    email,
  };

  addOrderDetail(cart, OTP);

  fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      const cartLayout = document.querySelector(".cart-layout");
      if (method === 0) {
        cartLayout.innerHTML = await billOrder(OTP);
      } else {
        cartLayout.innerHTML = await billOrderPay(OTP);
      }
    }
  });
};
