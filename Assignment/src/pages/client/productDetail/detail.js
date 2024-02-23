import API from "@/api";
import { handleAddToCart } from "@/models/cartModel";
import moment from "moment/moment";
import {
  useEffect,
  router,
  getCategoryName,
  showToast,
  getData,
  getDataByID,
  similarProducts,
  generateUniqueID,
  showModal,
} from "@/util";
import commentRow from "@/components/commentRow";

const Product_Detail = (id) => {
  useEffect(() => {
    // * Hiển thị chi tiết sản phẩm
    const renderProductDetail = async (id) => {
      const productDetail = document.getElementById("product-detail");
      productDetail.innerHTML = await getProductDetail(id);
    };

    renderProductDetail(id).then(() => {
      // * Thêm vào giỏ hàng
      addToCart();

      // * Mua ngay
      addByNow();

      // * Yêu thích
      addFavorite(id);

      // * Các sản phẩm liên quan
      const similarProductEl = document.querySelector(".similarProducts");
      async function renderSimilarProduct(id) {
        const product = await getDataByID(id, "products");
        const { categoryID } = product;
        const listProductSimilar = await similarProducts(categoryID);

        similarProductEl.insertAdjacentHTML("beforeend", listProductSimilar);
      }

      renderSimilarProduct(id);

      // * Bình luận
      const commentSend = document.getElementById("comment-send");
      commentSend.addEventListener("click", () => handleCommentSend(id));
    });

    function addToCart() {
      const btnAddToCart = document.getElementById("addToCart");
      if (!btnAddToCart) return;
      btnAddToCart.addEventListener("click", () => {
        const id = btnAddToCart.dataset.id;
        handleAddToCart(id);
      });
    }

    function addByNow() {
      const btnAddByNow = document.getElementById("byNow");
      if (!btnAddByNow) return;
      btnAddByNow.addEventListener("click", () => {
        const id = btnAddByNow.dataset.id;
        handleAddToCart(id).then(() => {
          router.navigate("/cart");
        });
      });
    }

    function addFavorite(productID) {
      const icon = document.querySelector(".price-new + .svg + .svg");
      const userID = localStorage.getItem("userID");

      const key = JSON.parse(localStorage.getItem(`${userID}_${productID}`));
      if (key) {
        icon.querySelector("svg").classList.add("isFavorite");
      } else {
        icon.querySelector("svg").classList.remove("isFavorite");
      }

      if (userID !== 999) {
        icon.addEventListener("click", () => {
          const svg = icon.querySelector("svg");

          svg.classList.toggle("isFavorite");

          if (svg.classList.contains("isFavorite")) {
            localStorage.setItem(`${userID}_${productID}`, true);
            API.post(API.get("favorite"), { id, userID, productID });

            showToast("success", "Đã thêm sản phẩm vào danh sách yêu thích");
          } else {
            localStorage.removeItem(`${userID}_${productID}`);
            (async () => {
              const data = await getData("favorite");
              const itemToDelete = data.find(
                (item) => item.productID === productID
              );
              const deleteURL = `${API.get("favorite")}/${itemToDelete.id}`;
              return fetch(deleteURL, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            })();

            showToast("error", "Đã xóa sản phẩm khỏi danh sách yêu thích");
          }
        });
      }
    }

    // * Gửi bình luận
    function handleCommentSend(productID) {
      const content = document.querySelector(".comment-content");

      if (content.value !== "") {
        const userID = JSON.parse(localStorage.getItem("userID"));
        const date = moment().format("YYYY-MM-DD");
        const time = moment().format("HH:mm:ss");

        const data = {
          id: generateUniqueID(),
          userID,
          productID,
          date,
          time,
          content: content.value,
        };

        API.post(API.get("comments"), data, () => {
          content.value = "";
          showToast("success", "Gửi bình luận thành công. ");
          renderComment(id);
        });
      } else {
        content.style.borderColor = "rgb(220, 53, 69)";
        content.nextElementSibling.innerHTML =
          "Bạn đang để trống nội dung bình luận!";
      }

      content.addEventListener("input", () => {
        const commentError = document.querySelector(".comment-error");
        if (commentError.innerText !== "") {
          content.style.borderColor = "#ddd";
          commentError.innerHTML = "";
        }
      });
    }

    // * Hiển thị bình luận
    async function renderComment(productID) {
      const rdComment = document.querySelector(".rd-comment");
      if (!rdComment) return;
      rdComment.innerHTML = "";
      const url = `${API.get("comments")}?productID=${productID}`;
      const res = await fetch(url);
      const listComments = await res.json();
      listComments.sort((cm1, cm2) => cm2.id.localeCompare(cm1.id));

      for (const comment of listComments) {
        rdComment.insertAdjacentHTML("beforeend", await commentRow(comment));
      }

      // * Xóa bình luận
      const btnDeleteComments = document.querySelectorAll(".deleteComment");
      for (const btn of btnDeleteComments) {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          showModal("Chắn chắn xóa bình luận này!", () => {
            API.delete(API.get("comments"), id, btn, ".comment-user", () => {
              showToast("success", "Xóa bình luận thành công.");
            });
          });
        });
      }

      // * Sửa bình luận
      const commentEdit = document.querySelectorAll(".editComment");
      commentEdit.forEach((btn) =>
        btn.addEventListener("click", () => {
          const commentEdit = btn.closest(".user-main").nextElementSibling;

          commentEdit.style.display = "flex";

          const close = commentEdit.querySelector(".closeRepCmt");
          close.addEventListener("click", () => {
            commentEdit.style.display = "none";
          });
        })
      );

      document.querySelectorAll(".edit").forEach((btn) =>
        btn.addEventListener("click", async () => {
          const commentEdit = btn.closest(".comment-edit");
          const commentContent = commentEdit.querySelector("#content-comment");
          const commentID = btn.dataset.id;
          const comment = await getDataByID(commentID, "comments");
          const content = commentContent.value;
          const data = { ...comment, content };
          API.put(`${API.get("comments")}/${comment.id}`, data, () => {
            showToast("success", "Cập nhật bình luận thành công.");
            commentEdit.previousElementSibling.querySelector(
              ".content-comment"
            ).innerText = content;
            commentEdit.style.display = "none";
          });
        })
      );

      // * Trả lời bình luận
      const commentSendEl = document.querySelectorAll(".repComment");
      commentSendEl.forEach((btn) =>
        btn.addEventListener("click", () => {
          const commentSend =
            btn.closest(".user-main").nextElementSibling.nextElementSibling;

          commentSend.style.display = "flex";

          const close = commentSend.querySelector(".closeRepCmt");
          close.addEventListener("click", () => {
            commentSend.style.display = "none";
          });
        })
      );

      document.querySelectorAll(".send").forEach((btn) =>
        btn.addEventListener("click", async () => {
          const commentEdit = btn.closest(".comment-send");
          const commentContent = commentEdit.querySelector("#content-send");
          const commentID = btn.dataset.id;
          const userID = JSON.parse(localStorage.getItem("userID"));
          let date = moment().format("YYYY-MM-DD");
          let time = moment().format("HH:mm:ss");
          const content = commentContent.value;
          const data = {
            id: generateUniqueID(),
            commentID,
            userID,
            productID: id,
            date,
            time,
            content,
          };

          API.post(API.get("repComments"), data, () => {
            btn.closest(".comment-send").style.display = "none";
            showToast("success", "Trả lời bình luận thành công!");
          });
        })
      );
    }

    renderComment(id);
  });

  return `
  <div id="product-detail"></div>
  <div class="detail-description">
    <div class="container">
      <div class="detail-ly">
        <div class="detail-note">
          <p><span style="color:#e74c3c"><em><strong>**Lưu Ý:</strong></em></span></p>
          <ul>
            <li><strong>Đơn hàng của quý khách sẽ được xử lý trong vòng tối đa 3h.</strong></li>
            <li><strong>AccountShop sẽ tiến hành đăng nhập vào tài khoản của bạn và nâng cấp.</strong></li>
            <li><strong>Hạn sử dụng của sản phẩm không cộng dồn khi mua số lượng nhiều sản phẩm.</strong></li>
          </ul>
        </div>
        <div class="detail-desc" style="padding: 25px 25px 0 25px">
          <p>Chi tiết sản phẩm</p><p><strong>Creative Fabrica</strong> là một trang web cung cấp hình ảnh đồ hoạ cho các nhà thiết kế đồ họa và phông chữ. Bạn sẽ tìm thấy hơn hai triệu phông chữ chất lượng cao, file định dạng (SVG và DXF), các mẫu thiết kế và font chữ cho Print On Demand (POD) và rất nhiều các hình ảnh đồ thủ công mỹ nghệ.</p>
          <p>Trước khi ra mắt <strong>Creative Fabrica</strong> vào năm 2016, những người đồng sáng lập Anca Stefan và Roemie Hillenaar đã điều hành một đại lý kỹ thuật số. Công ty khởi nghiệp được thành lập để giúp việc tìm kiếm các tệp kỹ thuật số cho các dự án sáng tạo trở nên dễ dàng hơn. Creativefabrica.com bắt đầu như một marketplace, nhưng bây giờ trang web này bao gồm rất nhiều các dự án đã hoàn thành, các công cụ để tạo phông chữ và chữ nghệ thuật, và họ có một gói dịch vụ có tên là Craft Club. Công ty hiện có hơn một triệu người dùng trên khắp thế giới, với khoảng 60% ở Hoa Kỳ và 20% ở Vương quốc Anh, Canada và Úc.</p>
          <p>Nhiều mẫu thiết kế được bán trên <strong>Creative Fabrica</strong> bao gồm giấy phép thương mại và khoảng 35% người dùng chủ động bán các mẫu thiết kế thủ công họ làm. Có một số trang web khác cung cấp ảnh kỹ thuật số cho các nhà chế tác và những nhà thiết kế như Etsy hay Creative Market. Hillenaar cho biết việc quản lý tự động của Creative Fabrica cho phép họ kiểm soát vi phạm bản quyền nhiều hơn so với Etsy, điều này có nghĩa là người dùng được đảm bảo mà không gặp vấn đề về bản quyền. Trong khi Creative Market cũng bán phông chữ, ảnh đồ họa vector và các tệp khác, nó chủ yếu được nhắm mục tiêu đến các nhà xuất bản và những nhà thiết kế trang web. <strong>Creative Fabrica</strong> lại cung cấp các mẫu thiết kế mang tính nghệ thuật.</p>
          <p><strong>Creative Fabrica</strong> cũng tập trung vào toàn bộ quá trình sáng tạo của những nhà sáng tạo. Ví dụ: ai đó muốn trang trí cho bữa tiệc sinh nhật có thể xem qua các dự án được chia sẻ với nền tảng để lấy cảm hứng, tải xuống tài liệu kỹ thuật số và sau đó bắt đầu chế tạo bằng cách sử dụng các hướng dẫn của <strong>Creative Fabrica</strong>. Vì nhiều sản phẩm thủ công của <strong>Creative Fabrica</strong> liên quan đến các thiết bị như máy cắt để bàn hoặc máy may và thêu, nền tảng này cung cấp một loạt hướng dẫn toàn diện để giúp các thợ thủ công trong công việc.</p>
          <p>Chính sách bảo hành</p>
          <hr>
          <h3>Thời gian bảo hành</h3>
          <p>- 30 ngày.</p>
          <h3>Cách thức bảo hành</h3>
          <p>- Đổi đổi sản phẩm mới tương đương hoặc hoàn tiền theo thời gian chưa sử dụng.</p>
          <p>-&nbsp;Trong trường hợp hết hàng để đổi mới, hoàn tiền theo quy tắc:</p>
          <ul>
          <li>&nbsp;&nbsp; &nbsp;• Dưới 7 ngày: Hoàn 100% giá trị đơn hàng</li>
          <li>&nbsp;&nbsp; &nbsp;• Sau 7 ngày: Hoàn tiền theo theo thời gian chưa sử dụng (VD gói 1 tháng&nbsp;nếu sử dụng được 15 ngày&nbsp;phát sinh lỗi thì sẽ được hoàn lại 50% giá trị đơn hàng)</li>
          </ul>
          <p>Câu hỏi thường gặp</p>
          <hr>
          <h3>1. Tôi có thể mua số lượng 2 và nhận 1 tài khoản có thời hạn là 2 tháng không?</h3>

          <p>Không! Hiện tại shop chỉ bán tài khoản có thời hạn là 1 tháng.</p>

          <h3>2. Tôi có được đổi mật khẩu của tài khoản để bảo mật thông tin không?</h3>

          <p>Có! Bạn được đổi mật khẩu của tài khoản.</p>

          <h3>3. Khi thanh toán xong tôi phải chờ bao lâu thì sẽ nhận được tài khoản?</h3>

          <p>Tài khoản sẽ được gửi ngay sau khi bạn thanh toán xong!</p>
        </div>
      </div>
    </div>
  </div>
  <div class="comment">
    <div class="container">
      <div class="comment-title">Bình luận</div>
      <div class="comment-desc">Thời gian phản hồi trung bình: 5 phút!</div>
      <textarea
        class="comment-content"
        placeholder="Nhập nội dung bình luận"
      ></textarea>
      <div class="comment-error"></div>
      <div class="comment-btn">
        <button id="comment-login">
          <svg
            class="od Cb Da"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
            ></path>
          </svg>
          <a>Đăng nhập để bình luận</a>
        </button>
      </div>
      <div class="rd-comment"></div>
    </div>
  </div>
  <div class="detail-related">
    <div class="container">
      <h3>Các sản phẩm liên quan</h3>
      <div class="similarProducts"></div>
    </div>
  </div>
  `;
};

