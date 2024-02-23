import Layout from "../layout";
import API from "@/api";
import {
  useEffect,
  getList,
  handleLoadMore,
  showModal,
  showToast,
} from "@/util";

const Category_List = () => {
  return Layout(CategoryList);
};

function CategoryList() {
  useEffect(() => {
    // * Hiển thị danh sách danh mục
    const renderCategoryList = async (page = 1, limit = 6) => {
      const categoryListEl = document.getElementById("list-category");
      const categoryList = await getList(page, limit, "categories");
      categoryListEl.insertAdjacentHTML("beforeend", categoryList);

      // * Xóa danh mục
      const deleteEl = document.querySelectorAll(".delete");
      deleteEl.forEach((item) =>
        item.addEventListener("click", () => {
          showModal("Bạn chắc chắn xóa danh mục này !", () => {
            const id = item.dataset.id;
            API.delete(API.get("categories"), id, item);
            showToast("success", "Xóa danh mục thành công.");
          });
        })
      );

      // * Sửa danh mục
      const editEl = document.querySelectorAll(".edit");
      editEl.forEach((item) =>
        item.addEventListener("click", () => {
          console.log(item.dataset.id);
        })
      );
    };

    renderCategoryList();

    // * Xử lý xem thêm
    const moreEl = document.querySelector(".more-category");
    handleLoadMore(moreEl, renderCategoryList, "categories", 6);
  });

  return `
  <div class="category-list">
  <div class="titlebar">Admin / Danh mục / Danh sách danh mục</div>
  <div class="search">
    <input type="text" placeholder="Tìm kiếm...">
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên danh mục</th>
        <th>Chức năng</th>
      </tr>
    </thead>
    <tbody id="list-category"></tbody>
  </table>
  <p class="more-category more-css">Xem thêm</p>
  </div>
  `;
}

export default Category_List;
