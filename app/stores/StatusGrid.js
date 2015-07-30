import { Store } from 'flummox'
import Immutable from 'immutable'

let testGrid = {
    meta : {
        name : 'testgrid',
        url : '',
        secret : ''
    },
    items : [
        {
            meta    : {
                diff : 2,
                unit : 'minute' 
            },
            tags    : [],
            actions : [],
            events  : [
                { timestamp : new Date().getTime() }
            ]
        },
        {
            meta    : {},
            tags    : [],
            actions : [],
            events  : []
        },
        {
            meta    : {},
            tags    : [],
            actions : [],
            events  : []
        }
    ]
}

export default class StatusGrid extends Store {
    constructor(flux) {
        super()

        this.state = {
            grids : [Immutable.fromJS(testGrid)]
        }
    }
}
