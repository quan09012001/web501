import { getDataByID } from "@/util";

const commentRow = async (comment) => {
  const getUserID = JSON.parse(localStorage.getItem("userID"));
  const { id, userID, date, time, content, productID } = comment;
  const user = await getDataByID(userID, "account");
  const user1 = await getDataByID(getUserID, "account");

  let control = "";

  let btnUser = `
  <div class="control">
    <a class="editComment" data-id="${id}" style="color: #2579f2; padding: 0;">Sửa bình luận</a>
    <a class="deleteComment" data-id="${id}" style="color: #dc3545; padding: 0; margin-left: 15px;">Xóa</a>
  </div>
  `;

  let btnGuest = `
  <div class="control">
    <a class="repComment" data-userID="${userID}" style="color: #2579f2; padding: 0;">Trả lời</a>
  </div>
  `;

  getUserID === userID ? (control = btnUser) : (control = btnGuest);

  return `
  <div class="comment-user">
    <div class="user-main">
      <div class="user-avatar">
        <img src="${user.avatar}" alt="">
      </div>
      <div class="user-info">
        <h3 style="display: flex; align-items: center; gap: 10px">${user.fullname}</h3>
        <span>Bình luận vào ${date} ${time}</span>
        <div class="user-contentCm content-comment">${content}</div>
        <div class="control">${control}</div>
      </div>
    </div>
    <div class="comment-edit">
      <div class=" img2">
        <img src="${user.avatar}" alt="">
      </div>
      <div class="send-tag">
        <input type="text" value="${content}" id="content-comment">
        <div class="icon edit" table="comment" data-id="${id}">
          <svg class="od Db wa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
          </svg>
        </div>
      </div>
      <span class="closeRepCmt" style="font-size: 23px; color: #dc3545; cursor: pointer;"><ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon></span>
    </div>
    <div class="comment-send">
      <div class=" img2">
        <img src="${user1.avatar}" alt="">
      </div>
      <div class="send-tag">
        <input type="text" value="@${user.fullname} " id="content-send">
        <div class="svg send" data-id="${id}" data-userID="${user.id}">
          <svg class="od Db wa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
          </svg>
        </div>
      </div>
      <span class="closeRepCmt" style="font-size: 23px; color: #dc3545; cursor: pointer;"><ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon></span>
    </div>
  </div>
  `;
};

export default commentRow;
