export const Validator = (options) => {
  const formEl = document.querySelector(options.form);

  if (formEl) {
    options.rules.forEach((rule) => {
      const inputEl = formEl.querySelector(rule.selector);
      const errorEl = inputEl.parentNode.nextElementSibling;
      if (inputEl) {
        inputEl.addEventListener("blur", () => {
          let errorMessage = rule.test(inputEl.value);
          if (errorMessage) {
            inputEl.style.borderColor = "rgba(255, 55, 55, 0.58)";
            errorEl.innerText = `${errorMessage}`;
          }
        });

        inputEl.addEventListener("input", () => {
          inputEl.style.borderColor = "rgba(156, 163, 175, 0.25)";
          errorEl.innerText = "";
        });
      }
    });
  }
};

Validator.isRequired = function (selector, message) {
  return {
    selector,
    test(value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này !";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector,
    test(value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email !";
    },
  };
};

Validator.minLength = function (selector, min) {
  return {
    selector,
    test(value) {
      return value.length >= min
        ? undefined
        : `Vui lòng nhập tối thiếu ${min} kí tự!`;
    },
  };
};

Validator.isConfirmPassword = function (selector, getConfirmValue, message) {
  return {
    selector,
    test(value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập vào không chính xác";
    },
  };
};

export const checkEmpty = (inputEl, message = "") => {
  const errorEl = inputEl.parentNode.nextElementSibling;
  if (inputEl.value === "") {
    inputEl.style.borderColor = "rgba(255, 55, 55, 0.58)";
    errorEl.innerText = `Vui lòng nhập trường này !`;
  } else if (message !== "") {
    inputEl.style.borderColor = "rgba(255, 55, 55, 0.58)";
    errorEl.innerText = `${message}`;
  }
  inputEl.addEventListener("input", () => {
    inputEl.style.borderColor = "rgba(156, 163, 175, 0.25)";
    errorEl.innerText = "";
  });

  if (inputEl.value !== "") {
    return true;
  }
};
