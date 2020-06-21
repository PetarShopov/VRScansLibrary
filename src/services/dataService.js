const baseUrl = 'http://localhost:3000/'
const handleJsonResponse = res => res.json();

class DataService {
    static get(url) {
        return window.fetch(`${baseUrl}${url}`).then(handleJsonResponse);
    }
}

export default DataService