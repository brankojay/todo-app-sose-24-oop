class ApiController {
    static defaultConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    constructor() {
        this.baseUrl = "http://localhost:8080"
    }

    async fetch(path, config = {}) {
        try {
            const apiRequest = await fetch(`${this.baseUrl}${path}`, { ...ApiController.defaultConfig, ...config });
            const apiResponse = await apiRequest.json();

            return apiResponse;
        } catch (error) {
            console.error(error);
        }
    }

    get(path) {
        return this.fetch(path);
    }

    post(path, data) {
        return this.fetch(path, {
            body: JSON.stringify(data),
            method: "POST"
        });
    }

    delete(path) {
        return this.fetch(path, {
            method: "DELETE"
        });
    }
};

export default ApiController;
