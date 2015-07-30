import { Flummox }     from 'flummox'
import NavigationUtil  from './utils/Navigation'
import StatusGridStore from './stores/StatusGrid'

export default class Flux extends Flummox {
    constructor() {
        super()
        this._utils = {}
        this.createUtils('nav', NavigationUtil) 
        this.createStore('grid', StatusGridStore, this)
    }
    createUtils(name, util, args) {
        this._utils[name] = new util(args)
    }
    getUtils(name) {
        return this._utils[name]
    }
}
