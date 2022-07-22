const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", registerUser);
async function registerUser(e) {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const checkEmail = () => {
    let valid = false;
    const emailEl = email.value.trim();
    if (!isRequired(emailEl)) {
      showError(email, "Email cannot be blank.");
    } else if (!EmailValid(emailEl)) {
      showError(email, "Email is not valid.");
    } else {
      showSuccess(email);
      valid = true;
    }
    return valid;
  };
  const checkPassword = () => {
    let valid = false;
    const passwordEl = password.value.trim();
    if (!isRequired(passwordEl)) {
      showError(password, "Password cannot be blank.");
    } else if (passwordEl.length < 8) {
      showError(password, "Password must has at least 8 characters !");
    } else {
      showSuccess(password);
      valid = true;
    }
    return valid;
  };
  const EmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const isRequired = (value) => (value === "" ? false : true);
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    const error = formGroup.querySelector(".error");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    const error = formGroup.querySelector(".error");
    error.textContent = "";
  };
  e.preventDefault();
  let isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();
  let isFormValid = isEmailValid && isPasswordValid;
  if (isFormValid) {
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }).then((res) => {
      if (res.ok) {
        window.location.href = "/home";
      } else {
        showError(email, "Email or Password not correct !");
        showError(password, "");
      }
    });
    console.log(result);
  }
}


