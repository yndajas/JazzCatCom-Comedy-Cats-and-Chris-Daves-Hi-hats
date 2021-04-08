class JazzVideo {
    constructor(id, vid, artistName) {
        this.id = id;
        this.vid = vid;
        this.artistName = artistName;
    }

    htmlElements(app) {
        const div = document.createElement('div');
        div.className = 'embed-responsive embed-responsive-16by9 iframe_container';
        div.id = 'jazz-video-container';

        const iframe = document.createElement('iframe');
        iframe.className = 'embed-responsive-item';
        iframe.setAttribute('src', `${JazzVideo.ytBaseUrl}${this.vid}`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');

        div.append(iframe);

        const approveButton = document.createElement('button');
        approveButton.id = 'approve'
        approveButton.className = 'btn btn-success';
        approveButton.innerText = "Saxy";
        approveButton.addEventListener('click', () => {
            JazzVideoAdapter.saveVideo(app.userId, this.id, 'approve')
            .then(() => app.renderJazzVideo())
        })

        const rejectButton = document.createElement('button');
        rejectButton.id = 'reject'
        rejectButton.className = 'btn btn-danger';
        rejectButton.innerText = "PiaNO thank you";
        rejectButton.addEventListener('click', () => {
            JazzVideoAdapter.saveVideo(app.userId, this.id, 'reject')
            .then(() => app.renderJazzVideo())
        })

        const br = document.createElement('br');
        const spaces = App.createSpaces(1);

        return [div, br, approveButton, spaces[0], rejectButton];
    }

    get url() {
        return `${JazzVideo.ytBaseUrl}${this.vid}`
    }

    static newFromJson(json) {
        const count = json.data.length;
        if (count === 0) {
            return "No unseen videos";
        } else {
            const index = Math.round(Math.random() * (count - 1));
            const videoData = json.data[index];
            const id = videoData.id;
            const vid = videoData.attributes.vid;
            const artistId = videoData.relationships.artist.data.id;
            const artist = json.included.find(artist => artist.id === artistId);
            const artistName = artist.attributes.name;
            return new JazzVideo(id, vid, artistName);
        }
    }

    static get ytBaseUrl() {
        return 'https://www.youtube.com/embed/';
    }
}