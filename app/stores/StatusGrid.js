import { Store } from 'flummox'
import Immutable from 'immutable'
import assign    from 'object.assign'
import uuid      from 'node-uuid'

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

        /* Read localStorage */
        let grids = [testGrid]
        let lgrids = JSON.parse(localStorage.getItem('statusgrid-grids'))
        if (lgrids) {
            grids = lgrids.map((grid) => { return { meta : grid } }) 
        }

        this.state = {
            grids : Immutable.fromJS(grids) 
        }
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
    serialize(grids) {
        let onlyMeta = grids.toJS().map((grid) => {
            return grid.meta
        })
        localStorage.setItem('statusgrid-grids', JSON.stringify(onlyMeta))
    }
}
