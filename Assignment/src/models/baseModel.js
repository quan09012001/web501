import { updateCart } from "./cartModel";
import { renderCart } from "./cartModel";
import { getDataByID } from "@/util";

// * Lấy ID người dùng
const loadUser = () => {
  let userID = localStorage.getItem("userID");

  if (userID === null || userID === undefined) {
    userID = 999;
    localStorage.setItem("userID", userID);
  }
};

const checkLogin = async () => {
  let userID = localStorage.getItem("userID");
  let accountAction = document.querySelector(".account-action");

  if (parseInt(userID) !== 999) {
    accountAction.classList.add("isUser");
    accountAction.classList.remove("isGuest");

    const user = await getDataByID(userID, "account");
    const { fullname, avatar, position, money } = user;

    const accountName = document.querySelector(".account-name");
    const accoutAvatar = document.querySelector(".account-avatar img");
    const accountMoney = document.querySelector(".account-money span");

    accountName.innerText = fullname;
    accoutAvatar.src = avatar;
    accountMoney.innerHTML = `${money.toLocaleString("vi-VN")}đ`;

    if (position == 1) {
      const submenu = document.querySelector(".submenu");
      if (document.querySelector(".qt")) return;
      const li = `<li><a href="/admin" class="qt" style="color: #4a6cf7">Quản trị viên</a></li>`;
      submenu.insertAdjacentHTML("beforeend", li);
    } else {
      const qt = document.querySelector(".qt");
      if (!qt) return;
      qt.remove();
    }
  } else {
    accountAction.classList.add("isGuest");
    accountAction.classList.remove("isUser");
  }
};

const loadDetail = () => {
  const commentBtn = document.querySelector(".comment-btn");
  if (!commentBtn) return;

  const button = commentBtn.querySelector("button");
  const userID = JSON.parse(localStorage.getItem("userID"));

  if (userID !== 999) {
    button.id = "comment-send";
    button.querySelector("a").innerText = "Gửi bình luận";
  } else {
    button.id = "comment-login";
    button.querySelector("a").innerText = "Đăng nhập để bình luận";
  }
};

export const loadHeader = () => {
  checkLogin();
  updateCart();
  renderCart();
  loadDetail();
};

export const loadBase = () => {
  loadUser();
};
