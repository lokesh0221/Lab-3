const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone = document.getElementById('phone');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateInputs()) {
        // Only set success and redirect if inputs are valid
        setSuccess(email);
        setSuccess(password);
        setSuccess(username);
        setSuccess(phone);
        setSuccess(password2);
        window.location.href = 'index.html';
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidPhone = phoneNumber => {
    const re = /^\d{10}$/; // Accepts 10 digits only
    return re.test(phoneNumber);
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const phoneValue = phone.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (phoneValue === '') {
        setError(phone, 'Phone number is required');
    } else if (!isValidPhone(phoneValue)) {
        setError(phone, 'Provide a valid phone number');
    } else {
        setSuccess(phone);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
    } else {
        setSuccess(password2);
    }

    // Return true only if all validations passed
    return (
        usernameValue !== '' &&
        phoneValue !== '' &&
        isValidPhone(phoneValue) &&
        emailValue !== '' &&
        isValidEmail(emailValue) &&
        passwordValue !== '' &&
        passwordValue.length >= 8 &&
        password2Value !== '' &&
        password2Value === passwordValue
    );
};
