const CartItem = (product) => {
  const { id, productName, image, price, discount, quantity } = product;
  const priceOld = price.toLocaleString("vi-VN");
  const priceNew = (price - (price * discount) / 100).toLocaleString("vi-VN");

  return `
  <div class="cart-item">
    <div class="cart-image">
      <img src="${image}" />
    </div>
    <div class="cart-info">
      <div class="cart-group">
        <div class="cart-row">
          <a href="/product/${id}" class="name underline">${productName}</a>
        </div>
        <div class="cart-row cart-quantity">
          <div class="div">
            <span class="changeQuantity" data-id="${id}" data-dir="minus">-</span>
            <span class="product-quantity">${quantity}</span>
            <span class="changeQuantity" data-id="${id}" data-dir="plus">+</span>
          </div>
        </div>
        <div class="cart-row cart-price">
          <div class="price-new">${priceNew}đ</div>
          <div class="cart-flex">
            <div class="product-discount">-${discount}%</div>
            <div class="price-old">${priceOld}đ</div>
          </div>
        </div>
      </div>
      <div class="cart-bot">
        <div>
          <div class="svg">
            <svg
              class="od Cb Da w17c5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-1.6 4.9-2.5 10-2.5 15.2V464c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V199.8c0-5.2-.8-10.3-2.5-15.2zM32 199.8c0-1.7.3-3.4.8-5.1L83.4 42.9C85.6 36.4 91.7 32 98.6 32H240v168H32v-.2zM480 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V232h448v232zm0-264H272V32h141.4c6.9 0 13 4.4 15.2 10.9l50.6 151.8c.5 1.6.8 3.3.8 5.1v.2z"
              ></path>
            </svg>
          </div>
          <h4>Tình trạng: <span>Còn hàng</span></h4>
        </div>
        <div class="cart-delete" data-id="${id}">
          <div class="svg">
            <svg
              class="od Cb Da w17c5"
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
    </div>
  </div>
  `;
};

export default CartItem;
