class App {
    constructor() {
        this.user = localStorage.getItem('user');
        this.backendBaseUrl = 'http://localhost:3000/';
    }

    renderInitialState() {
        this.renderCopyright();
        if (this.user) {
            this.renderLoggedInElements();
        } else {
            this.renderLoggedOutElements();
        }
    }

    renderLoggedInElements() {
        this.renderNavElements();
        this.renderLogoutButton();
        this.renderUserInfo();
        this.renderImFeeling();
    }

    renderLoggedOutElements() {
        this.renderSessionControlForm();
        this.renderAbout();
    }

    getNavElements() {
        return document.querySelector('ul#nav-elements');
    }

    renderNavElements() {
        const elementsContainer = this.getNavElements();

        const lis = ["I'm feeling...", "Jazz", "Cats", "Comedy"].map(element => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.innerText = element;
            li.append(a);
            return li;
        })

        lis[0].addEventListener('click', () => this.renderImFeeling());
        lis[1].addEventListener('click', () => console.log("render jazz"))
        lis[2].addEventListener('click', () => console.log("render cats"))
        lis[3].addEventListener('click', () => console.log("render comedy"))

        for (const li of lis) {
            elementsContainer.append(li);
        }
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

        const spaces = App.createSpaces(3);

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
        button.addEventListener('click', () => this.logOut());

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

    getMainContentContainer() {
        return document.querySelector('div#content');
    }

    renderAbout() {
        const container = this.getMainContentContainer();
        container.innerHTML = "About";
    }

    renderImFeeling() {
        const container = this.getMainContentContainer();
        
        const h3 = document.createElement('h3');
        h3.innerText = "I'm feeling...";

        const br = document.createElement('br');

        const button1 = document.createElement('button');
        button1.id = 'feeling-jazzy'
        button1.className = 'btn im-feeling';
        button1.innerText = "🎹 Jazzy 🎷";
        button1.addEventListener('click', () => console.log("Jazzy"));
        
        const button2 = document.createElement('button');
        button2.id = 'feeling-catty'
        button2.className = 'btn im-feeling';
        button2.innerText = "🐱 Catty 🐈";
        button2.addEventListener('click', () => console.log("Catty"));

        const button3 = document.createElement('button');
        button3.id = 'feeling-jokey'
        button3.className = 'btn im-feeling';
        button3.innerText = "😆 Jokey 😂";
        button3.addEventListener('click', () => console.log("Jokey"));

        const spaces = App.createSpaces(2);

        container.innerHTML = '';
        container.append(h3, br, button1, spaces[0], button2, spaces[1], button3);
    }

    getEmailAndPassword(form) {
        return {
            email: form.querySelector('input[type=email').value,
            password: form.querySelector('input[type=password]').value
        }
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
                this.renderLoggedInElements();
            }
        })
    }

    logOut() {
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
            this.removeNavElements();
            this.removeUserInfo();
            this.renderLoggedOutElements();
        })
    }

    static createSpaces(n) {
        const spaces = [];
        for (let i = 0; i < n; i++) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            spaces.push(space);
        }
        return spaces;
    }
}

const app = new App;
document.addEventListener('DOMContentLoaded', () => {
    app.renderInitialState();
});