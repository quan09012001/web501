import API from "@/api";
import ProductItem from "@/components/productItem";
import { useEffect, getList, getData } from "@/util";

const filter = () => {
  useEffect(() => {
    const productLayout = document.querySelector(".product-layout");

    // * Hiển thị danh sách sản phẩm
    const renderProductList = async (page = 1, limit = 16) => {
      const productList = await getList(page, limit, "products");
      productLayout.insertAdjacentHTML("beforeend", productList);
    };

    renderProductList();

    const listCategories = async () => {
      const selectEl = document.querySelector(".select");

      const url = API.get("categories");
      const res = await fetch(url);
      const categories = await res.json();

      for (const category of categories) {
        const { id, categoryName } = category;

        selectEl.innerHTML += `
        <div class="option option-category" value="${id}">${categoryName}</div>
        `;
      }

      const optionsEl = document.querySelectorAll(".option-category");
      optionsEl.forEach((option) =>
        option.addEventListener("click", () => {
          const getIdCate = document.querySelector(".getIdCate");
          const nameCategory = document.querySelector(".name-category");
          nameCategory.innerText = option.innerText;
          getIdCate.setAttribute("data-id", option.getAttribute("value"));
        })
      );
    };

    listCategories();

    // * Đóng mở select option
    const clickSelect = document.querySelector(".click-select");
    clickSelect.addEventListener("click", function () {
      this.classList.toggle("show-option");
    });

    // * Lọc tất cả option
    const filterAll = document.getElementById("filter-all");
    filterAll.addEventListener("click", async () => {
      let html = "";
      const getIdCate = document.querySelector(".getIdCate").dataset.id;
      const priceMin = document.getElementById("priceMin").value;
      const priceMax = document.getElementById("priceMax").value;

      const products = await getData("products");

      const listProductFilter = products.filter((product) => {
        const { id, categoryID, productName, price, quantity, discount } =
          product;
        // let priceNew = (price - (price * discount) / 100) * quantity;
        if (categoryID == getIdCate) {
          return product;
        }
      });

      for (const product of listProductFilter) {
        html += ProductItem(product);
      }

      productLayout.innerHTML = html;
    });

    // * Rest bộ lọc
    const filterReset = document.querySelector(".filter-reset");
    filterReset.addEventListener("click", () => {
      productLayout.innerHTML = "";
      renderProductList();
    });
  });

  return `
  <div class="filter">
    <div class="container">
      <div class="filter-title">Lọc sản phẩm</div>
      <div class="filter-condition">
        <div class="filter-box click-select">
          <div class="filter-flex">
            <label class="filter-name">Danh mục</label>
            <div class="select-value name-category" value="" id="category">Tất cả</div>
          </div>
          <ion-icon
            name="chevron-down-outline"
            role="img"
            class="md hydrated"
            aria-label="chevron down outline"
          ></ion-icon>
          <div class="select getIdCate"></div>
        </div>
        <div class="filter-group">
          <span>Mức giá</span>
          <div>
            <div class="btn">
              <input type="text" id="priceMin" placeholder="" />
              <label for="">Mức giá từ</label>
            </div>
            -
            <div class="btn">
              <input type="text" id="priceMax" placeholder="" />
              <label for="">Mức giá đến</label>
            </div>
          </div>
        </div>
        <div class="filter-box">
          <div class="filter-flex">
            <label class="filter-name">Sắp xếp</label>
            <div class="select-value" value="" id="sort">Mặc định</div>
          </div>
          <ion-icon
            name="chevron-down-outline"
            role="img"
            class="md hydrated"
            aria-label="chevron down outline"
          ></ion-icon>
          <div class="select">
            <div class="option" value="">Mặc định</div>
            <div class="option" value="6">Còn hàng</div>
            <div class="option" value="5">Sản phẩm giảm giá</div>
            <div class="option" value="1">Giá thấp đến cao</div>
            <div class="option" value="2">Giá cao đến thấp</div>
            <div class="option" value="3">Từ A đến Z</div>
            <div class="option" value="4">Từ Z đến A</div>
          </div>
        </div>
        <button id="filter-all"><svg class="od Cb Da" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M479.968 0H32.038C3.613 0-10.729 34.487 9.41 54.627L192 237.255V424a31.996 31.996 0 0 0 10.928 24.082l64 55.983c20.438 17.883 53.072 3.68 53.072-24.082V237.255L502.595 54.627C522.695 34.528 508.45 0 479.968 0zM288 224v256l-64-56V224L32 32h448L288 224z"></path></svg> Lọc</button>
      </div>
      <div class="filter-reset underline">
        <svg
          class="od Cb Da"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M492 8h-10c-6.627 0-12 5.373-12 12v110.627C426.929 57.261 347.224 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h10.016c6.353 0 11.646-4.949 11.977-11.293C48.157 132.216 141.097 42 256 42c82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12zm-.301 248h-10.015c-6.352 0-11.647 4.949-11.977 11.293C463.841 380.158 370.546 470 256 470c-82.608 0-154.672-46.952-190.299-116H180c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H20c-6.627 0-12 5.373-12 12v160c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V381.373C85.071 454.739 164.777 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z"
          ></path>
        </svg>
        Khôi phục bộ lọc
      </div>
    </div>
  </div>
  <div class="product">
    <div class="container">
      <div class="product-layout"></div>
    </div>
  </div>
  `;
};

export default filter;
