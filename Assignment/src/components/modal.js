const colors = {
  success: "#0abf30",
  error: "#e24d4c",
  warning: "#e9bd0c",
  info: "#3498db",
};

const Modal = (content) => {
  return `
  <div class="modal-confirm">
    <div class="modal-title">Thông báo !</div>
    <div class="modal-contentConfirm" style="color: rgb(51, 51, 51);">${content}</div>
    <div class="modal-btn">
      <a class="modal-link-confirm">Xác nhận</a>
      <a class="modal-link-cancel">Hủy bỏ</a>
    </div>
  </div>
  `;
};

export default Modal;
