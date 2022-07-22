const myForm = document.querySelector("#myform");
myForm.addEventListener('submit', registerUser)
async function registerUser(e) {
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const cfpassword = document.querySelector("#cfpassword");
    const checkUsername = () => {
    
        let valid = false;
    
        const min = 3,
            max = 10;
        const usernameEl = username.value.trim();
        if (!isRequired(usernameEl)) {
            showError(username, 'Username cannot be blank.');
        } else if (!isBetween(usernameEl.length, min, max)) {
            showError(username, `Username must be between ${min} and ${max} characters.`)
        } else {
            showSuccess(username);
            valid = true;
        }
        return valid;
    };
    const checkEmail = () => {
        let valid = false;
        const emailEl = email.value.trim();
        if (!isRequired(emailEl)) {
            showError(email, 'Email cannot be blank.');
        } else if (!EmailValid(emailEl)) {
            showError(email, 'Email is not valid.')
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
            showError(password, 'Password cannot be blank.');
        } else if (passwordEl.length < 8) {
            showError(password, 'Password must has at least 8 characters !');
        } else {
            showSuccess(password);
            valid = true;
        }
        return valid;
    };
    const checkConfirmPassword = () => {
        let valid = false;
        const cfpasswordEl = cfpassword.value.trim();
        const passwordEl = password.value.trim();
    
        if (!isRequired(cfpasswordEl)) {
            showError(cfpassword, 'Please enter the password again');
        } else if (passwordEl !== cfpasswordEl) {
            showError(cfpassword, 'The password does not match');
        } else {
            showSuccess(cfpassword);
            valid = true;
        }
        return valid;
    };
    const EmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
            const result = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username : username.value,
                    email : email.value,
                    password : password.value,
                    cfpassword: cfpassword.value
                })
            }).then((res) => {
                if (!res.ok) {
                    return showError(email,'Email already exist !')
                } else {
                    window.location.href = '/login'
                }
            }).catch((error) => {
                console.log(error,'error')
            })
            console.log(result)
        };

}
