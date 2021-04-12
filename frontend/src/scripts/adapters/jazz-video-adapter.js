class JazzVideoAdapter {
    static get backendBaseUrl() {
        return 'http://localhost:3000/';
    }

    static async getUnseenVideos(userId) {
        let response = await fetch(`${JazzVideoAdapter.backendBaseUrl}users/${userId}/jazz-videos/unseen`);
        return await response;
    }

    static async getApprovedVideos(userId) {
        let response = await fetch(`${JazzVideoAdapter.backendBaseUrl}users/${userId}/jazz-videos`);
        return await response;
    }

    static async saveVideo(userId, jazz_video_id, approveOrReject) {
        let response = await fetch(`${JazzVideoAdapter.backendBaseUrl}users/${userId}/jazz-videos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },        
            body: JSON.stringify({jazz_video_id, approveOrReject})
        });
        return await response;
    }
}