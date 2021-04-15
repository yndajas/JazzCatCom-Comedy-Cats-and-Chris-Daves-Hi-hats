class Joke {
    constructor(external_api_id, category, setup, punchline) {
        this.external_api_id = external_api_id;
        this.category = category;
        this.setup = setup;
        this.punchline = punchline; 
    }

    static get randomUrl() {
        return "https://official-joke-api.appspot.com/jokes/random";
    }

    static get resource() {
        return "jokes";
    }

    get additional_attributes() {
        return {category: this.category, setup: this.setup, punchline: this.punchline};
    }

    htmlElements(app, forApproval = true) {
        const div = document.createElement('div');
        div.className = 'resource-container';

        const divSetup = document.createElement('div');
        divSetup.className = 'joke-setup';

        const b = document.createElement('b');
        b.innerText = `${this.setup}`;

        divSetup.append(b);
        
        const divPunchline = document.createElement('div');
        divPunchline.className = 'joke-punchline';

        const buttonRevealPunchline = document.createElement('button');
        buttonRevealPunchline.className = 'btn btn-primary';
        buttonRevealPunchline.innerText = "Reveal punchline";
        buttonRevealPunchline.addEventListener('click', () => {
            divPunchline.innerText = `${this.punchline}`;
        });

        divPunchline.append(buttonRevealPunchline);

        const br = document.createElement('br');
        
        div.append(divSetup, br, divPunchline);

        if (forApproval) {
            return this.htmlElementsForApproval(div, app);
        } else {
            return div;
            // might want to add a delete button here (and refactor into a deparate method if so)
        }
    }

    htmlElementsForApproval(div, app) {
        const approveButton = app.generateApprovalButton('approve', "Haha", Joke, this.external_api_id, this.additional_attributes);
        const rejectButton = app.generateApprovalButton('reject', "Boo! You stink!", Joke, this.external_api_id, this.additional_attributes);
        const br = document.createElement('br');
        const spaces = App.createSpaces(1);

        return [div, br, approveButton, spaces[0], rejectButton];
    }

    static allApprovedFromJson(json) {
        const count = json.data.length;
        if (count === 0) {
            return "No approved jokes";
        } else {
            return json.data.map(jokeData => {
                const {external_api_id, category, setup, punchline} = jokeData.attributes;
                return new Joke(external_api_id, category, setup, punchline);
            })
        }
    }

    static fromJson(json) {
        const external_api_id = json.id;
        const category = json.type;
        const setup = json.setup;
        const punchline = json.punchline;
        return new Joke(external_api_id, category, setup, punchline);
    }
}