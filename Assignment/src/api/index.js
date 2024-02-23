const urlBase = "http://localhost:3000";
const listAPI = {
  categories: `${urlBase}/categories`,
  products: `${urlBase}/products`,
  slider: `${urlBase}/slider`,
  account: `${urlBase}/account`,
  order: `${urlBase}/order`,
  orderDetail: `${urlBase}/orderDetail`,
  favorite: `${urlBase}/favorite`,
  comments: `${urlBase}/comments`,
  repComments: `${urlBase}/repComments`,
};

const API = {
  get(url) {
    return listAPI[url];
  },
  post(url, data, callback) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      if (callback !== "" && typeof callback === "function") {
        callback();
      }
    });
  },
  put(url, data, callback) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      if (callback !== "" && typeof callback === "function") {
        callback();
      }
    });
  },
  delete(url, id, node, parent = "tr", callback) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      node.closest(parent).remove();
      if (callback !== "" && typeof callback === "function") {
        callback();
      }
    });
  },
};

export default API;
