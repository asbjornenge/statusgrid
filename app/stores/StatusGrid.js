import { Store } from 'flummox'
import Immutable from 'immutable'
import assign    from 'object.assign'
import uuid      from 'node-uuid'
import firebase  from 'firebase/lib/firebase-web'

let testGrid = {
    meta : {
        id : uuid.v1(),
        name : 'testgrid',
        url : '',
        secret : ''
    },
    items : [
        {
            meta    : {
                id   : uuid.v1(),
                name : 'Some thing I monitor',
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

        let statusGridActions = flux.getActions('grid')

        this.register(statusGridActions.add, this.onAdd)
        this.register(statusGridActions.update, this.onUpdate)
        this.register(statusGridActions.remove, this.onRemove)
        this.register(statusGridActions.addItem, this.onAddItem)
//        this.register(statusGridActions.update, this.onUpdate)
//        this.register(statusGridActions.remove, this.onRemove)

        /* Read localStorage */
        let grids = [testGrid]
        let lgrids = JSON.parse(localStorage.getItem('statusgrid-grids'))
        if (lgrids) {
            grids = lgrids.map((grid) => { return { meta : grid } }) 
        }

        /* Set the state */
        let igrids = Immutable.fromJS(grids)
        this.state = {
            grids : igrids 
        }

        /* Connect to grids */
        this.connections = {}
        igrids.forEach((grid) => {
            this.connect(grid)
        })
    }
    onAdd(values) {
        let newGrid  = Immutable.Map({ meta : Immutable.Map(assign({ id: uuid.v1() },values)) })
        let newGrids = this.state.grids.unshift(newGrid)
        this.serialize(newGrids)
        this.setState({ grids : newGrids })
    }
    onUpdate(updateGridMeta) {
        let newGrids = this.state.grids.map((grid) => {
            let _meta = grid.get('meta').toJS()
            let _umeta = updateGridMeta.toJS()
            if (_meta.id == _umeta.id) {
                return grid.merge({ meta : assign(_meta, _umeta) })
            }
            return grid
        })
        this.serialize(newGrids)
        this.setState({ grids : newGrids })
    }
    onRemove(grid) {
        let newGrids = this.state.grids.filter((_grid) => {
            return _grid.get('meta').get('id') != grid.get('meta').get('id')
        })
        this.serialize(newGrids)
        this.setState({ grids : newGrids })
    }
    onAddItem(item) {
        let conn = this.connections[item.gridId] 
        let id  = uuid.v1()
        conn.child(id).set(assign({ id : id }, item.values))
    }
    serialize(grids) {
        let onlyMeta = grids.toJS().map((grid) => {
            return grid.meta
        })
        localStorage.setItem('statusgrid-grids', JSON.stringify(onlyMeta))
    }
    connect(grid) {
        let meta = grid.get('meta').toJS()
        let conn = new Firebase(meta.url)
        this.connections[meta.id] = conn 
        this.connections[meta.id].authWithCustomToken(meta.secret, (err, authData) => {
            if (err) throw err
            this.setupItemListener(grid)
        }) 
    }
    setupItemListener(grid) {
        // Listen for new Items
        let meta = grid.get('meta').toJS()
        this.connections[meta.id].on('child_added', (snap) => {
            console.log('child added', snap.val())
        })
    }
    setupEventListeners() {
        // LIsten for new Events
    }
}
