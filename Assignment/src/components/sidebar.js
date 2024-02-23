import { useEffect } from "@/util";

const Sidebar = () => {
  useEffect(() => {
    const linksSubmenu = document.querySelectorAll(".navbar-submenu li a");
    const links = document.querySelectorAll(".navbar-link");
    const index = JSON.parse(localStorage.getItem("activeAdmin"));

    links.forEach((link, i) => {
      link.addEventListener("click", () => {
        localStorage.setItem("activeAdmin", i);

        links.forEach((el, j) => {
          if (j === i) {
            el.classList.add("active");
            el.classList.add("bg-active");
          } else {
            el.classList.remove("active");
            el.classList.remove("bg-active");
          }
        });
      });
    });

    if (index !== null && index >= 0 && index < links.length) {
      links[index].classList.add("active");
      links[index].classList.add("bg-active");
    }
  });
  return `
  <aside class="admin-aside">
    <div class="admin-navbar">
      <div class="navbar">
        <a class="navbar-logo">
          <img
            src="https://cdn.divineshop.vn/static/b1402e84a947ed36cebe9799e47f61c2.svg"
            alt=""
            style="width: 49px; height: 49px"
          />
          <h4>Account Shop</h4>
        </a>
        <div class="userFixed">
          <div>
            <div class="userFixed-avatar">
              <img
                src="https://i1.sndcdn.com/artworks-CObf3MDw5P89zaeg-flzN8g-t500x500.jpg"
                alt=""
              />
            </div>
            <div>
              <h3>Kan Kan</h3>
              <span>Admin</span>
            </div>
          </div>
          <a href="/"
            ><i class="fas fa-sign-out-alt fa-rotate-180"></i
          ></a>
        </div>
        <ul class="navbar-list">
          <div class="navbar-group">
            <a href="/admin" class="navbar-link">
              <div class="navbar-flex">
                <i class="fas fa-tachometer-alt"></i>
                Bảng điều khiển
              </div>
            </a>
          </div>
          <div class="navbar-group">
            <a class="navbar-link" data-active="category">
              <div class="navbar-flex">
                <i class="fas fa-th-large"></i>
                Danh mục
              </div>
              <i class="fas fa-chevron-right" style="font-size: 13px"></i>
            </a>
            <ul class="navbar-submenu">
              <li>
                <a href="/admin/categoryAdd">
                <i class="fas fa-circle" style="font-size: 6px"></i>
                Thêm danh mục</a
                >
              </li>
              <li>
                <a href="/admin/categoryList"
                  ><i class="fas fa-circle" style="font-size: 6px"></i> Danh
                  sách danh mục</a
                >
              </li>
            </ul>
          </div>
          <div class="navbar-group">
            <a class="navbar-link">
              <div class="navbar-flex">
                <i class="fas fa-archive"></i>
                Sản phẩm
              </div>
              <i class="fas fa-chevron-right" style="font-size: 13px"></i>
            </a>
            <ul class="navbar-submenu">
              <li>
                <a id="ProductAdd"
                  ><i class="fas fa-circle" style="font-size: 6px"></i> Thêm
                  sản phẩm</a
                >
              </li>
              <li>
                <a href="/admin/productList"
                  ><i class="fas fa-circle" style="font-size: 6px"></i> Danh
                  sách sản phẩm</a
                >
              </li>
            </ul>
          </div>
          <div class="navbar-group">
            <a class="navbar-link">
              <div class="navbar-flex">
                <i class="fas fa-user"></i>
                Tài khoản
              </div>
              <i class="fas fa-chevron-right" style="font-size: 13px"></i>
            </a>
            <ul class="navbar-submenu">
              <li>
                <a id="AccountAdd"
                  ><i class="fas fa-circle" style="font-size: 6px"></i> Thêm
                  người dùng</a
                >
              </li>
              <li>
                <a id="AccountList"
                  ><i class="fas fa-circle" style="font-size: 6px"></i> Danh
                  sách người dùng</a
                >
              </li>
            </ul>
          </div>
          <div class="navbar-group">
            <a href="/admin/orderList" class="navbar-link">
              <div class="navbar-flex">
                <i class="fas fa-shopping-cart"></i>
                Đơn hàng
              </div>
            </a>
          </div>
          <div class="navbar-group">
            <a class="navbar-link">
              <div class="navbar-flex">
                <i class="fas fa-newspaper"></i>
                Bài viết
              </div>
            </a>
          </div>
          <div class="navbar-group">
            <a href="/admin/comment" class="navbar-link">
              <div class="navbar-flex">
                <i class="fas fa-comment"></i>
                Bình luận
              </div>
            </a>
          </div>
          <div class="navbar-group">
            <a class="navbar-link" href="/admin/statistical">
              <div class="navbar-flex">
                <i class="fas fa-table"></i>
                Thống kê
              </div>
            </a>
          </div>
        </ul>
      </div>
    </div>
  </aside>
  `;
};

export default Sidebar;
