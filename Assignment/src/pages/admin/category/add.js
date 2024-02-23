import Layout from "../layout";
import API from "@/api";
import { useEffect, showToast } from "@/util";

const Category_Add = () => {
  return Layout(CategoryAdd);
};

function CategoryAdd() {
  useEffect(() => {
    let categoryName = document.getElementById("categoryName");
    let categoryAdd = document.getElementById("categoryAdd");

    categoryAdd.addEventListener("click", () => {
      let newCategory = {
        categoryName: categoryName.value,
        icon: "",
      };
      API.post(API.get("categories"), newCategory);
      categoryName.value = "";
      showToast("success", "Thêm danh mục thành công.");
    });
  });

  return `
  <div class="categoryAdd">
    <div class="titlebar">Admin / Danh mục / Thêm danh mục</div>
    <div class="form-group" style="margin-bottom: 18px">
      <input type="text" id="categoryName" class="form-input" placeholder="Tên danh mục">
      <div class="form-error"></div>
    </div>
    <div class="control">
      <a class="btn--add" id="categoryAdd">Thêm danh mục</a>
    </div>
  </div>
  `;
}

export default Category_Add;
