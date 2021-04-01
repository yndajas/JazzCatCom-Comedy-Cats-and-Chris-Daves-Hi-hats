class App {
    constructor() {
        this.user = localStorage.getItem('user');
        this.backendBaseUrl = 'http://localhost:3000/';
    }

    renderSessionElements() {
        if (this.user) {
            this.renderUserInfo();
            this.renderLogoutButton();
        } else {
            this.removeUserInfo();
            this.renderLoginForm();
        }
    }

    getUserInfoContainer() {
        return document.querySelector('div#user-info');
    }

    renderUserInfo() {
        const container = this.getUserInfoContainer();
        const p = document.createElement('p');
        p.innerText = `Logged in as ${this.user}`;
        container.append(p);
    }

    removeUserInfo() {
        const container = this.getUserInfoContainer();
        container.innerHTML = "";
    }

    getSessionControlContainer() {
        return document.querySelector('div#session-control');
    }

    renderLoginForm() {
        const container = this.getSessionControlContainer();

        const form = document.createElement('form');
        form.id = 'login';
        form.addEventListener('submit', e => this.logIn(e));

        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('placeholder', 'Email');
        
        const passwordInput = document.createElement('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('placeholder', 'Password');
        
        const submitInput = document.createElement('input');
        submitInput.setAttribute('type', 'submit');
        
        form.append(emailInput, passwordInput, submitInput);
        
        container.innerHTML = '';
        container.append(form);
    }

    renderLogoutButton() {
        const container = this.getSessionControlContainer();

        const button = document.createElement('button');
        button.id = 'logout'
        button.innerText = 'Log out';
        button.addEventListener('click', e => this.logOut(e));

        container.innerHTML = '';
        container.append(button);
    }

    logIn(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type=email').value;
        const password = e.target.querySelector('input[type=password]').value;
        fetch(`${this.backendBaseUrl}sessions`, {
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
            this.user = json.user;
            this.renderSessionElements();
        })
    }

    logOut(e) {
        fetch(`${this.backendBaseUrl}sessions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            localStorage.removeItem('user');
            this.user = null;
            this.renderSessionElements();
        })
    }
}

const app = new App;
document.addEventListener('DOMContentLoaded', () => app.renderSessionElements());