import API from "@/api";
import { getList, handleLoadMore, handleZoomImage, useEffect } from "@/util";

const Home = () => {
  useEffect(() => {
    // * Hiển thị danh sách sản phẩm
    const renderProductList = async (page = 1, limit = 8) => {
      const productLayout = document.querySelector(".product-layout");
      const productList = await getList(page, limit, "products");
      productLayout.insertAdjacentHTML("beforeend", productList);
    };

    renderProductList();

    // * Xử lý xem thêm
    const moreEl = document.querySelector(".more--primary");
    handleLoadMore(moreEl, renderProductList, "products");

    // * Hiển thị slider
    const sliderImage = document.querySelector(".slider .image");

    const renderSlider = async (indexSlider = 1) => {
      const url = API.get("slider");
      const res = await fetch(url);
      const data = await res.json();
      const srcImage = data[indexSlider].src;
      const img = `<img src="${srcImage}" />`;
      return (sliderImage.innerHTML = img);
    };

    renderSlider();

    // * Xử lý slider
    let indexSlider = 1;

    const handleChangeSlider = async (dir) => {
      const url = API.get("slider");
      const listSlider = await (await fetch(url)).json();

      if (dir === "next") {
        indexSlider++;
        if (indexSlider > listSlider.length - 1) indexSlider = 0;
      } else if (dir === "prev") {
        indexSlider--;
        if (indexSlider < 0) indexSlider = listSlider.length - 1;
      }

      renderSlider(indexSlider);
    };

    // * next slider & prev slider
    const nextSlider = document.querySelector(".slider .right");
    const prevSlider = document.querySelector(".slider .left");

    nextSlider.addEventListener("click", () => handleChangeSlider("next"));
    prevSlider.addEventListener("click", () => handleChangeSlider("prev"));

    setInterval(() => {
      handleChangeSlider("next");
    }, 6000);

    // * Phóng to hình ảnh
    handleZoomImage(sliderImage);
  });

  return `
  <!-- banner -->
    <div class="banner">
      <div class="container">
        <div class="banner-layout">
          <!-- sidebar -->
          <div class="sidebar">
            <ul>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb1.svg" alt="" />
                  <span>Giải trí</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb2.svg" alt="" />
                  <span>Làm việc</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb3.svg" alt="" />
                  <span>Học tập</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb4.svg" alt="" />
                  <span>Game Steam</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb5.svg" alt="" />
                  <span>EA Games</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb6.svg" alt="" />
                  <span>Windown, Office</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb7.svg" alt="" />
                  <span>Google Drive</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb8.svg" alt="" />
                  <span>Steam Wallet</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img class="w21h17c5" src="../public/images/sb9.svg" alt="" />
                  <span>Gói Data Mobile</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <img
                    class="w21h17c5"
                    src="../public/images/sb10.svg"
                    alt=""
                  />
                  <span>Google Play, iTunes</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- slider -->
          <div class="slider">
            <div class="slider-icon left">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </div>
            <div class="image"></div>
            <div class="slider-icon right">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
          <!-- image -->
          <div class="banner-imgRight">
            <div class="image">
              <img src="../public/images/banner1.png" alt="" />
            </div>
            <div class="image">
              <img src="../public/images/banner2.png" alt="" />
            </div>
          </div>
          <!-- banner-imgBot -->
          <div class="banner-imgBot">
            <div class="image">
              <img src="../public/images/banner3.png" alt="" />
            </div>
            <div class="image">
              <img src="../public/images/banner4.png" alt="" />
            </div>
            <div class="image">
              <img src="../public/images/banner5.png" alt="" />
            </div>
            <div class="image">
              <img src="../public/images/banner6.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- heading -->
    <div class="pt35">
      <div class="heading">
        <div class="container">
          <div>
            <span>Sản phẩm nổi bậc</span>
            <button>Khám phá</button>
          </div>
          <p>Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích</p>
        </div>
      </div>
    </div>
    <!-- product -->
    <div class="pt21">
      <div class="product">
        <div class="container">
          <div class="product-layout"></div>
          <div class="more more--primary">Xem thêm</div>
        </div>
      </div>
    </div>
    <!-- heading -->
    <div class="pt35">
      <div class="heading">
        <div class="container">
          <div>
            <span>Từ khóa nổi bậc</span>
          </div>
        </div>
      </div>
    </div>
    <!-- keyword -->
    <div class="pt18">
      <div class="container">
        <div class="keyword">
          <div class="item" style="--color: #3d5a80">Làm việc</div>
          <div class="item" style="--color: #98c1d9">Giải trí</div>
          <div class="item" style="--color: #ee6c4d">Học tập</div>
          <div class="item" style="--color: #293241">Spotify</div>
          <div class="item" style="--color: #545b67">Wallet</div>
          <div class="item" style="--color: #767c85">Youtube</div>
        </div>
      </div>
    </div>
    <!-- selling -->
    <div class="mt35">
      <div class="selling">
        <div class="container">
          <div class="heading">
            <div class="container">
              <div>
                <div class="highlight">
                  <img
                    src="../public/images/selling.svg"
                    width="24.5px"
                    height="24.5px"
                    alt=""
                  />
                  <span>#Sản phẩm bán chạy nhất </span>
                </div>
                <button>Khám phá</button>
              </div>
            </div>
          </div>
          <div class="pt35">
            <div class="product">
              <div class="container">
                <div class="product-layout">
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-thang-23298.jpg?hash=1658829694"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Tài Khoản Netflix Premium 1 tháng - Xem phim chất lượng 4k
                      và Full HD
                    </div>
                    <div class="product-other">
                      <div class="price-new">89.000đ</div>
                      <div class="price-old">260.000đ</div>
                      <div class="product-discount">-66%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Spotify/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg?hash=1658742748"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Gói gia hạn Spotify Premium 01 năm
                    </div>
                    <div class="product-other">
                      <div class="price-new">299.000đ</div>
                      <div class="price-old">590.000đ</div>
                      <div class="product-discount">-49%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Zoom/Divine-Shop-Nang-cap-Zoom-Pro-1-thang-80331.jpg?hash=1658975559"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Nâng cấp Tài khoản Zoom Pro 1 tháng
                    </div>
                    <div class="product-other">
                      <div class="price-new">210.000đ</div>
                      <div class="price-old">350.000đ</div>
                      <div class="product-discount">-40%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-shop-windows-10-pro-55555.jpg?hash=1658743921"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Windows 10 Professional CD Key
                    </div>
                    <div class="product-other">
                      <div class="price-new">290.000đ</div>
                      <div class="price-old">400.000đ</div>
                      <div class="product-discount">-28%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Youtube/Divine-Shop-YOUTUBE-NO-ADS-1-NAM-53447.jpg?hash=1658743452"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Gia hạn YouTube Premium + YouTube Music (1 Năm)
                    </div>
                    <div class="product-other">
                      <div class="price-new">479.000đ</div>
                      <div class="price-old">6.720.000đ</div>
                      <div class="product-discount">-93%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Discord Nitro 3 thang-71170.jpg?hash=1672370038"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Discord Nitro 3 tháng (Đăng kí lần đầu)
                    </div>
                    <div class="product-other">
                      <div class="price-new">165.000đ</div>
                      <div class="price-old">690.000đ</div>
                      <div class="product-discount">-76%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/OpenAI - ChatGPT-37620.jpg?hash=1672200973"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Tài khoản OpenAI - ChatGPT (Có sẵn 5$)
                    </div>
                    <div class="product-other">
                      <div class="price-new">99.000đ</div>
                      <div class="price-old">200.000đ</div>
                      <div class="product-discount">-50%</div>
                    </div>
                  </div>
                  <div class="product-item">
                    <div class="product-image">
                      <img
                        src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-Grammarly-Premium-1-Nam-35103.jpg?hash=1658742859"
                        alt=""
                      />
                    </div>
                    <div class="product-name underline">
                      Tài khoản Grammarly Premium 1 năm
                    </div>
                    <div class="product-other">
                      <div class="price-new">490.000đ</div>
                      <div class="price-old">1.500.000đ</div>
                      <div class="product-discount">-67%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="more more--white">Xem thêm</div>
        </div>
      </div>
    </div>
    <!-- keyword -->
    <!-- heading -->
    <div class="pt35">
      <div class="heading">
        <div class="container">
          <div>
            <span>Từ khóa nổi bậc</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pt18">
      <div class="container">
        <div class="keyword">
          <div
            class="item"
            style="--color: #fff; color: #000; border: 1px solid #eee"
          >
            20.000đ
          </div>
          <div
            class="item"
            style="--color: #fff; color: #000; border: 1px solid #eee"
          >
            50.000đ
          </div>
          <div
            class="item"
            style="--color: #fff; color: #000; border: 1px solid #eee"
          >
            100.000đ
          </div>
          <div
            class="item"
            style="--color: #fff; color: #000; border: 1px solid #eee"
          >
            200.000đ
          </div>
          <div
            class="item"
            style="--color: #fff; color: #000; border: 1px solid #eee"
          >
            500.000đ
          </div>
          <div
            class="item"
            style="--color: #fff; color: #000; border: 1px solid #eee"
          >
            1.000.000đ
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Home;
