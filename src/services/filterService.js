import dataService from './dataService'
const MATERIALS = 'materials';
const COLORS = 'colors';
const TAGS = 'tags';

class filterService {
    static getAllFilters() {
        return Promise.all([dataService.get(MATERIALS), dataService.get(COLORS), dataService.get(TAGS)]);
    }
}

export default filterService