import { Actions } from 'flummox'

export default class StatusGridActions extends Actions {

    add(values) {
        return values
    }
    update(updateGrid) {
        return updateGrid
    }
    remove(grid) {
        return grid
    }
    addItem(gridId, values) {
        return {
            gridId : gridId,
            values : values
        }
    }

}
