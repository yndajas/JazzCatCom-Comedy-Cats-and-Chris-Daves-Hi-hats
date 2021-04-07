class JazzVideo {
    constructor(id, vid, artistName) {
        this.id = id;
        this.vid = vid;
        this.artistName = artistName;
    }

    get htmlElements() {
        const urlP = document.createElement('p');
        urlP.innerText = this.url;

        const artistP = document.createElement('p');
        artistP.innerText = this.artistName;

        return [urlP, artistP];
    }

    get url() {
        return `${JazzVideo.ytBaseUrl}${this.vid}`
    }

    static newFromJson(json) {
        const count = json.data.length;
        if (count === 0) {
            return "No unseen videos";
        } else {
            const index = Math.round(Math.random() * (count - 1) + 1);
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
        return 'https://www.youtube.com/watch?v=';
    }
}