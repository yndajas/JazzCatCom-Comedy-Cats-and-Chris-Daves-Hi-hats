class JazzVideo {
    constructor(id, vid, artistName) {
        this.id = id;
        this.vid = vid;
        this.artistName = artistName;
    }

    htmlElements(app, forApproval = true) {
        const div = document.createElement('div');
        div.className = 'embed-responsive embed-responsive-16by9 iframe_container resource-container';

        const iframe = document.createElement('iframe');
        iframe.className = 'embed-responsive-item';
        iframe.setAttribute('src', this.url);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');

        div.append(iframe);

        if (forApproval) {
            return this.htmlElementsForApproval(div, app);
        } else {
            return div;
            // might want to add a delete button here (and refactor into a deparate method if so)
        }
    }

    htmlElementsForApproval(div, app) {
        const approveButton = document.createElement('button');
        approveButton.id = 'approve'
        approveButton.className = 'btn btn-success';
        approveButton.innerText = "Saxy";
        approveButton.addEventListener('click', () => {
            JazzVideoAdapter.save(app.userId, this.vid, 'approve')
            .then(() => app.renderUnseenJazzVideo())
        })

        const rejectButton = document.createElement('button');
        rejectButton.id = 'reject'
        rejectButton.className = 'btn btn-danger';
        rejectButton.innerText = "PiaNO thank you";
        rejectButton.addEventListener('click', () => {
            JazzVideoAdapter.save(app.userId, this.vid, 'reject')
            .then(() => app.renderUnseenJazzVideo())
        })

        const br = document.createElement('br');
        const spaces = App.createSpaces(1);

        return [div, br, approveButton, spaces[0], rejectButton];
    }

    get url() {
        return `${JazzVideo.ytBaseUrl}${this.vid}`
    }

    static allApprovedFromJson(json) {
        const count = json.data.length;
        if (count === 0) {
            return "No approved videos";
        } else {
            return json.data.map(videoData => JazzVideo.newFromVideoDataAndIncluded(videoData, json.included))
        }
    }

    static randomUnseenFromJson(json) {
        const count = json.data.length;
        if (count === 0) {
            return "No unseen videos";
        } else {
            const index = Math.round(Math.random() * (count - 1));
            const videoData = json.data[index];
            return JazzVideo.newFromVideoDataAndIncluded(videoData, json.included);
        }
    }

    static newFromVideoDataAndIncluded(videoData, included) {
        const {id, vid, artistId} = JazzVideo.getAttributesFromVideoData(videoData);
        const artistName = JazzVideo.getArtistNameFromIncludedById(artistId, included);
        return new JazzVideo(id, vid, artistName);
    }

    static getAttributesFromVideoData(videoData) {
        return {id: videoData.id, vid: videoData.attributes.vid, artistId: videoData.relationships.artist.data.id};
    }

    static getArtistNameFromIncludedById(id, included) {
        const artist = included.find(artist => artist.id === id);
        return artist.attributes.name;
    }

    static get ytBaseUrl() {
        return 'https://www.youtube.com/embed/';
    }
}