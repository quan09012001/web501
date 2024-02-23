import Header from "@/components/header";
import layout from "./layout";
import Footer from "@/components/footer";
import API from "@/api";
import { checkEmpty } from "@/util/validator";
import { useEffect, getDataByID, showToast } from "@/util";

const password = () => {
  return `
    ${Header()}
    ${layout(Password)}
    ${Footer()}
  `;
};

function Password() {
  useEffect(() => {
    const passOld = document.getElementById("passOld");
    const passNew = document.getElementById("passNew");
    const passConfirm = document.getElementById("passConfirm");
    const changePassword = document.getElementById("changePassword");

    const handleChangePassword = async () => {
      if (checkEmpty(passOld)) {
        const userID = JSON.parse(localStorage.getItem("userID"));
        const user = await getDataByID(userID, "account");
        const { password } = user;
        if (passOld.value === password) {
          if (checkEmpty(passNew) && passNew.value.length >= 6) {
            if (
              checkEmpty(passConfirm) &&
              passConfirm.value === passNew.value
            ) {
              user.password = passNew.value;
              API.put(`${API.get("account")}/${userID}`, user);

              const inputs = document.querySelectorAll("input");
              inputs.forEach((input) => {
                input.value = "";
                input.nextElementSibling.style.top = "50%";
              });

              showToast("success", "Cập nhật mật khẩu thành công.");
            } else {
              checkEmpty(passConfirm, "Mật khẩu xác nhận không chính xác!");
            }
          } else {
            checkEmpty(passNew, "Mật khẩu tối thiểu 6 kí tự!");
          }
        } else {
          checkEmpty(passOld, "Mật khẩu không chính xác!");
        }
      }
    };

    changePassword.addEventListener("click", handleChangePassword);
  });

  return `
  <div class="account-title">Mật khẩu &amp; Bảo mật</div>
    <div class="account-describe">
      Vì sự an toàn, Account Shop khuyến khích khách hàng sử dụng mật khẩu
      mạnh và bảo mật hai lớp
    </div>
    <div class="account-hr"></div>
    <div class="account-password">
      <div class="b1">
        <h4>Đổi mật khẩu</h4>
        <div class="account-filter">
          <div class="form-gr" style="margin-bottom: 0">
            <div class="form-group">
              <input style="padding: 0" type="password" class="form-btn" placeholder="" id="passOld">
              <label class="form-name">Mật khẩu cũ</label>
            </div>
            <span class="form-error"></span>  
          </div>
          <div class="form-gr" style="margin-bottom: 0">
            <div class="form-group">
              <input style="padding: 0" type="password" class="form-btn" placeholder="" id="passNew">
              <label class="form-name">Mật khẩu mới</label>
            </div>
            <span class="form-error"></span>  
          </div>
          <div class="form-gr" style="margin-bottom: 0">
            <div class="form-group">
              <input style="padding: 0" type="password" class="form-btn" placeholder="" id="passConfirm">
              <label class="form-name">Xác nhận mật khẩu</label>
            </div>
            <span class="form-error"></span>  
          </div>
          <button id="changePassword">Lưu thay đổi</button>
        </div>
      </div>
      <div class="b2">
        <h6>Mật khẩu của bạn</h6>
        <ul>
          <li>Phải từ 8 ký tự trở lên</li>
          <li>Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt</li>
          <li>Không nên giống với mật khẩu được sử dụng gần đây</li>
        </ul>
      </div>
    </div>
  `;
}

export default password;
