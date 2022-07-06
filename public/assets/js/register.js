const myForm = document.querySelector("#myform");
const usernameEl = document.querySelector("#fullname");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const cfpasswordEl = document.querySelector("#cfpassword")



const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const cfpassword = cfpasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(cfpassword)) {
        showError(cfpasswordEl, 'Please enter the password again');
    } else if (password !== cfpassword) {
        showError(cfpasswordEl, 'The password does not match');
    } else {
        showSuccess(cfpasswordEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    const error = formGroup.querySelector('.error');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    const error = formGroup.querySelector('.error');
    error.textContent = '';
}
myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        let form = e.currentTarget;
        let url = form.action;
        try {
          let formData = new FormData(form);
          let responseData = await postFormFieldsAsJson({ url, formData });
          let { serverDataResponse } = responseData;
          console.log(serverDataResponse);
        } catch (error) {
          console.error(error);
        }
    }

});

async function postFormFieldsAsJson({ url, formData }) {
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataJsonString = JSON.stringify(formDataObject);
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };
  let res = await fetch(url, fetchOptions);
  if (!res.ok) {
      let error = await res.text();
      throw new Error(error);
} else {
    window.location.href = "/views/login"
  }
  return res.json();
  
}

