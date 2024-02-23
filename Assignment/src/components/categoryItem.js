const CategoryItem = (category) => {
  const { id, categoryName } = category;
  return `
    <tr>
      <td>${id}</td>
      <td>${categoryName}</td>
      <td>
        <div>
          <a class="edit" data-id="${id}">Sửa <ion-icon name="create-outline" role="img" class="md hydrated"></ion-icon></a>
          <a class="delete" data-id="${id}">Xóa <ion-icon name="close-outline" role="img" class="md hydrated"></ion-icon></a>
        </div>
      </td>
    </tr>
  `;
};

export default CategoryItem;
