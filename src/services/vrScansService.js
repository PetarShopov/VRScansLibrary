import dataService from './dataService'
const baseUrl = 'vrscans'

class VRScansService {
    static getAll(page, pageSize, searchTerm, types, colors, tags) {
        page = page || 1;
        let queryString = `${baseUrl}?_page=${page}`;
        if (pageSize) {
            queryString += `&_limit=${pageSize}`;
        }
        if (searchTerm) {
            queryString += `&name_like=${searchTerm}`;
        }
        if (types.length) {
            for (let i = 0; i < types.length; i++) {
                queryString += `&materialTypeId=${types[i]}`;
            }
        }
        if (colors.length) {
            for (let i = 0; i < colors.length; i++) {
                queryString += `&colors=${colors[i]}`;
            }
        }
        if (tags.length) {
            for (let i = 0; i < tags.length; i++) {
                queryString += `&tags=${tags[i]}`;
            }
        }
        return dataService.get(queryString);
    }
}

export default VRScansService