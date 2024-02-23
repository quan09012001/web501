import Layout from "../layout";
import { useEffect, getList, handleLoadMore } from "@/util";

const Product_List = () => {
  return Layout(ProductList);
};

function ProductList() {
  useEffect(() => {
    // * Hiển thị danh sách sản phẩm
    const renderProductList = async (page = 1, limit = 6) => {
      const productListEl = document.getElementById("product-list");
      const productList = await getList(page, limit, "products", "productRow");
      productListEl.insertAdjacentHTML("beforeend", productList);
    };

    renderProductList();

    // * Xử lý xem thêm
    const moreEl = document.querySelector(".more-product");
    handleLoadMore(moreEl, renderProductList, "products", 6);
  });

  return `
  <div class="product">
    <div class="titlebar">Admin / Sản phẩm / Danh sách sản phẩm</div>
    <div class="search">
      <input type="text" placeholder="Tìm kiếm...">
    </div>
    <table class="table">
      <thead>
        <tr>
        <th>STT</th>
        <th>Tên sản phẩm</th>
        <th>Đơn giá</th>
        <th>Giảm giá</th>
        <th>Tồn kho</th>
        <th>Tình trạng</th>
        <th>Chức năng</th>
      </tr>
      </thead>
      <tbody id="product-list"></tbody>
    </table>
    <p class="more-product more-css">Xem thêm</p>
  </div>
  `;
}

export default Product_List;
