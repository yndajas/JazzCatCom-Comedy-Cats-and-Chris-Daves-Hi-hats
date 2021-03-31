const backendBaseUrl = 'http://localhost:3000/';

if (localStorage.getItem('user')) {
    let user = localStorage.getItem('user');
    // render logged in state
    const text = document.createElement('p');
    text.innerText = `Logged in as ${user}`;
    document.addEventListener('DOMContentLoaded', () => {
        document.body.append(text);
        // remove log in button if present
        renderLogoutButton();
    })
} else {
    // render logged out state
    const text = document.createElement('p');
    text.innerText = `Logged out`;
    document.addEventListener('DOMContentLoaded', () => {
        document.body.append(text);
        // remove log out form if present
        renderLoginForm();
    })
}

function renderLoginForm() {
    const form = document.createElement('form');
    form.id = 'login';
    form.addEventListener('submit', logIn);
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', 'Email');
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', 'Password');
    const submitInput = document.createElement('input');
    submitInput.setAttribute('type', 'submit');
    form.append(emailInput, passwordInput, submitInput);
    document.body.append(form);
}

function logIn(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type=email').value;
    const password = e.target.querySelector('input[type=password]').value;
    fetch(`${backendBaseUrl}sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },        
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(json => {
        localStorage.setItem('user', json.user);
        e.target.remove();
        renderLogoutButton();
    })
}

function renderLogoutButton() {
    const button = document.createElement('button');
    button.id = 'logout'
    button.innerText = 'Log out';
    button.addEventListener('click', logOut);
    document.body.append(button);
}

function logOut(e) {
    fetch(`${backendBaseUrl}sessions`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        localStorage.removeItem('user');
        e.target.remove();
        // render login form/anything else of logged out state?
        renderLoginForm();
    })
}

// document.addEventListener('DOMContentLoaded', )