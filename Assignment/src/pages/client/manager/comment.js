import Header from "@/components/header";
import layout from "./layout";
import Footer from "@/components/footer";
import { useEffect, getDataByID, showImageEmpty } from "@/util";
import API from "@/api";

const comment = () => {
  return `
    ${Header()}
    ${layout(Comment)}
    ${Footer()}
  `;
};

function Comment() {
  useEffect(() => {
    const rdCommentUser = document.querySelector(".rd-commentUser");

    const renderCommentUser = async () => {
      const userID = JSON.parse(localStorage.getItem("userID"));
      const url = `${API.get("comments")}?userID=${userID}`;
      const res = await fetch(url);
      const listComment = await res.json();

      if (listComment.length === 0) {
        showImageEmpty(document.querySelector(".rd-commentUser"));
      } else {
        let commentList = "";

        for (const comment of listComment) {
          const { productID, time, date, content } = comment;
          commentList += `
          <tr>
            <td>${date} ${time}</td>
            <td>${content}</td>
            <td class="underline" style="cursor: pointer; color: #2579f2">
              <a href="product/${productID}">Chi tiết</a>
            </td>
          </tr>
          `;
        }

        rdCommentUser.innerHTML = `
      <div class="account-filter account-filter-3">
      <div>
        <input type="text" placeholder="" />
        <label for="">Nội dung</label>
      </div>
      <div>
        <input type="date" placeholder="" />
        <label for="">Từ ngày</label>
      </div>
      <div>
        <input type="date" placeholder="" />
        <label for="">Đến ngày</label>
      </div>
    </div>
    <div class="account-table">
      <table>
        <thead>
          <tr>
            <th style="width: 300px">Thời gian</th>
            <th style="width: 435px">Nội dung bình luận</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${commentList}
        </tbody>
      </table>
      `;
      }
    };

    renderCommentUser();
  });

  return `
  <div class="account-title">Bình luận của tôi</div>
    <div class="account-describe">
      Bình luận và trả lời mà bạn đã viết trên Divine Shop
    </div>
    <div class="account-hr"></div>
    <div class="rd-commentUser"></div>
  </div>
  `;
}

export default comment;
