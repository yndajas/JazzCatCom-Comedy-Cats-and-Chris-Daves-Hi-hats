const backendBaseUrl = 'http://localhost:3000/';

if (localStorage.getItem('user')) {
    let user = localStorage.getItem('user');
    // render logged in state
    const text = document.createElement('p');
    text.innerText = `Logged in as ${user}`;
    document.addEventListener('DOMContentLoaded', () => {
        document.body.append(text);
    })
} else {
    // render logged out state
    const text = document.createElement('p');
    text.innerText = `Logged out`;
    document.addEventListener('DOMContentLoaded', () => {
        document.body.append(text);
    })
    renderLoginForm();
}

function renderLoginForm() {
    const form = document.createElement('form');
    form.id = 'login';
    form.addEventListener('submit', postSession);
    // add form elements
}

function postSession(e) {
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
    .then(json => localStorage.setItem('user', json.user))
}

function logOut() {
    fetch(`${backendBaseUrl}sessions`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        localStorage.removeItem('user');
        // render login form/anything else of logged out state?
    })
}

// document.addEventListener('DOMContentLoaded', )