const Account = () => {
  return `
  <div class="account-fixed">
    <div class="account-form">
      <div class="account-head">
        <div>
          <a class="underline active" id="login">Đăng nhập</a>
          <a class="underline" id="register">Đăng ký</a>
        </div>
        <div class="close">
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </div>
      <!-- login -->
      <div class="login account-layout" id="form-login">
        <div class="account-login">
          <p class="account-desc">
            Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích
            và nhận nhiều ưu đãi hấp dẫn
          </p>
          <div class="form">
            <div class="form-gr">
              <div class="form-group">
                <input type="text" class="form-btn" placeholder="" id="email"/>
                <label class="form-name">Email hoặc tên đăng nhập</label>
              </div>
              <span class="form-error"></span>  
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="password" class="form-btn" placeholder="" id="password"/>
                <label class="form-name">Mật khẩu</label>
              </div>
              <span class="form-error"></span>
            </div>
          </div>
          <a class="login-forgot underline">Bạn quên mật khẩu ?</a>
          <button class="form-submit" id="btn-login">Đăng nhập</button>
          <div class="login-other">Hoặc đăng nhập bằng</div>
          <div class="login-icons">
            <img
              src="https://cdn.divineshop.vn/static/0b314f30be0025da88c475e87a222e5a.svg"
              alt=""
            />
            <img
              src="https://cdn.divineshop.vn/static/4ba68c7a47305b454732e1a9e9beb8a1.svg"
              alt=""
            />
          </div>
        </div>
        <div class="account-image">
          <img
            src="https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg"
            alt=""
          />
        </div>
      </div>
      <!-- register -->
      <div class="register account-layout" id="form-register">
        <div class="account-register">
          <p class="account-desc">
            Đăng ký để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và
            nhận nhiều ưu đãi hấp dẫn
          </p>
          <div class="form">
            <div class="form-gr">
              <div class="form-group">
                <input type="text" class="form-btn" placeholder="" id="fullname" data-name="họ và tên"/>
                <label class="form-name">Họ và tên</label>
              </div>
              <span class="form-error"></span>
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="text" class="form-btn" placeholder="" id="email" data-name="email"/>
                <label class="form-name">Email</label>
              </div>
              <span class="form-error"></span>
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="text" class="form-btn" placeholder="" id="username" data-name="tên đăng nhập"/>
                <label class="form-name">Tên đăng nhập</label>
              </div>
              <span class="form-error"></span>
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="password" class="form-btn" placeholder="" id="password" data-name="mật khẩu"/>
                <label class="form-name">Mật khẩu</label>
              </div>
              <span class="form-error"></span>
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="password" class="form-btn" placeholder="" id="confirm-password" data-name="nhập lại mật khẩu"/>
                <label class="form-name">Nhập lại mật khẩu</label>
              </div>
              <span class="form-error"></span>
            </div>
          </div>
          <div class="account-confirm">
            <input type="checkbox" checked />
            <span
              >Tôi đồng ý nhận thông tin marketing mới từ Divine Shop.</span
            >
          </div>
          <button class="form-submit" id="btn-register">Tạo tài khoản</button>
          <div class="form-dk">
            Khi bấm <span>Tạo tài khoản</span>, bạn đã đồng ý với
            <span class="underline">Điều khoản dịch vụ của Divine Shop</span>
          </div>
        </div>
        <div class="account-image">
          <img
            src="https://cdn.divineshop.vn/static/235dccb09069e3d4eebc6227236f9dc2.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  `;
};

export default Account;
