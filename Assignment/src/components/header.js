import Account from "./account";
import API from "@/api";
import { loadHeader } from "@/models/baseModel";
import { checkEmpty, Validator } from "@/util/validator";
import { useEffect, getData, randomNumber, sendMail, showToast } from "@/util";

const Header = () => {
  useEffect(() => {
    loadHeader();
    const linkAccount = document.querySelector(".account-action a");
    const accountUser = document.querySelector(".account-user");
    const logout = document.getElementById("logout");
    const app = document.getElementById("app");
    const searchInput = document.querySelector(".search-input");

    // * Hiển thị form
    if (linkAccount) {
      linkAccount.addEventListener("click", () => {
        app.insertAdjacentHTML("beforeend", Account());

        const btnLogin = document.getElementById("btn-login");
        const btnRegister = document.getElementById("btn-register");
        const forgotEl = document.querySelector(".login-forgot");

        btnLogin.addEventListener("click", handlelogin);

        btnRegister.addEventListener("click", handleRegister);

        forgotEl.addEventListener("click", handleForgot);
      });
    }

    if (accountUser) {
      accountUser.addEventListener("click", () => {
        accountUser.classList.toggle("isSubmenu");
      });
    }

    // * Đăng nhập
    async function handlelogin() {
      const url = API.get("account");
      const res = await fetch(url);
      const data = await res.json();

      const userOrEmail = document.querySelector("#form-login #email");
      const pass = document.querySelector("#form-login #password");

      const user = data.find(
        (account) =>
          account.username === userOrEmail.value ||
          account.email === userOrEmail.value
      );

      if (checkEmpty(userOrEmail)) {
        if (user) {
          const { id, password } = user;

          if (checkEmpty(pass) && pass.value === password) {
            localStorage.setItem("userID", id);
            document.querySelector(".account-fixed").remove();

            const cartGuest = JSON.parse(
              localStorage.getItem("cart_999") || "[]"
            );

            const cartUser = JSON.parse(
              localStorage.getItem(`cart_${id}`) || "[]"
            );

            localStorage.setItem("cart_999", []);

            for (const productG of cartGuest) {
              let productFound = false;

              for (const productU of cartUser) {
                if (productU.id === productG.id) {
                  productU.quantity += productG.quantity;
                  productFound = true;
                  break;
                }
              }

              if (!productFound) {
                cartUser.push(productG);
              }
            }

            localStorage.setItem(`cart_${id}`, JSON.stringify(cartUser));

            loadHeader();
          } else {
            checkEmpty(pass, "Mật khẩu không chính xác!");
          }
        } else {
          checkEmpty(userOrEmail, "Email hoặc tên đăng nhập không hợp lệ!");
        }
      }
    }

    async function handleRegister() {
      const fullname = document.querySelector(".account-register #fullname");
      const email = document.querySelector(".account-register #email");
      const username = document.querySelector(".account-register #username");
      const pass = document.querySelector(".account-register #password");
      const passConfirm = document.querySelector(
        ".account-register #confirm-password"
      );

      const listInputs = document.querySelectorAll(".account-register input");

      listInputs.forEach((input) => {
        checkEmpty(input);
      });

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        checkEmpty(email, "Email này không hợp lệ!");
      }

      if (pass.value.length < 6) {
        checkEmpty(pass, "Mật khẩu tối thiểu 6 ký tự!");
      }

      if (passConfirm.value !== pass.value) {
        checkEmpty(passConfirm, "Mật khẩu xác nhận không chính xác!");
      }

      const errorEl = document.querySelectorAll(
        ".account-register .form-error"
      );

      let arrError = [];
      errorEl.forEach((error) => {
        if (error.innerText != "") {
          arrError.push(error.innerText);
        }
      });

      if (!arrError.length) {
        // * TODO CODE
        const data = {
          id: 0,
          fullname: fullname.value,
          username: username.value,
          password: pass.value,
          email: email.value,
          phone: "",
          address: "",
          avatar:
            "https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269",
          position: 0,
          money: 0,
        };

        API.post(API.get("account"), data);

        listInputs.forEach((input) => {
          input.value = "";
          input.nextElementSibling.style.top = "50%";
        });

        showToast("success", "Đăng ký tài khoản thành công!");
      }
    }

    // * Đăng xuất
    if (logout) {
      logout.addEventListener("click", () => {
        localStorage.setItem("userID", 999);
        loadHeader();
      });
    }

    // * Quên mật khẩu
    async function handleForgot() {
      const accountForm = document.querySelector(".account-form");

      const template = `
      <div id="forgotForm">
        <div class="account-head">
          <div>
            <a style="color: black">Đặt lại mật khẩu</a>
          </div>
          <div class="close">
            <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
          </div>
        </div>
        <div class="account-layout">
          <div class="account-form" style="padding: 0">
            <p class="account-desc">
              Bạn vui lòng hoàn tất các thông tin xác thực bên dưới để chúng tôi
              đặt lại mật khẩu cho tài khoản của bạn
            </p>
            <div class="form-gr">
              <div class="form-group">
                <input type="text" class="form-btn" placeholder="" id="userOrEmail">
                <label class="form-name">Email hoặc tên đăng nhập</label>
              </div>
              <span class="form-error"></span>  
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="password" class="form-btn" placeholder="" id="passNew">
                <label class="form-name">Mật khẩu mới</label>
              </div>
              <span class="form-error"></span>  
            </div>
            <div class="form-gr">
              <div class="form-group">
                <input type="password" class="form-btn" placeholder="" id="passConfirm">
                <label class="form-name">Xác nhận mật khẩu mới</label>
              </div>
              <span class="form-error"></span>  
            </div>
            <button class="form-submit" id="forgot">Đặt lại mật khẩu</button>
          </div>
          <div class="account-svg">
            <img
              src="https://cdn.divineshop.vn/static/c92dc142033ca6a66cda62bc0aec491b.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      `;

      accountForm.innerHTML = template;

      const forgetBtn = document.getElementById("forgot");
      if (!forgetBtn) return;

      const userOrEmail = document.getElementById("userOrEmail");
      const passNew = document.getElementById("passNew");
      const passConfirm = document.getElementById("passConfirm");

      forgetBtn.addEventListener("click", async () => {
        if (checkEmpty(userOrEmail)) {
          const listAccount = await getData("account");
          const user = listAccount.find(
            (account) =>
              account.username === userOrEmail.value ||
              account.email === userOrEmail.value
          );
          if (user) {
            const { id, email, fullname } = user;

            if (checkEmpty(passNew) && passNew.value.length >= 6) {
              if (
                checkEmpty(passConfirm) &&
                passConfirm.value === passNew.value
              ) {
                const template = `
                  <div id="forgotConfirm">
                    <div class="account-head">
                      <div>
                        <a style="color: black">Nhập mã xác thực</a>
                      </div>
                      <ion-icon
                        name="close-outline"
                        class="account-close md hydrated"
                        role="img"
                        aria-label="close outline"
                      ></ion-icon>
                    </div>
                    <div class="account-layout" style="align-items: flex-start">
                      <div class="account-form" style="padding: 0">
                        <p class="account-desc">
                          Vui lòng nhập mã OTP được gửi tới email của bạn để xác thực
                        </p>
                        <div class="form-gr">
                          <div class="form-group">
                            <input type="text" class="form-btn" placeholder="" id="otp">
                            <label class="form-name">Mã xác thực OTP</label>
                          </div>
                          <span class="form-error"></span>  
                        </div>
                        <button class="form-submit" id="confirm-otp">Xác nhận</button>
                      </div>
                      <div class="account-svg">
                        <img
                          src="https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  `;

                accountForm.innerHTML = template;

                const confirmBtn = document.getElementById("confirm-otp");
                const OTP = randomNumber();

                sendMail(email, fullname, OTP, "template_ows2hx9");

                confirmBtn.addEventListener("click", async () => {
                  const otpEl = document.getElementById("otp");

                  if (checkEmpty(otpEl) && otpEl.value === OTP) {
                    // * giữ nguyên dữ liệu cũ chỉ thay đổi password
                    const newDataUser = { ...user, password: passNew.value };
                    API.put(`${API.get("account")}/${id}`, newDataUser);

                    otpEl.value = "";
                    otpEl.nextElementSibling.style.top = "50%";

                    const div = document.querySelector(".account-fixed");
                    div.remove();

                    showToast("success", "Đặt lại mật khẩu thành công");
                  } else {
                    checkEmpty(otpEl, "Mã xác nhận không chính xác!");
                  }
                });
              } else {
                checkEmpty(passConfirm, "Mật khẩu xác nhận không chính xác!");
              }
            } else {
              checkEmpty(passNew, "Mật khẩu tối thiểu 6 kí tự!");
            }
          } else {
            checkEmpty(userOrEmail, "Email hoặc tên đăng nhập không hợp lệ");
          }
        }
      });
    }

    // * Đóng form
    document.addEventListener("click", (e) => {
      const accountFixed = document.querySelector(".account-fixed");
      const accountLogin = document.querySelector(".login");
      const accountRegister = document.querySelector(".register");

      if (!accountFixed) return;
      if (e.target.matches(".account-fixed")) {
        e.target.parentNode.removeChild(accountFixed);
      } else if (e.target.matches(".close")) {
        e.target.closest("#app").removeChild(accountFixed);
      } else if (e.target.matches("#login")) {
        e.target.classList.add("active");
        e.target.nextElementSibling.classList.remove("active");

        accountLogin.style.display = "flex";
        accountRegister.style.display = "none";
      } else if (e.target.matches("#register")) {
        e.target.classList.add("active");
        e.target.previousElementSibling.classList.remove("active");

        accountRegister.style.display = "flex";
        accountLogin.style.display = "none";
      }
    });

    // * Tìm kiếm
    const searchProducts = async (value) => {
      value = value.toLowerCase();
      const products = await getData("products");
      const result = products.filter((product) => {
        const { productName } = product;
        return (
          productName.charAt(0).toLowerCase() === value.charAt(0) &&
          productName.toLowerCase().includes(value)
        );
      });
      return result;
    };

    // * Hiển thị kết quả tìm kiếm
    const displaySearchResults = (results) => {
      const searchProductList = document.querySelector(".search-product");
      if (!searchProductList) return;

      const itemSearch = (id, value) => {
        return `
        <li>
          <a href="/product/${id}" class="underline"
            >${value}</a
          >
        </li>
        `;
      };

      searchProductList.innerHTML = "";

      if (results.length === 0) {
        searchProductList.innerHTML = itemSearch(
          0,
          "Không có sản phẩm phù hợp với tìm kiếm !"
        );
      } else {
        for (const product of results) {
          const { id, productName } = product;

          searchProductList.innerHTML += itemSearch(id, productName);
        }
      }
    };

    let debounceTimeout;
    searchInput.addEventListener("input", async () => {
      // Nếu có sự kiện input thì xóa setTimeout tồn tại nếu có
      clearTimeout(debounceTimeout);
      const value = searchInput.value.trim();

      // Nếu không có sự kiện input sau 500ms thực thi code
      debounceTimeout = setTimeout(async () => {
        const searchResults = await searchProducts(value);
        displaySearchResults(searchResults);
      }, 500);
    });

    searchInput.addEventListener("click", () => {
      document.addEventListener("click", (e) => {
        if (
          !e.target.matches(".search-product") &&
          !e.target.matches(".search") &&
          !e.target.matches(".search input")
        ) {
          const searchProductList = document.querySelector(".search-product");
          if (!searchProductList) return;
          searchProductList.remove();
        }
      });

      const searchEl = document.querySelector(".search");
      const html = `
      <ul class="search-product">
        <li>
          <a href="" class="underline"
            >Tài khoản OpenAI - ChatGPT (Có sẵn 5$)</a
          >
        </li>
        <li>
          <a href="" class="underline"
            >Phần mềm thiết kế AĐôBe Full App</a
          >
        </li>
        <li><a href="" class="underline">Nâng cấp AutoDesk</a></li>
        <li>
          <a href="" class="underline">Gia hạn Youtube Premium</a>
        </li>
        <li>
          <a href="" class="underline">Tài khoản Netflix Premium</a>
        </li>
        <li>
          <a href="" class="underline">Windows, Office bản quyền</a>
        </li>
        <li><a href="" class="underline">Quizlet Plus</a></li>
      </ul>
      `;
      searchEl.insertAdjacentHTML("beforeend", html);
    });

    const resetActive = document.getElementById("managerClick");
    if (!resetActive) return;
    resetActive.addEventListener("click", () => {
      localStorage.setItem("activeManager", JSON.stringify(0));
    });
  });
  return `
  <header>
    <!-- topbar -->
    <div class="header-topbar">
      <div class="container">
        <div class="topbar-layout">
          <div class="topbar-left">
            <span class="underline"
              >Tài khoản OpenAI - ChatGPT (Có sẵn 5$)</span
            >
          </div>
          <div class="topbar-right">
            <div class="item">
              <div class="image">
                <img
                  src="../public/images/topbar1.svg"
                  class="w17c5"
                  alt=""
                />
              </div>
              <a class="underline">Hướng dẫn mua hàng</a>
            </div>
            <div class="item">
              <div class="image">
                <img
                  src="../public/images/topbar2.svg"
                  class="w17c5"
                  alt=""
                />
              </div>
              <a class="underline">Ưu đãi khách hàng</a>
            </div>
            <div class="item">
              <div class="image">
                <img
                  src="../public/images/topbar3.svg"
                  class="w17c5"
                  alt=""
                />
              </div>
              <a class="underline">Thông tin liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- navbar -->
    <div class="header-navbar">
      <div class="container">
        <div class="navbar-layout">
          <!-- top -->
          <div class="navbar-top">
            <!-- logo -->
            <div class="logo">
              <div class="image">
                <img src="../public/images/logo.svg" alt="" />
              </div>
              <a href="/">Account Shop</a>
            </div>
            <!-- search -->
            <div class="search">
              <input
                type="text"
                class="search-input"
                placeholder="Tìm kiếm sản phẩm"
              />
              <a href="/filter"><div class="search-icon">
                <img src="../public/images/search.svg" class="w17c5" alt="" />
              </div></a>
            </div>
            <!-- login -->
            <div class="header-account">
              <!-- no login -->
              <div class="account-action">
                <div class="account-guest">
                  <div class="account-icon">
                    <img src="../public/images/user.svg" class="w17c5" />
                  </div>
                  <a>Đăng nhập / Đăng ký</a>
                </div>
                <div class="account-user">
                  <div class="account-group">
                    <div class="account-avatar">
                      <img src="" alt="" />
                    </div>
                    <div class="account-name"></div>
                  </div>
                  <ul class="submenu">
                    <li><a>Số dư tài khoản</a></li>
                    <div class="account-money"><span>0đ</span> <i class="fa-solid fa-plus"></i></div>
                    <li><a href="/account" id="managerClick">Quản lý tài khoản</a></li>
                    <li><a id="logout">Đăng xuất</a></li>
                  </ul>
                </div>
              </div>
              <!-- ok login -->
            </div>
            <!-- cart -->
            <a href="/cart">
              <div class="header-cart">
                <div class="icon-cart">
                  <img src="../public/images/cart.svg" class="h17c5" alt="" />
                </div>
                <a href="/cart">Giỏ hàng</a>
                <span>0</span>
              </div>
            </a>
          </div>
          <!-- bot -->
          <div class="navbar-bot">
            <div class="item">
              <div class="icon">
                <img class="w21h17c5" src="../public/images/eye.svg" alt="" />
              </div>
              <a class="underline">Sản phẩm bạn vừa xem</a>
            </div>
            <div class="item">
              <div class="icon">
                <img class="w21h17c5" src="../public/images/hot.svg" alt="" />
              </div>
              <a class="underline">Sản phẩm mua nhiều</a>
            </div>
            <div class="item">
              <div class="icon">
                <img
                  class="w21h17c5"
                  src="../public/images/discount.svg"
                  alt=""
                />
              </div>
              <a class="underline">Sản phẩm khuyến mãi</a>
            </div>
            <div class="item">
              <div class="icon">
                <img class="w21h17c5" src="../public/images/map.svg" alt="" />
              </div>
              <a class="underline">Đại lý giao dịch</a>
            </div>
            <div class="item">
              <div class="icon">
                <img class="w21h17c5" src="../public/images/pay.svg" alt="" />
              </div>
              <a class="underline">Hình thức thanh toán</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- botbar -->
    <div class="header-botbar">
      <div class="container">
        <div class="navbar-botbar">
          <div class="botbar-left">
            <div>
              <img src="../public/images/menu.svg" class="w17c5" alt="" />
              <span>Danh mục sản phẩm</span>
            </div>
          </div>
          <div class="botbar-right">
            <div class="item">
              <div class="image">
                <img src="../public/images/Nap-thesvg-30724.svg" alt="" />
              </div>
              <a class="underline">Thủ thuật & Tin tức</a>
            </div>
            <div class="item">
              <div class="image">
                <img
                  src="../public/images/Gioi-thieu-ban-be-87652.svg"
                  alt=""
                />
              </div>
              <a class="underline">Giới thiệu bạn bè</a>
            </div>
            <div class="item">
              <div class="image">
                <img
                  src="../public/images/Lien-he-hop-tac-33199.svg"
                  alt=""
                />
              </div>
              <a class="underline">Liên hệ hợp tác</a>
            </div>
            <div class="item">
              <div class="image">
                <img
                  src="../public/images/Uu-dai-khach-vip-79547.svg"
                  alt=""
                />
              </div>
              <a class="underline">Ưu đãi khách VIP</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  `;
};

export default Header;
