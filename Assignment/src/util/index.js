import Navigo from "navigo";
import ProductItem from "@/components/productItem";
import CategoryItem from "@/components/categoryItem";
import { ProductRow } from "@/components/productRow";
import Modal from "@/components/modal";
import Toast from "@/components/toast";
import API from "@/api";

export const router = new Navigo("/", { linksSelector: "a" });

let effects = [];
let currentEffectOrder = 0;

let rootComponent = null;
let rootContainer = null;

let states = [];
let currentStateOrder = 0;

export const render = (component, container) => {
  container.innerHTML = component();

  rootComponent = component;
  rootContainer = container;

  effects.forEach((effect) => {
    effect.cb();
  });
};

const debounce = (fn, timeout = 100) => {
  let timeId = null;

  return (...rest) => {
    if (timeId) clearTimeout(timeId);

    timeId = setTimeout(() => fn(...rest), timeout);
  };
};

const rerender = debounce(() => {
  currentStateOrder = 0;
  currentEffectOrder = 0;
  rootContainer.innerHTML = rootComponent();

  effects.forEach((effect) => {
    // shouldRunEffect = true khi không truyền deps hoặc deps khác nhau
    const shouldRunEffect =
      !effect.nextDeps ||
      effect.nextDeps?.some((dep, i) => {
        return dep !== effect?.prevDeps?.[i];
      });

    if (shouldRunEffect) {
      effect.cb();
    }
  });
});

export const useState = (initialState) => {
  let state;
  let stateOrder = currentStateOrder;

  if (states[stateOrder] !== undefined) {
    state = states[stateOrder];
  } else {
    state = states[stateOrder] = initialState;
  }

  const updater = (newState) => {
    if (newState === undefined) {
      throw new Error("New state must not be undefined");
    }

    states[stateOrder] =
      typeof newState === "function" ? newState(states[stateOrder]) : newState;

    rerender();
  };

  currentStateOrder++;

  return [state, updater];
};

export const useEffect = (cb, deps) => {
  let effectOrder = currentEffectOrder;

  if (!effects[effectOrder]) {
    effects.push({
      cb: cb,
      prevDeps: null,
      nextDeps: deps,
    });
  } else {
    effects[effectOrder] = {
      cb: cb,
      prevDeps: effects[effectOrder].nextDeps,
      nextDeps: deps,
    };
  }

  currentEffectOrder++;
};

router.on("/*", () => {}, {
  before(done, match) {
    states = [];
    currentStateOrder = 0;
    effects = [];
    currentEffectOrder = 0;

    done();
  },
});

// * Lấy danh sách
export const getList = async (
  page,
  limit,
  table,
  template = table,
  ...params
) => {
  // handle url api
  let url = `${API.get(table)}?_page=${page}&_limit=${limit}`;
  if (params !== "") {
    for (let param of params) {
      if (typeof param === "object") {
        for (let key in param) {
          url += `&${key}=${param[key]}`;
        }
      }
    }
  }

  // empty html
  let html = "";

  const res = await fetch(url);
  const data = await res.json();

  // loop data
  for (const item of data) {
    switch (template) {
      case "products":
        html += ProductItem(item);
        break;
      case "categories":
        html += CategoryItem(item);
        break;
      case "productRow":
        html += ProductRow(item);
        break;
      default:
        break;
    }
  }

  return html;
};

// * Xem thêm
export const handleLoadMore = async (
  node,
  callback,
  table,
  limit = 8,
  seeMorePage = 1
) => {
  node.addEventListener("click", async () => {
    seeMorePage++;
    callback(seeMorePage);

    (await fetch(`${API.get(table)}`)).json().then((data) => {
      const pageNumber = Math.floor(data.length / limit);
      if (seeMorePage >= pageNumber) {
        node.style.display = "none";
      }
    });
  });
};

// * Sản phẩm tương tự
export const similarProducts = async (categoryID, page = 1) => {
  return getList(page, 4, "products", "products", { categoryID });
};

// * Lấy ra tên danh mục từ categoryID
export const getCategoryName = async (categoryID) => {
  const url = `${API.get("categories")}?id=${categoryID}`;
  const res = await fetch(url);
  const data = await res.json();
  for (let category of data) {
    return category["categoryName"];
  }
};

// * lấy dữ liệu theo id & table
export const getDataByID = async (id, table) => {
  const url = `${API.get(table)}/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

// * lấy dữ liệu theo table
export const getData = async (table) => {
  const url = API.get(table);
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

// * Xử lý phóng to hình ảnh
export const handleZoomImage = (node) => {
  node.addEventListener("click", () => {
    node.classList.toggle("isZoom");
    if (node.classList.contains("isZoom")) {
      node.addEventListener("mousemove", (e) => {
        const size = node.getBoundingClientRect();
        const { x, y, width, height } = size;

        const px = ((e.clientX - x) / width) * 100;
        const py = ((e.clientY - y) / height) * 100;

        node.style.setProperty("--px", `${px}%`);
        node.style.setProperty("--py", `${py}%`);
      });
      node.addEventListener("mouseleave", (e) => {
        node.classList.remove("isZoom");
      });
    }
  });
};

// * Xử lý modal
function handlerModal(callback) {
  let confirmFlag = false;

  let confirmBtn = document.querySelector(".modal-link-confirm");
  let cancelBtn = document.querySelector(".modal-link-cancel");

  confirmBtn.addEventListener("click", function () {
    confirmFlag = true;
    callback(confirmFlag);
  });

  cancelBtn.addEventListener("click", function () {
    confirmFlag = false;
    callback(confirmFlag);
  });
}

// * Hiển thị modal
export const showModal = (content, callback) => {
  const app = document.getElementById("app");
  app.insertAdjacentHTML("beforeend", Modal(content));
  const modal = document.querySelector(".modal-confirm");
  handlerModal((confirmFlag) => {
    if (confirmFlag) {
      callback();
      modal.remove();
    } else {
      modal.remove();
    }
  });
};

// * Hiển thị toast
export const showToast = (id, text) => {
  const app = document.getElementById("app");
  if (!app.querySelector(".notification")) {
    const notification = document.createElement("ul");
    notification.className = "notification";
    app.insertAdjacentElement("beforeend", notification);
  }
  const notificationEl = document.querySelector(".notification");
  notificationEl.append(Toast(id, text));
};

// Gửi email
export const sendMail = (
  toEmail,
  name,
  content,
  templateID = "template_4mp6p28",
  serviceID = "service_45kth1n"
) => {
  const params = {
    to_email: toEmail,
    name: name,
    content: content,
  };

  emailjs.init("PvGLDWMBWOSqCtavO");

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const randomNumber = () => {
  let randomNumber = "";
  for (let i = 0; i < 6; i++) {
    const digit = Math.floor(Math.random() * 10);
    randomNumber += digit;
  }
  return randomNumber;
};

export const showImageEmpty = (node) => {
  return (node.innerHTML = `<img style="width: 232.7px; height: 252px;" src="https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg" alt="">`);
};

export const generateUniqueID = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};