async function getProductDetail(id) {
  const url = `${API.get("products")}?id=${id}`;
  const res = await fetch(url);
  const product = await res.json();

  for (let ob of product) {
    const { productName, image, discount, price, inventory, categoryID } = ob;

    const categoryName = await getCategoryName(categoryID);
    const priceOld = price.toLocaleString("vi-VN");
    const priceNew = (price - (price * discount) / 100).toLocaleString("vi-VN");

    let discountHTML = "";
    let priceOldHTML = "";
    let statusProduct = "";
    let detailBtns = "";

    if (discount > 0) {
      discountHTML = `<div class="product-discount">-${discount}%</div>`;
      priceOldHTML = `<div class="price-old">${priceOld + "đ"}</div>`;
    }

    let priceNewHTML = `<div class="price-new">${priceNew}đ</div>`;
    inventory !== 0
      ? (statusProduct = "<span class='status-color'>Còn hàng</span>")
      : (statusProduct =
          "<span class='status-color' style='color: #e13848'>Hết hàng</span>");

    if (inventory > 0) {
      detailBtns = `
      <div class="detail-btn">
        <div id="byNow" class="btn btn--primary" data-id="${id}">
          <div class="svg">
            <svg
              class="od Cb Da"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"
              ></path>
            </svg>
            Mua ngay
          </div>
        </div>
        <div id="addToCart" class="btn btn--border" data-id="${id}">
          <div class="svg">
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
          </div>
        </div>
      </div>
      `;
    } else {
      detailBtns = `
      <div class="btn btn--primary" style="display: inline-block; margin-top: 11px; border-radius: 5px; cursor: pointer">
        <div class="svg" style="display: flex; align-items: center; gap: 8px; padding: 12px 20px;">
          <svg class="od Cb Da" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>
          Thông báo khi có hàng
        </div>
      </div>
      `;
    }

    return `
    <!-- detail -->
    <div class="detail">
      <div class="container">
        <div class="detail-layout">
          <!-- image -->
          <div class="detail-image">
            <img
              src="${image}"
              alt=""
            />
            <a
              style="
                display: block;
                color: #2579f2;
                font-weight: 500;
                margin-top: 14px;
                text-align: center;
              "
              >Xem thêm ảnh</a
            >
          </div>
          <!-- detail info -->
          <div class="detail-info">
            <h1 class="detail-name">${productName}</h1>
            <div class="detail-status">
              <div>
                <div class="svg">
                  <svg
                    class="od Cb Da"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-1.6 4.9-2.5 10-2.5 15.2V464c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V199.8c0-5.2-.8-10.3-2.5-15.2zM32 199.8c0-1.7.3-3.4.8-5.1L83.4 42.9C85.6 36.4 91.7 32 98.6 32H240v168H32v-.2zM480 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V232h448v232zm0-264H272V32h141.4c6.9 0 13 4.4 15.2 10.9l50.6 151.8c.5 1.6.8 3.3.8 5.1v.2z"
                    ></path>
                  </svg>
                  Tình trạng:
                </div>
                ${statusProduct}
              </div>
            </div>
            <div class="detail-status">
              <div>
                <div class="svg">
                  <svg
                    class="od Cb Da"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.745 18.745 49.137 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zm-22.627 45.255L271.196 475.314c-6.243 6.243-16.375 6.253-22.627 0L36.686 263.431A15.895 15.895 0 0 1 32 252.117V48c0-8.822 7.178-16 16-16h204.118c4.274 0 8.292 1.664 11.314 4.686l211.882 211.882c6.238 6.239 6.238 16.39 0 22.628zM144 124c11.028 0 20 8.972 20 20s-8.972 20-20 20-20-8.972-20-20 8.972-20 20-20m0-28c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
                    ></path>
                  </svg>
                  Thể loại:
                </div>
                <span>${categoryName}</span>
              </div>
            </div>
            <div class="detail-price">
              <div>
                ${priceNewHTML}
                <div class="svg">
                  <svg
                    class="od Hb Ba ie"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                    ></path>
                  </svg>
                </div>
                <div class="svg" style="cursor: pointer">
                  <svg
                    class="od Hb Ba ie"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                ${priceOldHTML}
                ${discountHTML}
              </div>
            </div>
            ${detailBtns}
          </div>
          <!-- detai other -->
          <div class="detail-other">
            <h4>Giới thiệu bạn bè</h4>
            <p>
              Bạn bè được giảm 5% giá sản phẩm và bạn nhận hoa hồng vĩnh viễn.
            </p>
            <div>
              <input
                type="text"
                value="https://kanisdevshop.vn/tai-khoan-netflix-1-thang"
              />
              <div class="btn">
                <svg
                  class="od Cb Da"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
                  ></path>
                </svg>
              </div>
              <div class="btn">
                <svg
                  class="od Cb Da"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M414.9 31.11L270.9 495.1C266.1 507.8 253.5 514.8 240.9 510.9C228.2 506.1 221.1 493.5 225.1 480.9L369.1 16.89C373 4.226 386.5-2.852 399.1 1.077C411.8 5.006 418.9 18.45 414.9 31.11V31.11zM504.4 118.5L632.4 238.5C637.3 243 640 249.4 640 255.1C640 262.6 637.3 268.1 632.4 273.5L504.4 393.5C494.7 402.6 479.6 402.1 470.5 392.4C461.4 382.7 461.9 367.6 471.6 358.5L580.9 255.1L471.6 153.5C461.9 144.4 461.4 129.3 470.5 119.6C479.6 109.9 494.7 109.4 504.4 118.5V118.5zM168.4 153.5L59.09 255.1L168.4 358.5C178.1 367.6 178.6 382.7 169.5 392.4C160.4 402.1 145.3 402.6 135.6 393.5L7.585 273.5C2.746 268.1 0 262.6 0 255.1C0 249.4 2.746 243 7.585 238.5L135.6 118.5C145.3 109.4 160.4 109.9 169.5 119.6C178.6 129.3 178.1 144.4 168.4 153.5V153.5z"
                  ></path>
                </svg>
              </div>
            </div>
            <a
              style="
                display: block;
                color: #2579f2;
                font-weight: 500;
                margin-top: 14px;
              "
              >Xem chi tiết</a
            >
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default Product_Detail;
