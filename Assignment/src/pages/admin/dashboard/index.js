import Layout from "../layout";

const index = () => {
  return Layout(Dashboard);
};

const Dashboard = () => {
  return `
  <div class="dashboard">
    <div class="dashboard-statistical">
      <div class="dashboard-box">
        <div class="l">
          <h2>28</h2>
          <span>Số lượng sản phẩm</span>
        </div>
        <div class="r">
          <i class="fas fa-box-open"></i>
        </div>
      </div>
      <div class="dashboard-box">
        <div class="l">
          <h2>6</h2>
          <span>Khách hàng</span>
        </div>
        <div class="r">
          <i class="fas fa-user"></i>
        </div>
      </div>
      <div class="dashboard-box">
        <div class="l">
          <h2>6</h2>
          <span>Đơn hàng</span>
        </div>
        <div class="r">
          <i class="fab fa-shopify"></i>
        </div>
      </div>
      <div class="dashboard-box">
        <div class="l">
          <h2 class="l">1.258.237đ</h2>
          <span>Tồng doanh thu</span>
        </div>
        <div class="r">
          <i class="far fa-money-bill-alt"></i>
        </div>
      </div>
    </div>
  </div>
  `;
};

export default index;
