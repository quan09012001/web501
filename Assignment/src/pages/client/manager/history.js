import Header from "@/components/header";
import layout from "./layout";
import Footer from "@/components/footer";
import API from "@/api";
import { showImageEmpty, useEffect } from "@/util";

const history = () => {
  return `
    ${Header()}
    ${layout(History)}
    ${Footer()}
  `;
};

function History() {
  useEffect(() => {
    const renderHistory = async () => {
      const userID = JSON.parse(localStorage.getItem("userID"));
      const url = `${API.get("order")}?userID=${userID}`;
      const res = await fetch(url);
      const orders = await res.json();

      if (orders.length !== 0) {
      }
    };

    renderHistory();
  });
  return `
  <div class="account-title">Lịch sử giao dịch</div>
    <div class="account-describe">
      Hiển thị tất cả các giao dịch bạn dã thực hiện tại Divine Shop
    </div>
    <div class="account-hr"></div>
    <div class="account-filter account-filter-5">
      <div>
        <input type="text" placeholder="" />
        <label for="">Mô tả</label>
      </div>
      <div>
        <input type="text" placeholder="" />
        <label for="">Số tiền từ</label>
      </div>
      <div>
        <input type="text" placeholder="" />
        <label for="">Số tiền đến</label>
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
    <div class='rd-history'>
    <div class="account-history">
      <div class="account-table">
        <table>
          <thead>
            <tr>
              <th style="min-width: 172px">Thời gian</th>
              <th style="width: 100%">Mô tả</th>
              <th style="min-width: 90px">Số tiền</th>
              <th style="min-width: 90px">Số dư</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-10-15 17:49:22</td>
              <td>Số ID đơn hàng: #826504</td>
              <td style="color: #dc3545">-387.450đ</td>
              <td>14.059.500đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  `;
}

export default history;
