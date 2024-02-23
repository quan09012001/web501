const toastDetails = {
  success: {
    icon: "fa-solid fa-circle-check",
  },
  error: {
    icon: "fa-solid fa-circle-xmark",
  },
  warning: {
    icon: "fa-solid fa-triangle-exclamation",
  },
  info: {
    icon: "fa-solid fa-circle-info",
  },
};

function removeToast(toast) {
  toast.classList.add("hidden");
  setTimeout(() => {
    toast.remove();
  }, 500);
}

const Toast = (id, text) => {
  const { icon } = toastDetails[id];
  const toast = document.createElement("li");
  toast.className = `toast ${id}`;
  toast.innerHTML = `
  <div class="column">
    <i class="${icon}"></i>
    <span>${text}</span>
  </div>
  <i class="fa-solid fa-xmark" id="close-toast"></i>
  `;

  const closeButton = toast.querySelector("#close-toast");
  closeButton.addEventListener("click", () => removeToast(toast));

  setTimeout(() => {
    removeToast(toast);
  }, 5000);

  return toast;
};

export default Toast;
