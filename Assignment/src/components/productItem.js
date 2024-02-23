const ProductItem = (product) => {
  const { id, productName, image, price, discount, inventory } = product;
  const priceOld = price.toLocaleString("vi-VN");
  const priceNew = (price - (price * discount) / 100).toLocaleString("vi-VN");
  const isInventory = inventory === 0 ? "isInven" : "";
  let discountHTML = "";
  let priceOldHTML = "";
  let priceNewHTML = `<div class="price-new">${priceNew}đ</div>`;
  if (discount > 0) {
    discountHTML = `<div class="product-discount">-${discount}%</div>`;
    priceOldHTML = `<div class="price-old">${priceOld + "đ"}</div>`;
  }

  return `
  <div class="product-item ${isInventory}">
    <div class="product-image">
      <img
        src="${image}"
        alt=""
      />
    </div>
    <a href="/product/${id}" class="product-name underline">${productName}</a>
    <div class="product-other">
      ${priceNewHTML}
      ${priceOldHTML}
      ${discountHTML}
    </div>
  </div>
  `;
};

export default ProductItem;
