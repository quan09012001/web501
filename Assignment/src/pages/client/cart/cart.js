import {
  renderCart,
  handleDeleteCart,
  handleChangeQuantity,
  updateCart,
  addOrder,
} from "@/models/cartModel";
import { checkEmpty } from "@/util/validator";
import Account from "@/components/account";
import {
  useEffect,
  sendMail,
  getDataByID,
  randomNumber,
  showToast,
} from "@/util";

const Cart = () => {
  useEffect(() => {
    // * Hiển thị dữ liệu giỏ hàng
    renderCart();

    // * Xóa sản phẩm
    const deleteEl = document.querySelectorAll(".cart-delete");
    deleteEl.forEach((item) =>
      item.addEventListener("click", handleDeleteCart)
    );

    // * Tăng giảm số lượng
    const icons = document.querySelectorAll(".changeQuantity");
    icons.forEach((item) =>
      item.addEventListener("click", () => {
        const node = item.parentNode.querySelector(".product-quantity");
        const id = item.dataset.id;
        const dir = item.dataset.dir;
        handleChangeQuantity(id, dir, node);
      })
    );

    // * Variable
    const cartLayout = document.querySelector(".cart-layout");
    const cartPayMoney = document.querySelector(".cart-pay-money");
    const cartPayMomo = document.querySelector(".cart-pay-momo");
    const confirmPay = document.querySelector(".confirm-pay");
    const btns = document.querySelector(".cart-group-btn");
    const cartStatus1 = document.querySelector(".cart-status span + span");
    const cartStatus2 = document.querySelector(
      ".cart-status span + span + span"
    );
    const cartByLogin = document.querySelector(".cart-pay-login");

    // * Thanh toán bằng số dư
    cartPayMoney.addEventListener("click", () => {
      btns.style.display = "none";
      confirmPay.style.display = "block";
      document.querySelector("#confirmPayMoney").style.display = "flex";
      document.querySelector("#confirmPayMomo").style.display = "none";
      cartStatus1.className = "active";
      cartStatus1.previousElementSibling.classList.add("isActiveStatus");
    });

    // * Thanh toán bằng momo
    cartPayMomo.addEventListener("click", () => {
      btns.style.display = "none";
      confirmPay.style.display = "block";
      document.querySelector("#confirmPayMomo").style.display = "flex";
      document.querySelector("#confirmPayMoney").style.display = "none";
      cartStatus1.className = "active";
      cartStatus1.previousElementSibling.classList.add("isActiveStatus");
    });

    // * Thoát xác nhận
    const confirmPayBack = document.querySelector(".confirm-pay p");
    confirmPayBack.addEventListener("click", () => {
      btns.style.display = "block";
      confirmPay.style.display = "none";
      cartStatus1.className = "";
      cartStatus1.previousElementSibling.classList.remove("isActiveStatus");
    });

    // * Xác nhận thanh toán số dư
    const confirmPayMoney = document.querySelector("#confirmPayMoney");
    confirmPayMoney.addEventListener("click", async () => {
      cartStatus2.className = "active";
      cartStatus2.previousElementSibling.classList.add("isActiveStatus");

      cartLayout.innerHTML = formConfirmPay();

      const userID = localStorage.getItem("userID");
      const user = await getDataByID(userID, "account");
      const { id, fullname, email } = user;
      const cart = JSON.parse(localStorage.getItem(`cart_${id}`));
      const OTP = randomNumber();

      sendMail(email, fullname, OTP);

      const btnConfirmOTP = document.getElementById("confirmOTP");

      btnConfirmOTP.addEventListener("click", async () => {
        const valueOTP = document.getElementById("ValueOTP");
        valueOTP.addEventListener("input", () => {
          const errorOTP = document.querySelector(".OTPError");
          errorOTP.innerText = "";
        });
        if (valueOTP.value === "") {
          valueOTP.nextElementSibling.innerText = "Vui lòng nhập trường này!";
        } else {
          if (valueOTP.value == OTP) {
            // * Thêm vào order & orderDetail
            addOrder(id, cart, OTP, email, 0);

            valueOTP.value = "";
            localStorage.setItem(`order_${id}`, JSON.stringify(cart));
            localStorage.setItem(`cart_${id}`, []);
            updateCart();

            showToast("success", "Mua tài khoản thành công.");
          } else {
            valueOTP.nextElementSibling.innerText =
              "Mã xác nhận OTP không chính xác xác";
          }
        }
      });
    });

    // * Xác nhận thanh toán momo
    const cofirmPaymoney = document.querySelector("#confirmPayMomo");
    cofirmPaymoney.addEventListener("click", () => {
      const app = document.getElementById("app");
      const formEmail = document.createElement("div");
      formEmail.className = "form-email";
      formEmail.innerHTML = `
      <div class="form-box">
        <h3>Nhập email mua hàng của bạn</h3>
        <div class="form-gr">
          <div class="form-group">
            <input type="text" class="form-btn" placeholder="" id="email" />
            <label class="form-name">Email hoặc tên đăng nhập</label>
          </div>
          <span class="form-error"></span>
        </div>
        <p>
          <span style="color: #dc3545">Lưu ý:</span> Hãy nhập chính xác địa chỉ
          email của bạn vì email này sẽ được dùng để nhận thông tin đơn hàng khi
          bạn thanh toán thành công.
        </p>
        <div class="email-confirm">
          <button class="emaill-confirm">Xác nhận</button>
          <button class="email-cancel">Hủy</button>
        </div>
      </div>
      `;

      app.insertAdjacentElement("beforeend", formEmail);
      let formEmailEl = document.querySelector(".form-email");
      if (!formEmailEl) return;
      document.addEventListener("click", (e) => {
        if (e.target.matches(".email-cancel")) {
          formEmailEl.remove();
        } else if (e.target.matches(".emaill-confirm")) {
          const emailEl = document.querySelector("#email");

          if (checkEmpty(emailEl)) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (regex.test(emailEl.value)) {
              cartStatus2.className = "active";
              cartStatus2.previousElementSibling.classList.add(
                "isActiveStatus"
              );

              formEmail.remove();

              const userID = JSON.parse(localStorage.getItem("userID"));
              const cart = JSON.parse(localStorage.getItem(`cart_${userID}`));
              const OTP = randomNumber();

              addOrder(userID, cart, OTP, emailEl.value, 1);

              localStorage.setItem(`cart_${userID}`, []);
              updateCart();
            } else {
              emailEl.style.borderColor = "rgba(255, 55, 55, 0.58)";
              emailEl.parentNode.nextElementSibling.innerText = `Email này không hợp lệ !`;
            }
          }
        } else if (e.target.matches(".form-email")) {
          formEmailEl.remove();
        }
      });
    });

    if (cartByLogin) {
      cartByLogin.addEventListener("click", () => {
        const app = document.getElementById("app");
        app.insertAdjacentHTML("beforeend", Account());
      });
    }
  });

  return `
  <div class="cart">
    <div class="container">
      <div class="cart-status">
        <span class="active">Giỏ hàng</span>
        <span>Xác nhận</span>
        <span>Thanh toán</span>
      </div>
      <div class="cart-layout">
        <div class="cart-left">
          <div class="cart-title">
            <h2>Giỏ hàng</h2>
            <span>(2 sản phẩm)</span>
          </div>
          <div class="cart-list"></div>
        </div>
        <div class="cart-right">
          <ul>
            <li>
              <a
                >Bạn có mã giới thiệu
                <div class="svg">
                  <svg
                    class="od b Hb Ba oa fe w21h21"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-metatip="true"
                  >
                    <path
                      d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
            <li>
              <a
                >Bạn có mã ưu đãi
                <div class="svg">
                  <svg
                    class="od b Hb Ba oa fe w21h21"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="M96 224c53 0 96-43 96-96s-43-96-96-96S0 75 0 128s43 96 96 96zm0-144c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm192 208c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm93.9-381.2L57.2 475c-2.3 3.1-5.9 5-9.7 5H12c-9.6 0-15.3-10.7-10-18.7L327.2 37c2.3-3.1 5.9-5 9.7-5H372c9.6 0 15.3 10.8 9.9 18.8z"
                    ></path>
                  </svg></div
              ></a>
            </li>
            <li>
              <a
                >Bạn muốn tặng bạn bè
                <div class="svg">
                  <svg
                    class="od b Hb Ba oa fe w21h21"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M464 144h-26.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H48c-26.5 0-48 21.5-48 48v128c0 8.8 7.2 16 16 16h16v107.4c0 29 23.6 52.6 52.6 52.6h342.8c29 0 52.6-23.6 52.6-52.6V336h16c8.8 0 16-7.2 16-16V192c0-26.5-21.5-48-48-48zM232 448H84.6c-2.5 0-4.6-2-4.6-4.6V336h112v-48H48v-96h184v256zm-78.1-304c-22.1 0-40-17.9-40-40s17.9-40 40-40c22 0 37.5 7.6 84.1 77l2 3h-86.1zm122-3C322.5 71.6 338 64 360 64c22.1 0 40 17.9 40 40s-17.9 40-40 40h-86.1l2-3zM464 288H320v48h112v107.4c0 2.5-2 4.6-4.6 4.6H280V192h184v96z"
                    ></path>
                  </svg></div
              ></a>
            </li>
            <li>
              <a>Thanh toán</a>
            </li>
            <li>
              <a
                >Tổng giá trị thanh toán
                <span style="font-weight: 500" class="totalAmount">596.000đ</span></a
              >
            </li>
          </ul>
          <ul class="ul">
            <li>
              <a>Tổng giá trị phải thanh toán <span class="totalAmount">569.000đ</span></a>
            </li>
            <li>
              <a>Số dư hiện tại <span>0đ</span></a>
            </li>
            <li>
              <a>Số tiền cần nạp thêm <span>0đ</span></a>
            </li>
          </ul>
          <div class="cart-group-btn">
            <div class="cart-btn cart-pay-money" style="--bg: #2579f2">
              <img src="../../../../public/images/iclogo.svg" style="filter: none" alt="" />
              Thanh toán bằng số dư
            </div>
            <div class="cart-btn cart-pay-buymoney" style="--bg: #2579f2">
              <img src="../../../../public/images/logo2.svg" style="filter: none" alt="" />
              Nạp thêm tiền vào tài khoản
            </div>
            <div class="cart-btn cart-pay-login" style="--bg: #2579f2">
              Đăng nhập để thanh toán
            </div>
            <p class="cart-p">Quét mã. Thanh toán. Không cần đăng nhập.</p>
            <div class="cart-btn cart-pay-momo" style="--bg: #ae2070">
              <img src="../../../../public/images/momo.svg" style="filter: none" alt="" />
              Mua siêu tốc với momo
            </div>
          </div>
          <div class="confirm-pay">
            <div id="confirmPayMoney" class="cart-btn" style="--bg: #29b474">
              <img src="../../../../public/images/paycart.svg" alt="" />
              Xác nhận thanh toán
            </div>
            <div id="confirmPayMomo" class="cart-btn" style="--bg: #29b474">
              <img src="../../../../public/images/paycart.svg" alt="" />
              Xác nhận thanh toán
            </div>
            <p><i class="fa-solid fa-chevron-left"></i> Trở về giỏ hàng</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};

function formConfirmPay() {
  return `
  <div style="grid-column: 2 span; padding-bottom: 120px;">
    <h1 style="font-size: 25px;font-weight: 500;text-align: center;margin: 10px 0 15px 0;letter-spacing: .2px;">Nhập mã xác thực</h1>
    <p style="text-align: center;">Vui lòng nhập mã OTP được gửi tới email của bạn</p>
    <div style="display: flex; justify-content: center;">
      <div>
        <input id="ValueOTP" type="text" placeholder="Mã xác thực OTP" style="display: block;margin-top: 15px;border: 1px solid #ddd;padding: 12px;border-radius: 5px;width: 312px;">
        <span class="OTPError" style="display: block; margin: 8px 0 15px 0; color: #dc3545;"></span>
      </div>
    </div>
    <button id="confirmOTP" style="display: block;margin: 0 auto;background: #4a6cf7;color: white;width: 312px;padding: 12px 0;border-radius: 5px;font-weight: 500;">Xác nhận</button>
  </div>
  `;
}

export default Cart;
