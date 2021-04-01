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
            this.renderSessionControlForm();
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

    renderSessionControlForm() {
        const container = this.getSessionControlContainer();

        const form = document.createElement('form');
        form.id = 'session-control';
        form.addEventListener('submit', (e) => e.preventDefault())

        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('placeholder', 'Email');
        
        const passwordInput = document.createElement('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('placeholder', 'Password');
        
        const logInButton = document.createElement('button');
        logInButton.id = 'log-in';
        logInButton.innerText = 'Log in';
        logInButton.addEventListener('click', () => this.logIn(form));

        const registerButton = document.createElement('button');
        registerButton.id = 'register';
        registerButton.innerText = 'Register';
        registerButton.addEventListener('click', () => this.register(form));
        
        form.append(emailInput, passwordInput, logInButton, registerButton);
        
        container.innerHTML = '';
        container.append(form);
    }

    renderLogoutButton() {
        const container = this.getSessionControlContainer();

        const button = document.createElement('button');
        button.id = 'log-out'
        button.innerText = 'Log out';
        button.addEventListener('click', e => this.logOut(e));

        container.innerHTML = '';
        container.append(button);
    }

    getEmailAndPassword(form) {
        return {
            email: form.querySelector('input[type=email').value,
            password: form.querySelector('input[type=password]').value
        }
    }

    register(form) {
        console.log("register method reached");
    }

    logIn(form) {
        this.logInOrRegister('logIn', form)
    }

    logInOrRegister(action, form) {
        const path = (action === 'register') ? 'users' : 'sessions';
        fetch(`${this.backendBaseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },        
            body: JSON.stringify(this.getEmailAndPassword(form))
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