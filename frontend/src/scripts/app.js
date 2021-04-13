class App {
    constructor() {
        this.userId = localStorage.getItem('userId');
        this.userEmail = localStorage.getItem('userEmail');
    }

    static get backendBaseUrl() {
        return 'http://localhost:3000/';
    }

    renderInitialState() {
        this.renderCopyright();
        if (this.userId) {
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

        lis[1].addEventListener('click', () => this.renderApprovedJazzVideos());

        lis[2].addEventListener('click', () => this.renderApprovedCats());
            
        lis[3].addEventListener('click', () => this.renderApprovedJokes())

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
        span.innerText = `Logged in as ${this.userEmail}`;
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

    updateMainContentContainer(newContent, setOrApend) {
        const container = this.getMainContentContainer();
        if (setOrApend === 'set') {
            container.innerHTML = newContent;
        } else {
            container.innerHTML = '';
            if (Array.isArray(newContent)) {
                container.append(...newContent);
            } else {
                container.append(newContent);
            }
        }
    }

    renderAbout() {
        this.updateMainContentContainer("About", 'set');
    }

    renderImFeeling() {        
        const h3 = document.createElement('h3');
        h3.innerText = "I'm feeling...";

        const br = document.createElement('br');

        const button1 = document.createElement('button');
        button1.id = 'feeling-jazzy'
        button1.className = 'btn im-feeling';
        button1.innerText = "🎹 Jazzy 🎷";
        button1.addEventListener('click', () => this.renderRandomJazzVideo());
        
        const button2 = document.createElement('button');
        button2.id = 'feeling-catty'
        button2.className = 'btn im-feeling';
        button2.innerText = "🐱 Catty 🐈";
        button2.addEventListener('click', () => this.renderRandomCat());

        const button3 = document.createElement('button');
        button3.id = 'feeling-jokey'
        button3.className = 'btn im-feeling';
        button3.innerText = "😆 Jokey 😂";
        button3.addEventListener('click', () => this.renderRandomJoke());

        const spaces = App.createSpaces(2);

        const newContent = [h3, br, button1, spaces[0], button2, spaces[1], button3];
        this.updateMainContentContainer(newContent, 'append');
    }

    renderRandomJazzVideo() {
        Adapter.getRandom(JazzVideo, this.userId)
        .then(response => response.json())
        .then(json => {
            const videoOrError = JazzVideo.randomFromJson(json);
            if (typeof(videoOrError) !== 'string') {
                this.updateMainContentContainer(videoOrError.htmlElements(this), 'append');
            } else {
                this.updateMainContentContainer(videoOrError, 'set')
            }
        })
    }

    renderRandomCat() {
        Adapter.getRandom(Cat)
        .then(response => response.json())
        .then(json => {
            const cat = Cat.fromJson(json);
            this.updateMainContentContainer(cat.htmlElements(this), 'append')
        })
    }

    renderRandomJoke() {
        Adapter.getRandom(Joke)
        .then(response => response.json())
        .then(json => {
            const joke = Joke.fromJson(json);
            this.updateMainContentContainer(joke.htmlElements(this), 'append')
        })
    }

    renderApprovedJazzVideos() {
        Adapter.getApproved(JazzVideo, this.userId)
        .then(response => response.json())
        .then(json => {
            const videosOrError = JazzVideo.allApprovedFromJson(json);
            this.renderApprovedOrError(videosOrError);
        })
    }

    renderApprovedCats() {
        Adapter.getApproved(Cat, this.userId)
        .then(response => response.json())
        .then(json => {
            const catsOrError = Cat.allApprovedFromJson(json);
            this.renderApprovedOrError(catsOrError);
        })
    }

    renderApprovedJokes() {
        Adapter.getApproved(Joke, this.userId)
        .then(response => response.json())
        .then(json => {
            const jokesOrError = Joke.allApprovedFromJson(json);
            this.renderApprovedOrError(jokesOrError, 'hr');
        })
    }

    renderApprovedOrError(collectionOrError, separator = null) {
        if (typeof(collectionOrError) !== 'string') {
            const collectionHtmlElements = collectionOrError.map(instance => instance.htmlElements(this, false));

            const collectionHtmlElementsWithBrs = [];
            for (let i = 0; i < collectionHtmlElements.length; i++) {
                collectionHtmlElementsWithBrs.push(collectionHtmlElements[i]);
                if (i < collectionHtmlElements.length - 1) {
                    collectionHtmlElementsWithBrs.push(document.createElement('br'));
                    if (separator) {
                        collectionHtmlElementsWithBrs.push(document.createElement(separator));
                    }
                }
            }

            this.updateMainContentContainer(collectionHtmlElementsWithBrs, 'append');
        } else {
            this.updateMainContentContainer(collectionOrError, 'set')
        }
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
        fetch(`${App.backendBaseUrl}${path}`, {
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
                this.userId = json.user.id;
                this.userEmail = json.user.email;
                localStorage.setItem('userId', this.userId);
                localStorage.setItem('userEmail', this.userEmail);
                this.renderLoggedInElements();
            }
        })
    }

    logOut() {
        fetch(`${App.backendBaseUrl}sessions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
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

    generateApprovalButton(approveOrReject, text, cclass, identifier, additional_attributes = null) {
        const button = document.createElement('button');
        button.id = approveOrReject;
        button.className = (approveOrReject === 'approve') ? 'btn btn-success' : 'btn btn-danger';
        button.innerText = text;
        button.addEventListener('click', () => {
            let args = [cclass, this.userId, identifier, approveOrReject];
            if (additional_attributes) {
                args.push(additional_attributes);
            }

            Adapter.save(...args)
            .then(() => {
                switch(cclass) {
                    case Cat:
                        this.renderRandomCat();
                        break;
                    case JazzVideo:
                        this.renderRandomJazzVideo();
                        break;
                    case Joke:
                        this.renderRandomJoke();
                        break;
                } 
            })
        })
        return button;
    }
}

const app = new App;
document.addEventListener('DOMContentLoaded', () => {
    app.renderInitialState();
});