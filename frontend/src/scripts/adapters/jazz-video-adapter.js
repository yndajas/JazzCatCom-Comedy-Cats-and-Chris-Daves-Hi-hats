class JazzVideoAdapter {
    static async getUnseen(userId) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/jazz-videos/unseen`);
        return await response;
    }

    static async getApproved(userId) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/jazz-videos`);
        return await response;
    }

    static async save(userId, vid, approveOrReject) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/jazz-videos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },        
            body: JSON.stringify({vid, approveOrReject})
        });
        return await response;
    }
}