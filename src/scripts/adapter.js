class Adapter {
    static async getRandom(app, cclass, userId = null) {
        let args = []
        if (cclass === JazzVideo) {
            args.push(cclass.randomUrl(userId));
            args.push({
                method: 'GET',
                headers: {
                    token: app.userToken
                }
            })
        } else {
            args.push(cclass.randomUrl);
        }

        let response = await fetch(...args);
        return await response;
    }

    static async getApproved(app, cclass, userId) {
        let response = await fetch(`${App.backendBaseUrl}users/${userId}/${cclass.resource}`, {
            method: 'GET',
            headers: {
                token: app.userToken   
            }
        });
        return await response;
    }

    static async save(app, cclass, userId, identifier, approveOrReject, additional_attributes = null) {
        let body;
        if (additional_attributes) {
            body = JSON.stringify({identifier, approveOrReject, additional_attributes});
        } else {
            body = JSON.stringify({identifier, approveOrReject});
        }

        let response = await fetch(`${App.backendBaseUrl}users/${userId}/${cclass.resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                token: app.userToken 
            },
            body: body
        });        
        return await response;
    }
}