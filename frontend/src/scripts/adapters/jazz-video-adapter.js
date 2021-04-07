class JazzVideoAdapter {
    static get backendBaseUrl() {
        return 'http://localhost:3000/';
    }

    static async getUnseenVideos(userId) {
        let response = await fetch(`${JazzVideoAdapter.backendBaseUrl}users/${userId}/jazz-videos/unseen`)
        return await response;
    }
}