import dataService from './dataService'
const MANUFACTURERS = 'manufacturers';

class filterService {
    static getAll() {
        return dataService.get(MANUFACTURERS).then(items => {
            let manufacturers = {};
            items.forEach(item => {
                manufacturers[item.id] = item.name;
            })
            return manufacturers;
        });
    }
}

export default filterService