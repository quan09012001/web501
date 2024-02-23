// Import
import Home_Page from "./pages/client/home";
import Product_Detail_Page from "./pages/client/productDetail";
import Cart_Page from "./pages/client/cart";
import NotFound_Page from "./pages/client/notFound";
import Dashboard_Page from "./pages/admin/dashboard";
import Category_Add from "./pages/admin/category/add";
import Category_List from "./pages/admin/category/list";
import Category_Edit from "./pages/admin/category/edit";
import Product_List from "./pages/admin/product/list";
import Order_List from "./pages/admin/order/list";
import Order_Detail from "./pages/admin/order/detail";
import Comment_List from "./pages/admin/comment/list";
import Statistical from "./pages/admin/statistical";
import Filter_Page from "./pages/client/filter";
import Account_Manager from "./pages/client/manager/account";
import Order_Manager from "./pages/client/manager/order";
import OrderDetail_Manager from "./pages/client/manager/orderDetail";
import Password_Manager from "./pages/client/manager/password";
import Favorite_Manager from "./pages/client/manager/favorite";
import Comment_Manager from "./pages/client/manager/comment";
import History_Manager from "./pages/client/manager/history";
import { loadBase } from "./models/baseModel";
import { render, router } from "./util";

const app = document.getElementById("app");

// Router Client
router.on("/", () => render(Home_Page, app));
router.on("/product/:id", ({ data }) =>
  render(() => Product_Detail_Page(data), app)
);
router.on("/cart", () => render(Cart_Page, app));
router.on("/filter", () => render(Filter_Page, app));
router.on("/account", () => render(Account_Manager, app));
router.on("/order", () => render(Order_Manager, app));
router.on("/order/:id", ({ data }) =>
  render(() => OrderDetail_Manager(data), app)
);
router.on("/password", () => render(Password_Manager, app));
router.on("/favorite", () => render(Favorite_Manager, app));
router.on("/comment", () => render(Comment_Manager, app));
router.on("/history", () => render(History_Manager, app));

// Router Admin
router.on("/admin", () => render(Dashboard_Page, app));
router.on("/admin/categoryAdd", () => render(Category_Add, app));
router.on("/admin/categoryList", () => render(Category_List, app));
router.on("/admin/categoryEdit/:id", ({ data }) =>
  render(() => Category_Edit(data), app)
);
router.on("/admin/productList", () => render(Product_List, app));
router.on("/admin/orderList", () => render(Order_List, app));
router.on("/admin/orderDetail/:id", ({ data }) =>
  render(() => Order_Detail(data), app)
);
router.on("/admin/comment", () => render(Comment_List, app));
router.on("/admin/statistical", () => render(Statistical, app));

// NotFound Page
router.notFound(() => render(NotFound_Page, app));

router.resolve();

loadBase();
