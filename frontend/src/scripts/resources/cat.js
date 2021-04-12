class Cat {
    constructor(filename) {
        this.filename = filename;
    }

    static get randomUrl() {
        return "https://aws.random.cat/meow";
    }

    static get resource() {
        return "cats";
    }

    htmlElements(app, forApproval = true) {
        const div = document.createElement('div');
        div.className = 'resource-container';

        const img = document.createElement('img');
        img.setAttribute('src', this.url);

        div.append(img);

        if (forApproval) {
            return this.htmlElementsForApproval(div, app);
        } else {
            return div;
            // might want to add a delete button here (and refactor into a deparate method if so)
        }
    }

    htmlElementsForApproval(div, app) {
        const approveButton = app.generateApprovalButton('approve', "Meow", Cat, this.filename);
        const rejectButton = app.generateApprovalButton('reject', "Woof", Cat, this.filename);
        const br = document.createElement('br');
        const spaces = App.createSpaces(1);

        return [div, br, approveButton, spaces[0], rejectButton];
    }

    get url() {
        return `https://purr.objects-us-east-1.dream.io/i/${this.filename}`
    }

    static allApprovedFromJson(json) {
        const count = json.data.length;
        if (count === 0) {
            return "No approved cats";
        } else {
            return json.data.map(catData => new Cat(catData.attributes.filename))
        }
    }

    static fromJson(json) {
        const filename = json.file.replace("https://purr.objects-us-east-1.dream.io/i/", "");
        return new Cat(filename);
    }
}