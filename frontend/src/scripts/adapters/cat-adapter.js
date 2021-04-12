class CatAdapter {
    static async getRandom() {
        let response = await fetch("https://aws.random.cat/meow");
        return await response;
    }

    static async getApproved(userId) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/cats`);
        return await response;
    }

    static async save(userId, filename, approveOrReject) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/cats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },        
            body: JSON.stringify({filename, approveOrReject})
        });
        return await response;
    }
}