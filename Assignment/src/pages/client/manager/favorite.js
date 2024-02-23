import Header from "@/components/header";
import layout from "./layout";
import Footer from "@/components/footer";
import {
  useEffect,
  getDataByID,
  showModal,
  showToast,
  showImageEmpty,
} from "@/util";
import { handleAddToCart } from "@/models/cartModel";
import API from "@/api";

const favorite = () => {
  return `
    ${Header()}
    ${layout(Favorite)}
    ${Footer()}
  `;
};

function Favorite() {
  useEffect(() => {
    const rdFavorite = document.getElementById("rd-favorite");

    const productRow = (product) => {
      const { id, productName, price, discount, image } = product;
      return `
      <div class="account-favorite">
        <div class="favorite-product">
          <div class="image">
            <img
              src="${image}"
              alt=""
            />
          </div>
          <div class="group">
            <h4 class="underline">
              <a href="product/${id}" style="color: inherit"
                >${productName}</a
              >
            </h4>
            <p>${productName}</p>
            <a
              style="cursor: pointer"
              class="addToCart" data-id="${id}"
            >
              <svg
                class="od Cb Da"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64s64-28.654 64-64c0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM464 424c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm-256 0c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm279.438-152H184.98l-31.31-160h368.548l-34.78 160zM272 200v-16c0-6.627 5.373-12 12-12h32v-32c0-6.627 5.373-12 12-12h16c6.627 0 12 5.373 12 12v32h32c6.627 0 12 5.373 12 12v16c0 6.627-5.373 12-12 12h-32v32c0 6.627-5.373 12-12 12h-16c-6.627 0-12-5.373-12-12v-32h-32c-6.627 0-12-5.373-12-12z"
                ></path>
              </svg>
              Thêm vào giỏ hàng
            </a>
          </div>
          <div class="price">
            <div class="new">${(
              price -
              (price * discount) / 100
            ).toLocaleString("vi-VN")}đ</div>
            <div class="old">
              <span>-${discount}%</span>
              <p>${price.toLocaleString("vi-VN")}đ</p>
            </div>
          </div>
          <div
            style="cursor: pointer"
            class="remove removefavorite" data-id="${id}""
          >
            <svg
              class="od Cb Da"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      `;
    };

    const renderFavorite = async () => {
      const userID = JSON.parse(localStorage.getItem("userID"));

      const url = `${API.get("favorite")}?userID=${userID}`;
      const res = await fetch(url);
      const listFavorite = await res.json();

      if (listFavorite.length === 0) {
        showImageEmpty(rdFavorite);
      } else {
        rdFavorite.innerHTML = "";
        for (const item of listFavorite) {
          const product = await getDataByID(item.productID, "products");
          rdFavorite.innerHTML += productRow(product);
        }
      }

      const addToCart = document.querySelectorAll(".addToCart");
      const removeFavorite = document.querySelectorAll(".removefavorite");

      // * Thêm sản phẩm yêu thích vào giỏ hàng
      addToCart.forEach((link) =>
        link.addEventListener("click", () => {
          const productID = link.dataset.id;
          handleAddToCart(productID);
        })
      );

      // * Xóa khỏi yêu thích
      removeFavorite.forEach((item) =>
        item.addEventListener("click", () => {
          showModal(
            "Chắc chắn xóa sản phẩm này khỏi danh sách yêu thích",
            () => {
              const id = item.dataset.id;

              const userID = JSON.parse(localStorage.getItem("userID"));
              localStorage.removeItem(`${userID}_${id}`);
              API.delete(
                API.get("favorite"),
                id,
                item,
                ".account-favorite",
                () => showImageEmpty(rdFavorite)
              );
              showToast("success", "Đã xóa khỏi danh sách yêu thích.");
            }
          );
        })
      );
    };

    renderFavorite();
  });

  return `
  <div class="account-title">Sản phẩm yêu thích</div>
    <div class="account-describe">
      Danh sách các sản phẩm mà bạn đã đánh dấu "yêu thích"
    </div>
    <div class="account-hr"></div>
    <div id="rd-favorite"></div>
  `;
}

export default favorite;
