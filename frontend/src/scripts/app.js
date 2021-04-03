class App {
    constructor() {
        this.user = localStorage.getItem('user');
        this.backendBaseUrl = 'http://localhost:3000/';
    }

    renderSessionElements() {
        if (this.user) {
            this.renderNavElements();
            this.renderLogoutButton();
            this.renderUserInfo();
        } else {
            this.removeNavElements();
            this.renderSessionControlForm();
            this.removeUserInfo();
        }
    }

    getNavElements() {
        return document.querySelector('ul#nav-elements');
    }

    renderNavElements() {
        const elementsContainer = this.getNavElements();

        ["I'm feeling...", "Jazz", "Cats", "Comedy"].forEach(element => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.innerText = element;
            li.append(a);
            elementsContainer.append(li);
        })
    }

    removeNavElements() {
        const container = this.getNavElements();
        container.innerHTML = "";
    }

    getSessionControlContainer() {
        return document.querySelector('ul#session-control');
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
        logInButton.className = 'btn btn-primary';
        logInButton.innerText = 'Log in';
        logInButton.addEventListener('click', () => this.logIn(form));

        const registerButton = document.createElement('button');
        registerButton.id = 'register';
        registerButton.innerText = 'Register';
        registerButton.className = 'btn btn-success';
        registerButton.addEventListener('click', () => this.register(form));

        const spaces = [];
        for (let i = 0; i < 3; i++) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            spaces.push(space);
        }

        form.append(emailInput, spaces[0], passwordInput, spaces[1], logInButton, spaces[2], registerButton);
        
        container.innerHTML = '';
        container.append(form);
    }

    renderLogoutButton() {
        const container = this.getSessionControlContainer();

        const button = document.createElement('button');
        button.id = 'log-out'
        button.innerText = 'Log out';
        button.className = 'btn btn-primary';
        button.addEventListener('click', e => this.logOut(e));

        container.innerHTML = '';
        container.append(button);
    }

    getUserInfoContainer() {
        return document.querySelector('ul#user-info');
    }

    renderUserInfo() {
        const container = this.getUserInfoContainer();
        const li = document.createElement('li');
        li.className = 'nav-item';
        const span = document.createElement('span');
        span.className = 'navbar-text';
        span.innerText = `Logged in as ${this.user}`;
        li.append(span);
        container.append(li);
    }

    removeUserInfo() {
        const container = this.getUserInfoContainer();
        container.innerHTML = "";
    }

    getEmailAndPassword(form) {
        return {
            email: form.querySelector('input[type=email').value,
            password: form.querySelector('input[type=password]').value
        }
    }

    renderCopyright() {
        const container = document.querySelector('ul#copyright');
        const li = document.createElement('li');
        li.className = 'nav-item';
        const span = document.createElement('span');
        span.className = 'navbar-text';
        const year = new Date().getFullYear();
        span.innerText = `© Ynda Jas ${year}`
        li.append(span);
        container.append(li);
    }

    register(form) {
        this.logInOrRegister('register', form);
    }

    logIn(form) {
        this.logInOrRegister('logIn', form);
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
            if (json.error) {
                window.alert(json.error);
            } else {
                localStorage.setItem('user', json.user);
                this.user = json.user;
                this.renderSessionElements();    
            }
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
document.addEventListener('DOMContentLoaded', () => {
    app.renderSessionElements();
    app.renderCopyright();
});