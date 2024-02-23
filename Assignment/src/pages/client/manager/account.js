import Header from "@/components/header";
import layout from "./layout";
import Footer from "@/components/footer";
import { useEffect, getDataByID } from "@/util";

const account = () => {
  return `
    ${Header()}
    ${layout(Account)}
    ${Footer()}
  `;
};

function Account() {
  useEffect(() => {
    const renderAccount = async () => {
      const rdAccountEl = document.getElementById("rd-account");

      const userID = JSON.parse(localStorage.getItem("userID"));
      const user = await getDataByID(userID, "account");

      const {
        fullname,
        username,
        email,
        phone,
        address,
        avatar,
        position,
        money,
      } = user;

      let template = `
      <div class="account-title" style="margin-bottom: 20px">Tổng quan</div>
        <input type="text" hidden="" id="GetUserID" userid="14" />
        <div class="account-info">
          <div class="b1">
            <label for="">Tên đăng nhập</label>
            <span>${username}</span>
          </div>
          <div class="b1">
            <label for="">Email</label>
            <span>${email}</span>
          </div>
          <div class="b1">
            <label for="">Họ và tên</label>
            <span>${fullname}</span>
          </div>
          <div class="b1">
            <label for="">Nhóm khách hàng</label>
            <span>${position === 1 ? "Admin" : "Member"}</span>
          </div>
          <div class="b1">
            <label for="">Số điện thoại</label>
            <span>${phone !== "" ? phone : "Chưa cập nhật"}</span>
          </div>
          <div class="b1">
            <label for="">Địa chỉ</label>
            <span>${address !== "" ? address : "Chưa cập nhật"}</span>
          </div>
          <div class="b1">
            <label for="">Số dư</label>
            <span>${money.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
        <div class="account-image" style="margin-top: 20px">
          <div class="avatar">
            <div class="img">
              <input type="text" hidden="" id="GetAvatar" />
              <img src="${avatar}" alt="" />
            </div>
            <input type="file" hidden="" id="avatar" />
            <a id="openChooseAvatar">Sửa ảnh đại diện</a>
          </div>
          <div class="desc">
            <span>Vui lòng chọn ảnh nhỏ hơn 5MB</span>
            <span>Chọn hình ảnh phù hợp, không phản cảm</span>
          </div>
        </div>
        <div class="account-title" style="margin-bottom: 18px">Cá nhân</div>
        <div class="account-update">
          <div class="account-gr">
            <input type="text" placeholder="" value="${fullname}" id="fullname" />
            <label for="">Họ và tên</label>
          </div>
          <div class="account-gr">
            <input
              type="text"
              placeholder=""
              value="${email !== "" ? email : ""}"
              disabled=""
              style="background-color: #f6f6f6; outline-color: #f6f6f6"
            />
            <label for="">Email</label>
          </div>
          <div class="account-gr">
            <input type="text" placeholder="" id="phone" value="${
              phone !== "" ? phone : ""
            }" />
            <label for="">Số điện thoại</label>
          </div>
          <div class="account-gr">
            <input type="text" placeholder="" id="address" value="${
              address !== "" ? address : ""
            }" />
            <label for="">Địa chỉ</label>
          </div>
          <button id="updateAccount">Lưu thay đổi</button>
        </div>
      `;

      rdAccountEl.innerHTML = template;
    };

    renderAccount();
  });

  return `<div id="rd-account"></div>`;
}

export default account;
