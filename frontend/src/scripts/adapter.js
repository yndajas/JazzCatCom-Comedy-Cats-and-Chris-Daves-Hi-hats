class Adapter {
    static async getRandom(cclass, userId = null) {
        let url;
        if (cclass === JazzVideo) {
            url = cclass.randomUrl(userId);
        } else {
            url = cclass.randomUrl;
        }

        let response = await fetch(url);
        return await response;
    }

    static async getApproved(cclass, userId) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/${cclass.resource}`);
        return await response;
    }

    static async save(cclass, userId, identifier, approveOrReject) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/${cclass.resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({identifier, approveOrReject})
        });
        return await response;
    }
}